import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { wellBeingArticles } from "@/lib/placeholder-data";

export default function WellBeingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Espace Écoute & Bien-être</h1>
        <p className="text-muted-foreground">Des ressources pour votre soutien psychologique et bien-être.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="md:col-span-2 lg:col-span-3 bg-accent/50">
            <CardHeader>
                <CardTitle className="font-headline">Espace d'expression anonyme</CardTitle>
                <CardDescription>Partagez vos pensées ou lisez les messages de soutien de la communauté. Un espace sûr et anonyme.</CardDescription>
            </CardHeader>
            <CardFooter>
                <Button>Participer à la discussion</Button>
            </CardFooter>
        </Card>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold tracking-tight font-headline mb-4">Articles & Conseils</h2>
        <div className="grid gap-6 md:grid-cols-2">
            {wellBeingArticles.map((article) => (
                <Card key={article.id} className="flex flex-col md:flex-row h-full overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    {article.image && (
                    <div className="md:w-1/3 relative aspect-video md:aspect-auto">
                        <Image
                        src={article.image.imageUrl}
                        alt={article.title}
                        fill
                        className="object-cover"
                        data-ai-hint={article.image.imageHint}
                        />
                    </div>
                    )}
                    <div className="md:w-2/3 flex flex-col">
                        <CardHeader>
                            <CardTitle className="font-headline">{article.title}</CardTitle>
                            <CardDescription>Catégorie : {article.category}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-sm text-muted-foreground">Par {article.author}</p>
                        </CardContent>
                        <CardFooter>
                            <Button variant="link" className="p-0">Lire l'article</Button>
                        </CardFooter>
                    </div>
                </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
