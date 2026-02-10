'use client';

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, FileUp, Download, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const mockClassStudents = [
  { id: "S1", name: "Amisi Bahati", grade: "" },
  { id: "S2", name: "Zawadi Furaha", grade: "" },
  { id: "S3", name: "Kambale Moise", grade: "" },
  { id: "S4", name: "Neema Amani", grade: "" },
  { id: "S5", name: "Mateso Justin", grade: "" },
];

export default function AdminGradesPage() {
  const [students, setStudents] = useState(mockClassStudents);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">Saisie des Notes</h1>
          <p className="text-muted-foreground">Remplissez les résultats des évaluations par classe et par matière.</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline">
                <FileUp className="mr-2 h-4 w-4" /> Importer CSV
            </Button>
            <Button>
                <Save className="mr-2 h-4 w-4" /> Publier les notes
            </Button>
        </div>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Note aux enseignants</AlertTitle>
        <AlertDescription>
          Une fois publiées, les notes seront immédiatement visibles par les parents et les élèves sur leur portail.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="md:col-span-1 h-fit">
            <CardHeader>
                <CardTitle className="text-base">Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground">Classe</label>
                    <Select defaultValue="6p">
                        <SelectTrigger><SelectValue placeholder="Classe" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="6p">6ème Primaire A</SelectItem>
                            <SelectItem value="5p">5ème Primaire B</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground">Matière</label>
                    <Select defaultValue="math">
                        <SelectTrigger><SelectValue placeholder="Matière" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="math">Mathématiques</SelectItem>
                            <SelectItem value="fr">Français</SelectItem>
                            <SelectItem value="sc">Sciences</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground">Type d'évaluation</label>
                    <Select defaultValue="interro">
                        <SelectTrigger><SelectValue placeholder="Type" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="interro">Interrogation</SelectItem>
                            <SelectItem value="examen">Examen Trimestriel</SelectItem>
                            <SelectItem value="devoir">Devoir à domicile</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground">Note Maximale</label>
                    <Input type="number" defaultValue="20" />
                </div>
            </CardContent>
        </Card>

        <Card className="md:col-span-3">
            <CardHeader>
                <CardTitle>Liste des notes</CardTitle>
                <CardDescription>Saisie manuelle pour l'évaluation du 25 Mars 2024</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>Nom de l'élève</TableHead>
                            <TableHead className="text-right w-[150px]">Note obtenue</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {students.map((student) => (
                            <TableRow key={student.id}>
                                <TableCell className="font-mono text-xs">{student.id}</TableCell>
                                <TableCell className="font-medium">{student.name}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Input 
                                            type="number" 
                                            className="w-20 text-right" 
                                            placeholder="00"
                                            max="20"
                                            min="0"
                                        />
                                        <span className="text-muted-foreground text-sm">/ 20</span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter className="justify-between border-t p-6">
                <p className="text-sm text-muted-foreground">5 élèves chargés</p>
                <Button variant="secondary">Calculer la moyenne de classe</Button>
            </CardFooter>
        </Card>
      </div>
    </div>
  );
}
