import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

type School = {
  id: number;
  name: string;
  address: string;
  city: string;
};

type Document = {
  id: number;
  type: string;
  name: string;
  number?: string;
  issueDate?: string;
  status: string;
};

const Schools = () => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [addType, setAddType] = useState<'school' | 'document'>('school');
  const [documentType, setDocumentType] = useState<'podorozhnik' | 'spb' | null>(null);

  const [schoolName, setSchoolName] = useState('');
  const [schoolAddress, setSchoolAddress] = useState('');
  const [schoolCity, setSchoolCity] = useState('');

  const [docName, setDocName] = useState('');
  const [docNumber, setDocNumber] = useState('');
  const [docIssueDate, setDocIssueDate] = useState('');

  const [schools, setSchools] = useState<School[]>([
    { id: 1, name: 'ГБОУ СОШ №123', address: 'ул. Пушкина, 15', city: 'Москва' },
  ]);

  const [documents, setDocuments] = useState<Document[]>([
    { id: 1, type: 'spb', name: 'СПБ', number: '1234567890', issueDate: '2024-01-15', status: 'active' },
  ]);

  const handleAddSchool = () => {
    if (schoolName && schoolAddress && schoolCity) {
      const newSchool: School = {
        id: Date.now(),
        name: schoolName,
        address: schoolAddress,
        city: schoolCity,
      };
      setSchools([...schools, newSchool]);
      setSchoolName('');
      setSchoolAddress('');
      setSchoolCity('');
      setShowAddDialog(false);
    }
  };

  const handleAddDocument = () => {
    if (documentType === 'podorozhnik') {
      return;
    }

    if (documentType === 'spb' && docName && docNumber && docIssueDate) {
      const newDoc: Document = {
        id: Date.now(),
        type: 'spb',
        name: docName,
        number: docNumber,
        issueDate: docIssueDate,
        status: 'active',
      };
      setDocuments([...documents, newDoc]);
      setDocName('');
      setDocNumber('');
      setDocIssueDate('');
      setDocumentType(null);
      setShowAddDialog(false);
    }
  };

  const openAddDialog = (type: 'school' | 'document') => {
    setAddType(type);
    setDocumentType(null);
    setShowAddDialog(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-purple-50 to-blue-50 pb-20">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Школа и Документы
          </h1>
        </div>

        <Tabs defaultValue="schools" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 h-12">
            <TabsTrigger value="schools" className="text-base">
              <Icon name="School" className="mr-2" size={18} />
              Школы
            </TabsTrigger>
            <TabsTrigger value="documents" className="text-base">
              <Icon name="FileText" className="mr-2" size={18} />
              Документы
            </TabsTrigger>
          </TabsList>

          <TabsContent value="schools" className="space-y-4">
            <Button
              onClick={() => openAddDialog('school')}
              className="w-full bg-gradient-to-r from-primary to-accent"
              size="lg"
            >
              <Icon name="Plus" className="mr-2" size={20} />
              Добавить школу
            </Button>

            <div className="grid gap-4">
              {schools.map((school) => (
                <Card key={school.id} className="hover-scale">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">🏫</div>
                        <div>
                          <CardTitle className="text-lg">{school.name}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">{school.city}</p>
                        </div>
                      </div>
                      <Badge className="bg-primary">Активная</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name="MapPin" size={16} />
                      <span>{school.address}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <Button
              onClick={() => openAddDialog('document')}
              className="w-full bg-gradient-to-r from-secondary to-orange-500"
              size="lg"
            >
              <Icon name="Plus" className="mr-2" size={20} />
              Добавить документ
            </Button>

            <div className="grid gap-4">
              {documents.map((doc) => (
                <Card key={doc.id} className="hover-scale">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">🎫</div>
                        <div>
                          <CardTitle className="text-lg">{doc.name}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">
                            Номер: {doc.number}
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-green-500">Активен</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name="Calendar" size={16} />
                      <span>Выдан: {doc.issueDate}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {addType === 'school' ? '🏫 Добавить школу' : '🎫 Добавить документ'}
            </DialogTitle>
            <DialogDescription>
              {addType === 'school'
                ? 'Введите данные вашей школы'
                : 'Выберите тип документа'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {addType === 'school' ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="schoolName">Название школы</Label>
                  <Input
                    id="schoolName"
                    placeholder="ГБОУ СОШ №456"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="schoolCity">Город</Label>
                  <Input
                    id="schoolCity"
                    placeholder="Москва"
                    value={schoolCity}
                    onChange={(e) => setSchoolCity(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="schoolAddress">Адрес</Label>
                  <Input
                    id="schoolAddress"
                    placeholder="ул. Шушары, д. 10"
                    value={schoolAddress}
                    onChange={(e) => setSchoolAddress(e.target.value)}
                  />
                </div>
                <Button onClick={handleAddSchool} size="lg" className="w-full">
                  Добавить школу
                </Button>
              </>
            ) : !documentType ? (
              <div className="grid gap-3">
                <Card
                  className="cursor-pointer hover-scale opacity-50"
                  onClick={() => {}}
                >
                  <CardContent className="pt-6 text-center">
                    <div className="text-4xl mb-3">🚇</div>
                    <h3 className="font-bold mb-2">Подорожник</h3>
                    <Badge variant="secondary">Недоступно</Badge>
                  </CardContent>
                </Card>
                <Card
                  className="cursor-pointer hover-scale border-2 border-primary"
                  onClick={() => setDocumentType('spb')}
                >
                  <CardContent className="pt-6 text-center">
                    <div className="text-4xl mb-3">🎓</div>
                    <h3 className="font-bold mb-2">СПБ</h3>
                    <Badge className="bg-primary">Доступно</Badge>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="docName">Имя</Label>
                  <Input
                    id="docName"
                    placeholder="Иван Иванов"
                    value={docName}
                    onChange={(e) => setDocName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="docNumber">Номер СПБ</Label>
                  <Input
                    id="docNumber"
                    placeholder="1234567890"
                    value={docNumber}
                    onChange={(e) => setDocNumber(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="docIssueDate">Дата выдачи</Label>
                  <Input
                    id="docIssueDate"
                    type="date"
                    value={docIssueDate}
                    onChange={(e) => setDocIssueDate(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setDocumentType(null)}
                    className="flex-1"
                  >
                    Назад
                  </Button>
                  <Button onClick={handleAddDocument} className="flex-1">
                    Добавить
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Schools;
