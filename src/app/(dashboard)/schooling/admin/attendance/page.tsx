'use client';

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, X, Clock, Save, Search, Users } from "lucide-react";
import { Input } from "@/components/ui/input";

const mockStudents = [
  { id: "S1", name: "Amisi Bahati", status: "present" },
  { id: "S2", name: "Zawadi Furaha", status: "present" },
  { id: "S3", name: "Kambale Moise", status: "absent" },
  { id: "S4", name: "Neema Amani", status: "present" },
  { id: "S5", name: "Mateso Justin", status: "late" },
  { id: "S6", name: "Bora Mapendo", status: "present" },
];

export default function AdminAttendancePage() {
  const [students, setStudents] = useState(mockStudents);
  const [date, setDate] = useState(new Date().toLocaleDateString('fr-FR'));

  const setStatus = (id: string, status: string) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status } : s));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-green-500/10 text-green-600 border-green-200';
      case 'absent': return 'bg-red-500/10 text-red-600 border-red-200';
      case 'late': return 'bg-yellow-500/10 text-yellow-600 border-yellow-200';
      default: return '';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">Prise des Présences</h1>
          <p className="text-muted-foreground">Enregistrez les absences et retards de la classe.</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline">Historique</Button>
            <Button className="bg-green-600 hover:bg-green-700">
                <Save className="mr-2 h-4 w-4" /> Enregistrer l'appel
            </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">Filtres de classe</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-muted-foreground">Date</label>
                <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
            </div>
            <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-muted-foreground">Classe</label>
                <Select defaultValue="6p">
                    <SelectTrigger>
                        <SelectValue placeholder="Choisir une classe" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="6p">6ème Primaire A</SelectItem>
                        <SelectItem value="5p">5ème Primaire B</SelectItem>
                        <SelectItem value="1s">1ère Secondaire</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-muted-foreground">Période</label>
                <Select defaultValue="matin">
                    <SelectTrigger>
                        <SelectValue placeholder="Période" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="matin">Matinée</SelectItem>
                        <SelectItem value="apres-midi">Après-midi</SelectItem>
                    </SelectContent>
                </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle className="text-lg">Liste des élèves</CardTitle>
                <CardDescription>Total: {students.length} élèves</CardDescription>
            </div>
            <div className="flex gap-2">
                <Badge variant="outline" className="bg-green-50">{students.filter(s => s.status === 'present').length} Présents</Badge>
                <Badge variant="outline" className="bg-red-50">{students.filter(s => s.status === 'absent').length} Absents</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="border-t">
              {students.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-4 border-b last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center font-bold text-xs">
                        {student.id}
                    </div>
                    <span className="font-medium">{student.name}</span>
                  </div>
                  <div className="flex gap-1">
                    <Button 
                        size="sm" 
                        variant={student.status === 'present' ? 'default' : 'outline'}
                        className={student.status === 'present' ? 'bg-green-600' : ''}
                        onClick={() => setStatus(student.id, 'present')}
                    >
                        <Check className="h-4 w-4" />
                    </Button>
                    <Button 
                        size="sm" 
                        variant={student.status === 'late' ? 'default' : 'outline'}
                        className={student.status === 'late' ? 'bg-yellow-500' : ''}
                        onClick={() => setStatus(student.id, 'late')}
                    >
                        <Clock className="h-4 w-4" />
                    </Button>
                    <Button 
                        size="sm" 
                        variant={student.status === 'absent' ? 'default' : 'outline'}
                        className={student.status === 'absent' ? 'bg-red-600' : ''}
                        onClick={() => setStatus(student.id, 'absent')}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
