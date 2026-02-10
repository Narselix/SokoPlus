
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const mockGrades = [
  { subject: "Mathématiques", score: 16, maxScore: 20, term: "1er Trimestre", status: "Validé" },
  { subject: "Français", score: 14, maxScore: 20, term: "1er Trimestre", status: "Validé" },
  { subject: "Physique", score: 12, maxScore: 20, term: "1er Trimestre", status: "Passable" },
  { subject: "Chimie", score: 18, maxScore: 20, term: "1er Trimestre", status: "Excellent" },
  { subject: "Histoire", score: 15, maxScore: 20, term: "1er Trimestre", status: "Validé" },
];

export default function StudentGradesPage() {
  const average = mockGrades.reduce((acc, g) => acc + g.score, 0) / mockGrades.length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Notes & Résultats</h1>
        <p className="text-muted-foreground">Consultez vos performances académiques en temps réel.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Moyenne Générale</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{average.toFixed(2)} / 20</div>
            <Progress value={(average / 20) * 100} className="mt-4 h-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Rang dans la classe</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">5ème / 32</div>
            <p className="text-xs text-muted-foreground mt-2">En progression de 2 places</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bulletin de notes détaillé</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Matière</TableHead>
                <TableHead>Trimestre</TableHead>
                <TableHead className="text-center">Note</TableHead>
                <TableHead className="text-right">Appréciation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockGrades.map((grade, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{grade.subject}</TableCell>
                  <TableCell>{grade.term}</TableCell>
                  <TableCell className="text-center">
                    <span className="font-bold">{grade.score}</span> / {grade.maxScore}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant={grade.score >= 15 ? "default" : grade.score >= 12 ? "secondary" : "destructive"}>
                      {grade.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
