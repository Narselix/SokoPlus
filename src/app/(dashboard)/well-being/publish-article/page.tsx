import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function PublishArticlePage() {
  const articleCategories = ["Santé Mentale", "Social", "Développement Personnel", "Stress", "Famille"];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Publier un nouvel article</h1>
        <p className="text-muted-foreground">Partagez vos conseils et votre expertise avec la communauté.</p>
      </div>

      <form className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Détails de l'article</CardTitle>
            <CardDescription>Rédigez votre article et choisissez une catégorie pertinente.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titre de l'article</Label>
              <Input id="title" placeholder="Ex: 5 techniques pour gérer le stress" />
            </div>
             <div className="space-y-2">
              <Label htmlFor="author">Nom de l'auteur</Label>
              <Input id="author" placeholder="Ex: Dr. A. Mweni" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Catégorie</Label>
              <Select>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Sélectionnez une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {articleCategories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                  </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Contenu de l'article</Label>
              <Textarea id="content" placeholder="Rédigez votre article ici..." rows={12} />
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-end">
            <Button size="lg" type="submit">
                Publier l'article
            </Button>
        </div>
      </form>
    </div>
  );
}
