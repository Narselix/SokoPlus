'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Archive, FileText, Download, Plus, Filter, FolderOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const mockArchives = [
  { id: 1, name: "Reglement_Interieur_2024.pdf", type: "Règlement", date: "15/01/2024", size: "1.2 MB" },
  { id: 2, name: "Calendrier_Scolaire_V2.pdf", type: "Calendrier", date: "10/01/2024", size: "450 KB" },
  { id: 3, name: "Rapport_Trimestriel_T1.pdf", type: "Rapport", date: "20/12/2023", size: "2.8 MB" },
  { id: 4, name: "Liste_Manuels_Officiels.xlsx", type: "Pédagogique", date: "05/01/2024", size: "120 KB" },
];

export default function SchoolArchivesPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">Archives Numériques</h1>
          <p className="text-muted-foreground">Gérez et sécurisez les documents officiels de l'établissement.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Archiver un document
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
          <div className="md:col-span-1 space-y-4">
              <Card>
                  <CardHeader>
                      <CardTitle className="text-sm">Catégories</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-1 p-2">
                      <Button variant="ghost" className="w-full justify-start text-primary font-bold">
                        <FolderOpen className="mr-2 h-4 w-4" /> Tous les fichiers
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        <FileText className="mr-2 h-4 w-4" /> Administratif
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        <FileText className="mr-2 h-4 w-4" /> Pédagogique
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        <FileText className="mr-2 h-4 w-4" /> Rapports
                      </Button>
                  </CardContent>
              </Card>
              
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-4">
                    <p className="text-xs font-bold text-primary uppercase mb-2">Stockage Cloud</p>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden mb-2">
                        <div className="h-full bg-primary" style={{ width: '15%' }} />
                    </div>
                    <p className="text-[10px] text-muted-foreground">1.5 GB utilisé sur 10 GB</p>
                </CardContent>
              </Card>
          </div>

          <div className="md:col-span-3 space-y-4">
              <div className="flex gap-4">
                  <div className="relative flex-grow">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Rechercher un document archive..." className="pl-10" />
                  </div>
                  <Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button>
              </div>

              <div className="border rounded-lg overflow-hidden bg-card">
                  {mockArchives.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-4 border-b last:border-0 hover:bg-muted/30 transition-colors group">
                          <div className="flex items-center gap-4">
                              <div className="h-10 w-10 rounded bg-muted flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                                  <FileText className="h-5 w-5" />
                              </div>
                              <div>
                                  <p className="font-bold text-sm">{doc.name}</p>
                                  <div className="flex items-center gap-2 mt-1">
                                      <Badge variant="secondary" className="text-[10px] py-0">{doc.type}</Badge>
                                      <span className="text-[10px] text-muted-foreground">{doc.date} • {doc.size}</span>
                                  </div>
                              </div>
                          </div>
                          <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                          </Button>
                      </div>
                  ))}
              </div>
          </div>
      </div>
    </div>
  );
}
