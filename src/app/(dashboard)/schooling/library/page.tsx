'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Book, Bookmark, History, Plus } from "lucide-react";
import { useUser } from "@/firebase";

const mockBooks = [
  { id: 1, title: "L'Enfant Noir", author: "Camara Laye", category: "Littérature", available: true, location: "Rayon A-12" },
  { id: 2, title: "Mathématiques 6ème", author: "Collectif", category: "Manuel Scolaire", available: false, returnDate: "12 Avril" },
  { id: 3, title: "Une Saison au Congo", author: "Aimé Césaire", category: "Théâtre", available: true, location: "Rayon B-04" },
  { id: 4, title: "Physique-Chimie 3ème", author: "Éditions Nathan", category: "Manuel Scolaire", available: true, location: "Rayon C-01" },
];

export default function LibraryPage() {
  const { userProfile } = useUser();
  const isAdmin = userProfile?.role === "Admin";

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">Bibliothèque Scolaire</h1>
          <p className="text-muted-foreground">Consultez le catalogue et gérez vos emprunts.</p>
        </div>
        {isAdmin && (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un ouvrage
          </Button>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Rechercher un livre</CardTitle>
            <div className="relative mt-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Titre, auteur, catégorie..." className="pl-10" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockBooks.map((book) => (
              <div key={book.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center text-primary">
                    <Book className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold">{book.title}</h3>
                    <p className="text-sm text-muted-foreground">{book.author} • {book.category}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge variant={book.available ? "default" : "secondary"}>
                    {book.available ? "Disponible" : `Indisponible (Retour: ${book.returnDate})`}
                  </Badge>
                  {book.available && <span className="text-xs text-muted-foreground">{book.location}</span>}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <History className="h-5 w-5" /> Mes Emprunts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-primary/5 border-l-4 border-primary rounded">
                  <p className="text-sm font-bold">L'Étranger - Albert Camus</p>
                  <p className="text-xs text-muted-foreground">À rendre avant le : 10 Avril 2024</p>
                </div>
                <p className="text-xs text-center text-muted-foreground">Historique des 30 derniers jours</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full text-xs">Voir l'historique complet</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Bookmark className="h-5 w-5" /> Liste de souhaits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground italic">Vous n'avez pas encore ajouté de livres à votre liste de souhaits.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
