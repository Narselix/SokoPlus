import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function PublishMissionPage() {
  const missionTypes = ["Projet ponctuel", "Mission récurrente", "Temps partiel"];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Publier une mission freelance</h1>
        <p className="text-muted-foreground">Remplissez les détails pour trouver le talent local qu'il vous faut.</p>
      </div>

      <form className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Informations sur la mission</CardTitle>
            <CardDescription>Donnez un maximum de détails pour attirer les bons profils.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titre de la mission</Label>
              <Input id="title" placeholder="Ex: Création de logo pour un restaurant" />
            </div>
             <div className="space-y-2">
              <Label htmlFor="client">Nom du client (entreprise ou particulier)</Label>
              <Input id="client" placeholder="Ex: Restaurant Le Chalet" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description complète</Label>
              <Textarea id="description" placeholder="Décrivez le projet, les livrables attendus, et le profil recherché..." rows={8} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="budget">Budget</Label>
                <Input id="budget" placeholder="Ex: 150$ ou 20$/heure" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type de mission</Label>
                <Select>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Sélectionnez un type" />
                  </SelectTrigger>
                  <SelectContent>
                    {missionTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags">Compétences (séparées par des virgules)</Label>
              <Input id="tags" placeholder="Ex: Design Graphique, Logo, Adobe Illustrator" />
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-end">
            <Button size="lg" type="submit">
                Publier la mission
            </Button>
        </div>
      </form>
    </div>
  );
}
