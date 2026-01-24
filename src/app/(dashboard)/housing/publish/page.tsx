import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ImageUp, PlusCircle } from "lucide-react";

export default function PublishHousingPage() {
  const categories = ["Maison", "Chambre", "Studio", "Terrain"];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Publier une annonce de logement</h1>
        <p className="text-muted-foreground">Remplissez les détails de votre propriété.</p>
      </div>

      <form className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Informations sur le logement</CardTitle>
            <CardDescription>Donnez un maximum de détails pour attirer les locataires ou acheteurs.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titre de l'annonce</Label>
              <Input id="title" placeholder="Ex: Belle maison 3 chambres à louer" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Décrivez votre propriété en détail (nombre de pièces, superficie, etc.)..." rows={5} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Prix</Label>
                <Input id="price" placeholder="Ex: 450$/mois ou 15000$" type="text" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Type de logement</Label>
                <Select>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Sélectionnez un type" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Localisation</Label>
              <Input id="location" placeholder="Ex: Goma, Quartier Les Volcans" />
            </div>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Photos</CardTitle>
                <CardDescription>Ajoutez des photos de la propriété. La première sera la photo principale.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="aspect-square border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-muted-foreground cursor-pointer hover:bg-muted/50">
                        <ImageUp className="h-8 w-8" />
                        <span className="text-xs text-center mt-2">Ajouter une photo</span>
                    </div>
                     {Array(4).fill(0).map((_, i) => (
                         <div key={i} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                            <PlusCircle className="h-6 w-6 text-muted-foreground/50"/>
                         </div>
                     ))}
                </div>
            </CardContent>
        </Card>
        
        <div className="flex justify-end">
            <Button size="lg" type="submit">
                Publier l'annonce
            </Button>
        </div>
      </form>
    </div>
  );
}
