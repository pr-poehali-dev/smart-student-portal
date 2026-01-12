import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { ScrollArea } from '@/components/ui/scroll-area';

type Message = {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

const Profile = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      content: 'Привет! Я твой AI-помощник. Могу помочь с домашкой, ответить на вопросы или сгенерировать картинку. Что тебе нужно?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const speechSynthesis = window.speechSynthesis;

  const userStats = {
    name: 'Максим',
    lastName: 'Иванов',
    level: 12,
    points: 2450,
    streak: 7,
    nextLevelPoints: 3000,
    tasksCompleted: 142,
    hoursLearned: 28,
    accuracy: 87,
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const speak = (text: string) => {
    if (!ttsEnabled || !speechSynthesis) return;

    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ru-RU';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);

    speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      const responses = [
        'Отличный вопрос! Давай разберём это подробнее...',
        'Я могу помочь с этим заданием. Вот решение...',
        'Интересная задача! Попробуем решить её вместе.',
        'Сейчас помогу разобраться с этой темой.',
      ];

      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);

      if (ttsEnabled) {
        speak(assistantMessage.content);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-purple-50 to-blue-50 pb-20">
      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-[320px_1fr] gap-6">
          <div className="space-y-6">
            <Card className="animate-fade-in">
              <CardContent className="pt-6 text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-3xl font-bold">
                    {userStats.name[0]}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold mb-1">
                  {userStats.name} {userStats.lastName}
                </h2>
                <Badge className="text-lg px-4 py-1 bg-gradient-to-r from-primary to-accent">
                  Уровень {userStats.level}
                </Badge>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Прогресс</span>
                    <span className="font-bold text-primary">
                      {userStats.points} / {userStats.nextLevelPoints}
                    </span>
                  </div>
                  <Progress
                    value={(userStats.points / userStats.nextLevelPoints) * 100}
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-xl">📊</span>
                  Статистика
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">🔥</div>
                    <span className="text-sm font-medium">Дни подряд</span>
                  </div>
                  <span className="text-xl font-bold text-primary">{userStats.streak}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">✅</div>
                    <span className="text-sm font-medium">Заданий</span>
                  </div>
                  <span className="text-xl font-bold text-primary">{userStats.tasksCompleted}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">⏱️</div>
                    <span className="text-sm font-medium">Часов</span>
                  </div>
                  <span className="text-xl font-bold text-primary">{userStats.hoursLearned}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">🎯</div>
                    <span className="text-sm font-medium">Точность</span>
                  </div>
                  <span className="text-xl font-bold text-primary">{userStats.accuracy}%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="animate-fade-in flex flex-col h-[calc(100vh-200px)]">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🤖</span>
                  AI Помощник
                </CardTitle>
                <div className="flex items-center gap-3">
                  <Label htmlFor="tts-toggle" className="text-sm cursor-pointer">
                    {ttsEnabled ? '🔊' : '🔇'} Синтез речи
                  </Label>
                  <Switch
                    id="tts-toggle"
                    checked={ttsEnabled}
                    onCheckedChange={setTtsEnabled}
                  />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Генерация картинок, помощь с домашкой, ответы на вопросы
              </p>
            </CardHeader>

            <ScrollArea className="flex-1 p-4" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        message.role === 'user'
                          ? 'bg-gradient-to-r from-primary to-accent text-white'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <span className="text-xs opacity-70 mt-1 block">
                        {message.timestamp.toLocaleTimeString('ru-RU', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start animate-fade-in">
                    <div className="bg-muted rounded-2xl px-4 py-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-primary animate-bounce" />
                        <div
                          className="w-2 h-2 rounded-full bg-primary animate-bounce"
                          style={{ animationDelay: '0.1s' }}
                        />
                        <div
                          className="w-2 h-2 rounded-full bg-primary animate-bounce"
                          style={{ animationDelay: '0.2s' }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="border-t p-4">
              {isSpeaking && (
                <div className="mb-3 flex items-center justify-center gap-2 text-sm text-primary animate-pulse">
                  <Icon name="Volume2" size={16} />
                  <span>Воспроизведение...</span>
                  <Button size="sm" variant="ghost" onClick={stopSpeaking}>
                    Остановить
                  </Button>
                </div>
              )}
              <div className="flex gap-2">
                <Textarea
                  placeholder="Спроси что-нибудь или попроси помощи..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  className="min-h-[60px] resize-none"
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  size="lg"
                  className="px-6"
                >
                  <Icon name="Send" size={20} />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                💡 Попробуй: "Помоги решить задачу по математике" или "Сгенерируй картинку космоса"
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
