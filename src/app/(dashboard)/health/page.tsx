import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { healthArticles, healthCenters } from "@/lib/placeholder-data";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Hospital, MapPin, Search, Stethoscope, Terminal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function HealthPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Santé & Télé-Orientation</h1>
        <p className="text-muted-foreground">Trouvez des informations, des professionnels et des services de santé près de chez vous.</p>
      </div>

       <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Avertissement Important</AlertTitle>
          <AlertDescription>
            Cette section fournit des orientations et ne remplace en aucun cas un diagnostic médical. En cas d'urgence, contactez immédiatement un professionnel de santé.
          </AlertDescription>
        </Alert>

      <Card>
        <CardHeader>
            <CardTitle>Questionnaire d'orientation (Bientôt disponible)</CardTitle>
            <CardDescription>Répondez à quelques questions pour être orienté vers le service le plus adapté.</CardDescription>
        </CardHeader>
        <CardContent>
            <Button disabled>Démarrer le questionnaire</Button>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight font-headline">Annuaire Santé</h2>
        <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Rechercher un hôpital, un service..." className="pl-10" />
            </div>
            <Button>Rechercher</Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {healthCenters.map((center) => (
                <Card key={center.id} className="flex flex-col h-full">
                    {center.image && (
                        <div className="aspect-video relative w-full bg-secondary">
                            <Image src={center.image.imageUrl} alt={center.name} fill className="object-cover" data-ai-hint={center.image.imageHint} />
                        </div>
                    )}
                    <CardHeader>
                        <CardTitle className="font-headline text-lg flex items-center gap-2">
                           <Hospital className="h-5 w-5 text-primary"/> {center.name}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2 pt-1"><MapPin className="h-4 w-4"/>{center.location}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <div className="flex flex-wrap gap-2">
                            {center.services.map(service => (
                                <Badge key={service} variant="secondary">{service}</Badge>
                            ))}
                        </div>
                    </CardContent>
                    <CardFooter className="gap-2">
                        <Button variant="outline" className="w-full">
                           <Stethoscope className="mr-2 h-4 w-4"/> Demander un RDV
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight font-headline">Conseils & Prévention</h2>
         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {healthArticles.map(article => (
                <Link href="#" key={article.id} className="group">
                    <Card className="h-full overflow-hidden">
                        {article.image && (
                        <div className="aspect-video relative w-full bg-secondary">
                            <Image src={article.image.imageUrl} alt={article.title} fill className="object-cover transition-transform group-hover:scale-105" data-ai-hint={article.image.imageHint} />
                        </div>
                        )}
                        <CardHeader>
                            <Badge variant="outline" className="w-fit mb-2">{article.category}</Badge>
                            <CardTitle className="font-headline text-lg leading-tight">{article.title}</CardTitle>
                        </CardHeader>
                    </Card>
                </Link>
            ))}
         </div>
      </div>
    </div>
  );
}
