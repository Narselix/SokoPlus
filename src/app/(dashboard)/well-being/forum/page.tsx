import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

const forumPosts = [
    {
        id: 1,
        content: "Je me sens vraiment dépassé par les études en ce moment. La pression est énorme et j'ai l'impression de ne jamais en faire assez. Est-ce que d'autres ressentent ça ?",
        timestamp: "il y a 2 heures",
        replies: 3,
    },
    {
        id: 2,
        content: "Juste un message pour dire à tous ceux qui luttent en silence : vous n'êtes pas seuls. Parler aide. N'hésitez pas à chercher de l'aide. Courage.",
        timestamp: "il y a 5 heures",
        replies: 8,
    },
     {
        id: 3,
        content: "Concilier travail, famille et projets personnels est un vrai défi. Parfois, j'ai l'impression de courir un marathon sans fin. Des conseils pour trouver un meilleur équilibre ?",
        timestamp: "il y a 1 jour",
        replies: 5,
    }
];

export default function ForumPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Espace d'expression anonyme</h1>
        <p className="text-muted-foreground">
            Un lieu sûr pour partager vos pensées, poser des questions et recevoir du soutien de la communauté. Votre identité reste confidentielle.
        </p>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Partager une pensée</CardTitle>
            <CardDescription>Votre message sera publié anonymement.</CardDescription>
        </CardHeader>
        <CardContent>
            <Textarea placeholder="Exprimez-vous librement..." rows={5} />
        </CardContent>
        <CardFooter>
            <Button>Publier anonymement</Button>
        </CardFooter>
      </Card>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight font-headline">Discussions récentes</h2>
        {forumPosts.map(post => (
             <Card key={post.id}>
                <CardContent className="p-6">
                    <p className="text-muted-foreground">{post.content}</p>
                </CardContent>
                <CardFooter className="text-xs text-muted-foreground justify-between">
                    <span>{post.timestamp}</span>
                    <span>{post.replies} réponses</span>
                </CardFooter>
            </Card>
        ))}
      </div>
    </div>
  );
}
