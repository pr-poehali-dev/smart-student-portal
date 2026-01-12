CREATE TABLE IF NOT EXISTS t_p53324412_smart_student_portal.users (
    id SERIAL PRIMARY KEY,
    phone VARCHAR(20) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    vk_id VARCHAR(50) UNIQUE,
    level INTEGER DEFAULT 1,
    points INTEGER DEFAULT 0,
    streak INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS t_p53324412_smart_student_portal.schools (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES t_p53324412_smart_student_portal.users(id),
    name VARCHAR(200) NOT NULL,
    address VARCHAR(300) NOT NULL,
    city VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS t_p53324412_smart_student_portal.documents (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES t_p53324412_smart_student_portal.users(id),
    type VARCHAR(50) NOT NULL,
    name VARCHAR(200),
    number VARCHAR(100),
    issue_date DATE,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS t_p53324412_smart_student_portal.courses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    icon VARCHAR(10) NOT NULL,
    description TEXT,
    unlock_level INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS t_p53324412_smart_student_portal.user_courses (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES t_p53324412_smart_student_portal.users(id),
    course_id INTEGER REFERENCES t_p53324412_smart_student_portal.courses(id),
    progress INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1,
    completed BOOLEAN DEFAULT FALSE,
    last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, course_id)
);

CREATE TABLE IF NOT EXISTS t_p53324412_smart_student_portal.tasks (
    id SERIAL PRIMARY KEY,
    course_id INTEGER REFERENCES t_p53324412_smart_student_portal.courses(id),
    title VARCHAR(300) NOT NULL,
    question TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'quiz',
    options JSONB,
    correct_answer TEXT,
    points INTEGER DEFAULT 10,
    difficulty INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS t_p53324412_smart_student_portal.user_tasks (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES t_p53324412_smart_student_portal.users(id),
    task_id INTEGER REFERENCES t_p53324412_smart_student_portal.tasks(id),
    answer TEXT,
    is_correct BOOLEAN,
    points_earned INTEGER DEFAULT 0,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, task_id)
);

CREATE TABLE IF NOT EXISTS t_p53324412_smart_student_portal.achievements (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    icon VARCHAR(10) NOT NULL,
    requirement JSONB,
    points INTEGER DEFAULT 50,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS t_p53324412_smart_student_portal.user_achievements (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES t_p53324412_smart_student_portal.users(id),
    achievement_id INTEGER REFERENCES t_p53324412_smart_student_portal.achievements(id),
    earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, achievement_id)
);

INSERT INTO t_p53324412_smart_student_portal.courses (title, icon, description, unlock_level) VALUES
('Математика', '➗', 'Арифметика, алгебра, геометрия', 1),
('Русский язык', '📖', 'Грамматика, орфография, литература', 1),
('Физика', '⚡', 'Механика, электричество, оптика', 3),
('Химия', '🧪', 'Органика, неорганика, реакции', 5),
('Английский', '🌍', 'Грамматика, лексика, аудирование', 7),
('История', '🏛️', 'Всемирная и отечественная история', 10);

INSERT INTO t_p53324412_smart_student_portal.achievements (title, description, icon, requirement, points) VALUES
('Первые шаги', 'Завершите первый урок', '🎯', '{"type": "tasks_completed", "count": 1}', 50),
('Неделя силы', '7 дней подряд', '🔥', '{"type": "streak", "count": 7}', 100),
('Эрудит', '100 верных ответов', '🧠', '{"type": "correct_answers", "count": 100}', 200),
('Молния', '10 заданий за час', '⚡', '{"type": "tasks_per_hour", "count": 10}', 150),
('Звезда', 'Достигните 15 уровня', '⭐', '{"type": "level", "count": 15}', 300),
('Мастер', 'Завершите все курсы', '👑', '{"type": "courses_completed", "count": 6}', 500);
