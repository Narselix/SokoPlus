
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Pin } from "lucide-react";

const mockNews = [
  {
    title: "Réunion des Parents d'élèves",
    content: "Nous convions tous les parents à la réunion trimestrielle ce samedi à 10h dans la grande salle.",
    date: "24 Mars 2024",
    category: "Événement",
    pinned: true
  },
  {
    title: "Calendrier des examens - 2ème Trimestre",
    content: "Veuillez trouver ci-joint le calendrier détaillé des examens qui débuteront le mois prochain.",
    date: "20 Mars 2024",
    category: "Académique",
    pinned: false
  },
  {
    title: "Journée Culturelle et Sportive",
    content: "L'école organise une journée spéciale pour célébrer les talents de nos élèves le vendredi 5 Avril.",
    date: "15 Mars 2024",
    category: "Vie Scolaire",
    pinned: false
  }
];

export default function SchoolNewsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Actualités de l'École</h1>
        <p className="text-muted-foreground">Restez informé des dernières annonces et événements scolaires.</p>
      </div>

      <div className="grid gap-6">
        {mockNews.map((item, i) => (
          <Card key={i} className={item.pinned ? "border-primary/50 bg-primary/5" : ""}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <Badge variant="outline">{item.category}</Badge>
                {item.pinned && <Pin className="h-4 w-4 text-primary" />}
              </div>
              <CardTitle className="mt-2">{item.title}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                Publié le {item.date}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {item.content}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
