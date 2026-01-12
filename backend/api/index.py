"""
API для работы с пользователями, курсами, заданиями и прогрессом
"""
import json
import os
import psycopg2
from datetime import datetime

def handler(event, context):
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    path = event.get('path', '')
    query = event.get('queryStringParameters') or {}
    action = query.get('action', '')
    
    try:
        dsn = os.environ.get('DATABASE_URL')
        schema = os.environ.get('MAIN_DB_SCHEMA')
        
        conn = psycopg2.connect(dsn)
        cur = conn.cursor()
        
        if action == 'get-user':
            user_id = query.get('user_id')
            cur.execute(f"""
                SELECT id, phone, first_name, last_name, level, points, streak, created_at
                FROM {schema}.users WHERE id = %s
            """, (user_id,))
            user = cur.fetchone()
            
            if user:
                return response(200, {
                    'id': user[0],
                    'phone': user[1],
                    'first_name': user[2],
                    'last_name': user[3],
                    'level': user[4],
                    'points': user[5],
                    'streak': user[6],
                    'created_at': str(user[7])
                })
            return response(404, {'error': 'User not found'})
        
        elif action == 'create-user' and method == 'POST':
            body = json.loads(event.get('body', '{}'))
            phone = body.get('phone')
            first_name = body.get('first_name')
            last_name = body.get('last_name')
            
            cur.execute(f"""
                INSERT INTO {schema}.users (phone, first_name, last_name, level, points, streak)
                VALUES (%s, %s, %s, 1, 0, 0)
                RETURNING id, phone, first_name, last_name, level, points, streak
            """, (phone, first_name, last_name))
            conn.commit()
            user = cur.fetchone()
            
            return response(200, {
                'id': user[0],
                'phone': user[1],
                'first_name': user[2],
                'last_name': user[3],
                'level': user[4],
                'points': user[5],
                'streak': user[6]
            })
        
        elif action == 'get-courses':
            user_id = query.get('user_id')
            
            cur.execute(f"""
                SELECT c.id, c.title, c.icon, c.description, c.unlock_level,
                       COALESCE(uc.progress, 0) as progress,
                       COALESCE(uc.level, 1) as user_level,
                       COALESCE(uc.completed, false) as completed
                FROM {schema}.courses c
                LEFT JOIN {schema}.user_courses uc ON c.id = uc.course_id AND uc.user_id = %s
                ORDER BY c.id
            """, (user_id,))
            
            courses = []
            for row in cur.fetchall():
                courses.append({
                    'id': row[0],
                    'title': row[1],
                    'icon': row[2],
                    'description': row[3],
                    'unlock_level': row[4],
                    'progress': row[5],
                    'level': row[6],
                    'completed': row[7]
                })
            
            return response(200, {'courses': courses})
        
        elif action == 'get-tasks':
            course_id = query.get('course_id')
            user_id = query.get('user_id')
            
            cur.execute(f"""
                SELECT t.id, t.title, t.question, t.options, t.correct_answer, 
                       t.points, t.difficulty,
                       COALESCE(ut.is_correct, false) as completed
                FROM {schema}.tasks t
                LEFT JOIN {schema}.user_tasks ut ON t.id = ut.task_id AND ut.user_id = %s
                WHERE t.course_id = %s
                ORDER BY t.difficulty, t.id
            """, (user_id, course_id))
            
            tasks = []
            for row in cur.fetchall():
                tasks.append({
                    'id': row[0],
                    'title': row[1],
                    'question': row[2],
                    'options': row[3],
                    'correct_answer': row[4],
                    'points': row[5],
                    'difficulty': row[6],
                    'completed': row[7]
                })
            
            return response(200, {'tasks': tasks})
        
        elif action == 'submit-answer' and method == 'POST':
            body = json.loads(event.get('body', '{}'))
            user_id = body.get('user_id')
            task_id = body.get('task_id')
            answer = body.get('answer')
            
            cur.execute(f"""
                SELECT correct_answer, points FROM {schema}.tasks WHERE id = %s
            """, (task_id,))
            task = cur.fetchone()
            
            if not task:
                return response(404, {'error': 'Task not found'})
            
            is_correct = str(answer) == str(task[0])
            points = task[1] if is_correct else 0
            
            cur.execute(f"""
                INSERT INTO {schema}.user_tasks (user_id, task_id, answer, is_correct, points_earned)
                VALUES (%s, %s, %s, %s, %s)
                ON CONFLICT (user_id, task_id) DO UPDATE 
                SET answer = EXCLUDED.answer, is_correct = EXCLUDED.is_correct, 
                    points_earned = EXCLUDED.points_earned, completed_at = CURRENT_TIMESTAMP
            """, (user_id, task_id, answer, is_correct, points))
            
            if is_correct:
                cur.execute(f"""
                    UPDATE {schema}.users 
                    SET points = points + %s, updated_at = CURRENT_TIMESTAMP
                    WHERE id = %s
                """, (points, user_id))
            
            conn.commit()
            
            return response(200, {
                'is_correct': is_correct,
                'points_earned': points
            })
        
        elif action == 'get-achievements':
            user_id = query.get('user_id')
            
            cur.execute(f"""
                SELECT a.id, a.title, a.description, a.icon, a.points,
                       CASE WHEN ua.id IS NOT NULL THEN true ELSE false END as earned
                FROM {schema}.achievements a
                LEFT JOIN {schema}.user_achievements ua ON a.id = ua.achievement_id AND ua.user_id = %s
                ORDER BY a.id
            """, (user_id,))
            
            achievements = []
            for row in cur.fetchall():
                achievements.append({
                    'id': row[0],
                    'title': row[1],
                    'description': row[2],
                    'icon': row[3],
                    'points': row[4],
                    'earned': row[5]
                })
            
            return response(200, {'achievements': achievements})
        
        elif action == 'add-school' and method == 'POST':
            body = json.loads(event.get('body', '{}'))
            user_id = body.get('user_id')
            name = body.get('name')
            address = body.get('address')
            city = body.get('city')
            
            cur.execute(f"""
                INSERT INTO {schema}.schools (user_id, name, address, city)
                VALUES (%s, %s, %s, %s)
                RETURNING id, name, address, city, created_at
            """, (user_id, name, address, city))
            conn.commit()
            school = cur.fetchone()
            
            return response(200, {
                'id': school[0],
                'name': school[1],
                'address': school[2],
                'city': school[3],
                'created_at': str(school[4])
            })
        
        elif action == 'get-schools':
            user_id = query.get('user_id')
            
            cur.execute(f"""
                SELECT id, name, address, city, created_at
                FROM {schema}.schools WHERE user_id = %s
                ORDER BY created_at DESC
            """, (user_id,))
            
            schools = []
            for row in cur.fetchall():
                schools.append({
                    'id': row[0],
                    'name': row[1],
                    'address': row[2],
                    'city': row[3],
                    'created_at': str(row[4])
                })
            
            return response(200, {'schools': schools})
        
        elif action == 'add-document' and method == 'POST':
            body = json.loads(event.get('body', '{}'))
            user_id = body.get('user_id')
            doc_type = body.get('type')
            name = body.get('name')
            number = body.get('number')
            issue_date = body.get('issue_date')
            
            cur.execute(f"""
                INSERT INTO {schema}.documents (user_id, type, name, number, issue_date)
                VALUES (%s, %s, %s, %s, %s)
                RETURNING id, type, name, number, issue_date, status
            """, (user_id, doc_type, name, number, issue_date))
            conn.commit()
            doc = cur.fetchone()
            
            return response(200, {
                'id': doc[0],
                'type': doc[1],
                'name': doc[2],
                'number': doc[3],
                'issue_date': str(doc[4]) if doc[4] else None,
                'status': doc[5]
            })
        
        elif action == 'get-documents':
            user_id = query.get('user_id')
            
            cur.execute(f"""
                SELECT id, type, name, number, issue_date, status, created_at
                FROM {schema}.documents WHERE user_id = %s
                ORDER BY created_at DESC
            """, (user_id,))
            
            documents = []
            for row in cur.fetchall():
                documents.append({
                    'id': row[0],
                    'type': row[1],
                    'name': row[2],
                    'number': row[3],
                    'issue_date': str(row[4]) if row[4] else None,
                    'status': row[5],
                    'created_at': str(row[6])
                })
            
            return response(200, {'documents': documents})
        
        elif action == 'get-leaderboard':
            cur.execute(f"""
                SELECT id, first_name, last_name, points, level
                FROM {schema}.users
                ORDER BY points DESC, level DESC
                LIMIT 10
            """)
            
            leaderboard = []
            rank = 1
            for row in cur.fetchall():
                leaderboard.append({
                    'id': row[0],
                    'name': f"{row[1]} {row[2][0]}.",
                    'points': row[3],
                    'level': row[4],
                    'rank': rank
                })
                rank += 1
            
            return response(200, {'leaderboard': leaderboard})
        
        cur.close()
        conn.close()
        
        return response(400, {'error': 'Invalid action'})
        
    except Exception as e:
        return response(500, {'error': str(e)})

def response(status, data):
    return {
        'statusCode': status,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps(data, ensure_ascii=False)
    }
