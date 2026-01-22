import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function PublishJobPage() {
  const contractTypes = ["Temps plein", "Temps partiel", "Stage", "Freelance", "CDD", "CDI"];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Publier une nouvelle offre</h1>
        <p className="text-muted-foreground">Remplissez les détails du poste pour trouver le candidat idéal.</p>
      </div>

      <form className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Informations sur le poste</CardTitle>
            <CardDescription>Donnez un maximum de détails pour attirer les bons candidats.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titre du poste</Label>
              <Input id="title" placeholder="Ex: Développeur Web Full-Stack" />
            </div>
             <div className="space-y-2">
              <Label htmlFor="company">Nom de l'entreprise</Label>
              <Input id="company" placeholder="Ex: Soko+ Tech" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description complète</Label>
              <Textarea id="description" placeholder="Décrivez les missions, responsabilités, et le profil recherché..." rows={8} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Localisation</Label>
                <Input id="location" placeholder="Ex: Goma, RDC" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type de contrat</Label>
                <Select>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Sélectionnez un type" />
                  </SelectTrigger>
                  <SelectContent>
                    {contractTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags">Compétences (séparées par des virgules)</Label>
              <Input id="tags" placeholder="Ex: React, Node.js, Gestion de projet" />
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-end">
            <Button size="lg" type="submit">
                Publier l'offre
            </Button>
        </div>
      </form>
    </div>
  );
}
