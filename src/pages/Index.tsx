import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Course = {
  id: number;
  title: string;
  icon: string;
  progress: number;
  locked: boolean;
  level: number;
};

type Achievement = {
  id: number;
  title: string;
  icon: string;
  earned: boolean;
  description: string;
};

type Leader = {
  id: number;
  name: string;
  points: number;
  level: number;
  rank: number;
};

const Index = () => {
  const [showAuth, setShowAuth] = useState(true);
  const [authStep, setAuthStep] = useState<'phone' | 'name'>('phone');
  const [phone, setPhone] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [activeTab, setActiveTab] = useState('courses');

  const userStats = {
    name: 'Максим',
    level: 12,
    points: 2450,
    streak: 7,
    nextLevelPoints: 3000,
  };

  const courses: Course[] = [
    { id: 1, title: 'Математика', icon: '➗', progress: 75, locked: false, level: 5 },
    { id: 2, title: 'Русский язык', icon: '📖', progress: 60, locked: false, level: 4 },
    { id: 3, title: 'Физика', icon: '⚡', progress: 45, locked: false, level: 3 },
    { id: 4, title: 'Химия', icon: '🧪', progress: 30, locked: false, level: 2 },
    { id: 5, title: 'Английский', icon: '🌍', progress: 0, locked: true, level: 1 },
    { id: 6, title: 'История', icon: '🏛️', progress: 0, locked: true, level: 1 },
  ];

  const achievements: Achievement[] = [
    { id: 1, title: 'Первые шаги', icon: '🎯', earned: true, description: 'Завершите первый урок' },
    { id: 2, title: 'Неделя силы', icon: '🔥', earned: true, description: '7 дней подряд' },
    { id: 3, title: 'Эрудит', icon: '🧠', earned: true, description: '100 верных ответов' },
    { id: 4, title: 'Молния', icon: '⚡', earned: true, description: '10 заданий за час' },
    { id: 5, title: 'Звезда', icon: '⭐', earned: false, description: 'Достигните 15 уровня' },
    { id: 6, title: 'Мастер', icon: '👑', earned: false, description: 'Завершите все курсы' },
  ];

  const leaderboard: Leader[] = [
    { id: 1, name: 'Александра М.', points: 3250, level: 15, rank: 1 },
    { id: 2, name: 'Дмитрий К.', points: 2980, level: 14, rank: 2 },
    { id: 3, name: 'Максим В.', points: 2450, level: 12, rank: 3 },
    { id: 4, name: 'Анна П.', points: 2120, level: 11, rank: 4 },
    { id: 5, name: 'Иван С.', points: 1890, level: 10, rank: 5 },
  ];

  const challenges = [
    { id: 1, title: 'Утренний марафон', reward: 50, icon: '🌅' },
    { id: 2, title: 'Без ошибок', reward: 100, icon: '✨' },
    { id: 3, title: 'Скоростной режим', reward: 75, icon: '🚀' },
  ];

  const handleAuthSubmit = () => {
    if (authStep === 'phone') {
      setAuthStep('name');
    } else {
      setShowAuth(false);
    }
  };

  return (
    <>
      <Dialog open={showAuth} onOpenChange={setShowAuth}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center">
              {authStep === 'phone' ? '📱 Добро пожаловать!' : '✨ Расскажи о себе'}
            </DialogTitle>
            <DialogDescription className="text-center">
              {authStep === 'phone'
                ? 'Введи свой номер телефона для входа'
                : 'Как тебя зовут?'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {authStep === 'phone' ? (
              <div className="space-y-2">
                <Label htmlFor="phone">Номер телефона</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+7 (999) 123-45-67"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="text-lg"
                />
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="firstName">Имя</Label>
                  <Input
                    id="firstName"
                    placeholder="Максим"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="text-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Фамилия</Label>
                  <Input
                    id="lastName"
                    placeholder="Иванов"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="text-lg"
                  />
                </div>
              </>
            )}
            <Button onClick={handleAuthSubmit} size="lg" className="w-full">
              {authStep === 'phone' ? 'Продолжить' : 'Начать обучение! 🚀'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="min-h-screen bg-gradient-to-br from-background via-purple-50 to-blue-50">
        <nav className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="text-3xl">🎓</div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Smart School
                </h1>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
                  <span className="text-2xl">🔥</span>
                  <span className="font-bold text-primary">{userStats.streak} дней</span>
                </div>
                <Avatar className="hover-scale cursor-pointer border-2 border-primary">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white font-bold">
                    {userStats.name[0]}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </nav>

        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-[1fr_320px] gap-6">
            <div className="space-y-6">
              <Card className="animate-fade-in bg-gradient-to-br from-primary via-purple-600 to-accent text-white border-0 shadow-xl">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-3xl font-bold mb-1">Привет, {userStats.name}! 👋</h2>
                      <p className="text-white/80">Продолжай в том же духе!</p>
                    </div>
                    <Badge className="bg-white/20 text-white border-0 text-lg px-4 py-2 hover:bg-white/30">
                      Уровень {userStats.level}
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/90">Прогресс до {userStats.level + 1} уровня</span>
                      <span className="font-bold">{userStats.points} / {userStats.nextLevelPoints}</span>
                    </div>
                    <Progress value={(userStats.points / userStats.nextLevelPoints) * 100} className="h-3 bg-white/20" />
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="text-center p-3 rounded-lg bg-white/10 backdrop-blur">
                      <div className="text-2xl mb-1">💎</div>
                      <div className="text-2xl font-bold">{userStats.points}</div>
                      <div className="text-xs text-white/70">баллов</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-white/10 backdrop-blur">
                      <div className="text-2xl mb-1">🏆</div>
                      <div className="text-2xl font-bold">{achievements.filter(a => a.earned).length}</div>
                      <div className="text-xs text-white/70">достижений</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-white/10 backdrop-blur">
                      <div className="text-2xl mb-1">📚</div>
                      <div className="text-2xl font-bold">{courses.filter(c => !c.locked).length}</div>
                      <div className="text-xs text-white/70">курсов</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="grid w-full grid-cols-3 h-12">
                  <TabsTrigger value="courses" className="text-base">
                    <Icon name="BookOpen" className="mr-2" size={18} />
                    Курсы
                  </TabsTrigger>
                  <TabsTrigger value="achievements" className="text-base">
                    <Icon name="Award" className="mr-2" size={18} />
                    Достижения
                  </TabsTrigger>
                  <TabsTrigger value="leaderboard" className="text-base">
                    <Icon name="Trophy" className="mr-2" size={18} />
                    Рейтинг
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="courses" className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    {courses.map((course, index) => (
                      <Card
                        key={course.id}
                        className={`hover-scale transition-all cursor-pointer ${
                          course.locked ? 'opacity-50' : ''
                        } animate-fade-in`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className="text-4xl">{course.icon}</div>
                              <div>
                                <CardTitle className="text-lg">{course.title}</CardTitle>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Уровень {course.level}
                                </p>
                              </div>
                            </div>
                            {course.locked && <Icon name="Lock" className="text-muted-foreground" />}
                          </div>
                        </CardHeader>
                        <CardContent>
                          {!course.locked ? (
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Прогресс</span>
                                <span className="font-medium">{course.progress}%</span>
                              </div>
                              <Progress value={course.progress} className="h-2" />
                              <Button className="w-full mt-3" size="sm">
                                Продолжить
                                <Icon name="ArrowRight" className="ml-2" size={16} />
                              </Button>
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground">
                              Открывается на {course.level * 2} уровне
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="achievements" className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    {achievements.map((achievement, index) => (
                      <Card
                        key={achievement.id}
                        className={`text-center hover-scale transition-all ${
                          achievement.earned ? 'bg-gradient-to-br from-primary/5 to-accent/5' : 'opacity-60'
                        } animate-scale-in`}
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <CardContent className="pt-6">
                          <div className={`text-6xl mb-3 ${achievement.earned ? 'animate-bounce-in' : 'grayscale'}`}>
                            {achievement.icon}
                          </div>
                          <h3 className="font-bold mb-2">{achievement.title}</h3>
                          <p className="text-sm text-muted-foreground">{achievement.description}</p>
                          {achievement.earned && (
                            <Badge className="mt-3 bg-primary">Получено!</Badge>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="leaderboard" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">🏆</span>
                        Топ школьников недели
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {leaderboard.map((leader, index) => (
                          <div
                            key={leader.id}
                            className={`flex items-center gap-4 p-4 rounded-lg transition-all hover:bg-muted/50 animate-fade-in ${
                              leader.rank === 3 ? 'bg-primary/5 border-2 border-primary' : ''
                            }`}
                            style={{ animationDelay: `${index * 0.05}s` }}
                          >
                            <div
                              className={`text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full ${
                                leader.rank === 1
                                  ? 'bg-yellow-400 text-yellow-900'
                                  : leader.rank === 2
                                  ? 'bg-gray-300 text-gray-700'
                                  : leader.rank === 3
                                  ? 'bg-orange-400 text-orange-900'
                                  : 'bg-muted text-muted-foreground'
                              }`}
                            >
                              {leader.rank}
                            </div>
                            <Avatar className="border-2 border-primary/20">
                              <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20">
                                {leader.name[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="font-semibold">{leader.name}</div>
                              <div className="text-sm text-muted-foreground">Уровень {leader.level}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-lg text-primary">{leader.points}</div>
                              <div className="text-xs text-muted-foreground">баллов</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-6">
              <Card className="animate-fade-in bg-gradient-to-br from-secondary to-orange-500 text-white border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <span className="text-2xl">⚡</span>
                    Челленджи дня
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {challenges.map((challenge) => (
                    <div key={challenge.id} className="bg-white/10 backdrop-blur p-4 rounded-lg hover-scale cursor-pointer">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">{challenge.icon}</span>
                        <Badge className="bg-white/20 text-white border-0">+{challenge.reward} 💎</Badge>
                      </div>
                      <div className="font-medium">{challenge.title}</div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">📊</span>
                    Твоя статистика
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">✅</div>
                      <span className="text-sm font-medium">Заданий выполнено</span>
                    </div>
                    <span className="text-xl font-bold text-primary">142</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">⏱️</div>
                      <span className="text-sm font-medium">Часов обучения</span>
                    </div>
                    <span className="text-xl font-bold text-primary">28</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">🎯</div>
                      <span className="text-sm font-medium">Точность ответов</span>
                    </div>
                    <span className="text-xl font-bold text-primary">87%</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="animate-fade-in bg-gradient-to-br from-accent/10 to-blue-100 border-accent/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">🛍️</span>
                    Магазин
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-4 bg-white rounded-lg hover-scale cursor-pointer">
                      <div className="text-3xl mb-2">🎨</div>
                      <div className="font-medium mb-1">Новая тема</div>
                      <div className="text-sm text-muted-foreground mb-2">Измени дизайн портала</div>
                      <Button size="sm" variant="outline" className="w-full">
                        500 💎
                      </Button>
                    </div>
                    <div className="p-4 bg-white rounded-lg hover-scale cursor-pointer">
                      <div className="text-3xl mb-2">🎁</div>
                      <div className="font-medium mb-1">Бонус опыта</div>
                      <div className="text-sm text-muted-foreground mb-2">+50% на 1 день</div>
                      <Button size="sm" variant="outline" className="w-full">
                        300 💎
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
