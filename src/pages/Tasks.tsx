import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

type Task = {
  id: number;
  courseId: number;
  courseName: string;
  courseIcon: string;
  question: string;
  options: string[];
  correctAnswer: number;
  points: number;
  difficulty: number;
};

const Tasks = () => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);

  const tasks: Task[] = [
    {
      id: 1,
      courseId: 1,
      courseName: 'Математика',
      courseIcon: '➗',
      question: 'Сколько будет 15 × 8?',
      options: ['110', '120', '130', '140'],
      correctAnswer: 1,
      points: 10,
      difficulty: 1,
    },
    {
      id: 2,
      courseId: 1,
      courseName: 'Математика',
      courseIcon: '➗',
      question: 'Чему равен корень из 144?',
      options: ['10', '11', '12', '13'],
      correctAnswer: 2,
      points: 15,
      difficulty: 2,
    },
    {
      id: 3,
      courseId: 2,
      courseName: 'Русский язык',
      courseIcon: '📖',
      question: 'Какое слово написано правильно?',
      options: ['Рассчитать', 'Расчитать', 'Расщитать', 'Разщитать'],
      correctAnswer: 0,
      points: 10,
      difficulty: 1,
    },
    {
      id: 4,
      courseId: 3,
      courseName: 'Физика',
      courseIcon: '⚡',
      question: 'Скорость света в вакууме равна:',
      options: ['300 000 км/с', '150 000 км/с', '450 000 км/с', '600 000 км/с'],
      correctAnswer: 0,
      points: 20,
      difficulty: 2,
    },
    {
      id: 5,
      courseId: 2,
      courseName: 'Русский язык',
      courseIcon: '📖',
      question: 'В каком слове ударение на первом слоге?',
      options: ['Звонит', 'Торты', 'Банты', 'Шарфы'],
      correctAnswer: 2,
      points: 10,
      difficulty: 1,
    },
    {
      id: 6,
      courseId: 1,
      courseName: 'Математика',
      courseIcon: '➗',
      question: 'Чему равна площадь круга с радиусом 5?',
      options: ['25π', '10π', '50π', '5π'],
      correctAnswer: 0,
      points: 15,
      difficulty: 2,
    },
  ];

  const handleCheckAnswer = () => {
    if (!selectedTask || !selectedAnswer) return;

    const answerIndex = parseInt(selectedAnswer);
    const correct = answerIndex === selectedTask.correctAnswer;

    setIsCorrect(correct);
    setIsAnswered(true);

    if (correct) {
      setCompletedTasks([...completedTasks, selectedTask.id]);
    }
  };

  const handleNextTask = () => {
    setSelectedTask(null);
    setSelectedAnswer('');
    setIsAnswered(false);
    setIsCorrect(false);
  };

  const availableTasks = tasks.filter((t) => !completedTasks.includes(t.id));
  const totalPoints = completedTasks.length * 10;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-purple-50 to-blue-50 pb-20">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Задания
          </h1>
          <Badge className="text-lg px-4 py-2 bg-gradient-to-r from-primary to-accent">
            💎 {totalPoints} баллов
          </Badge>
        </div>

        <Card className="mb-6 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium">Прогресс</span>
              <span className="text-sm font-bold text-primary">
                {completedTasks.length} / {tasks.length}
              </span>
            </div>
            <Progress value={(completedTasks.length / tasks.length) * 100} className="h-3" />
          </CardContent>
        </Card>

        {!selectedTask ? (
          <div className="grid md:grid-cols-2 gap-4">
            {availableTasks.map((task, index) => (
              <Card
                key={task.id}
                className="hover-scale cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => setSelectedTask(task)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{task.courseIcon}</div>
                      <div>
                        <CardTitle className="text-base">{task.courseName}</CardTitle>
                        <p className="text-xs text-muted-foreground mt-1">
                          Сложность: {'⭐'.repeat(task.difficulty)}
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-primary">+{task.points} 💎</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm line-clamp-2">{task.question}</p>
                  <Button className="w-full mt-4" size="sm">
                    Начать
                    <Icon name="ArrowRight" className="ml-2" size={16} />
                  </Button>
                </CardContent>
              </Card>
            ))}

            {availableTasks.length === 0 && (
              <Card className="col-span-2 text-center py-12">
                <CardContent>
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-2xl font-bold mb-2">Все задания выполнены!</h3>
                  <p className="text-muted-foreground">
                    Вы заработали {totalPoints} баллов. Отличная работа!
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          <Card className="animate-scale-in">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <Button variant="ghost" size="sm" onClick={handleNextTask}>
                  <Icon name="ArrowLeft" className="mr-2" size={16} />
                  Назад
                </Button>
                <Badge className="bg-primary">+{selectedTask.points} 💎</Badge>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="text-4xl">{selectedTask.courseIcon}</div>
                <div>
                  <CardTitle>{selectedTask.courseName}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Сложность: {'⭐'.repeat(selectedTask.difficulty)}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-4">{selectedTask.question}</h3>
              </div>

              {!isAnswered ? (
                <>
                  <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                    <div className="space-y-3">
                      {selectedTask.options.map((option, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:bg-muted/50 cursor-pointer transition-all"
                        >
                          <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                          <Label
                            htmlFor={`option-${index}`}
                            className="flex-1 cursor-pointer text-base"
                          >
                            {option}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>

                  <Button
                    onClick={handleCheckAnswer}
                    disabled={!selectedAnswer}
                    size="lg"
                    className="w-full"
                  >
                    Проверить ответ
                  </Button>
                </>
              ) : (
                <div className="space-y-4">
                  <Card
                    className={`${
                      isCorrect
                        ? 'bg-green-50 border-green-300'
                        : 'bg-red-50 border-red-300'
                    }`}
                  >
                    <CardContent className="pt-6 text-center">
                      <div className="text-6xl mb-3">{isCorrect ? '✅' : '❌'}</div>
                      <h3 className="text-2xl font-bold mb-2">
                        {isCorrect ? 'Правильно!' : 'Неправильно'}
                      </h3>
                      <p className="text-muted-foreground">
                        {isCorrect
                          ? `Вы заработали ${selectedTask.points} баллов!`
                          : `Правильный ответ: ${selectedTask.options[selectedTask.correctAnswer]}`}
                      </p>
                    </CardContent>
                  </Card>

                  <Button onClick={handleNextTask} size="lg" className="w-full">
                    Продолжить
                    <Icon name="ArrowRight" className="ml-2" size={20} />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Tasks;
