import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { freelanceMissions } from "@/lib/placeholder-data";
import { Search, PlusCircle } from "lucide-react";

export default function FreelancePage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">Missions Freelance</h1>
          <p className="text-muted-foreground">Trouvez des missions adaptées à vos compétences sur le marché local.</p>
        </div>
        <Button asChild>
            <Link href="/freelance/publish">
                <PlusCircle className="mr-2 h-4 w-4" />
                Publier une mission
            </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Rechercher une mission, une compétence..." className="pl-10" />
        </div>
        <Button>Rechercher</Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {freelanceMissions.map((mission) => (
          <Card key={mission.id} className="flex flex-col h-full overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
            <Link href={`/freelance/${mission.id}`} className="flex flex-col h-full">
                <CardHeader className="flex-row items-center gap-4 p-4">
                    {mission.logo && <Image src={mission.logo.imageUrl} alt={mission.client} width={40} height={40} className="rounded-md object-contain" data-ai-hint={mission.logo.imageHint}/>}
                    <div>
                        <CardTitle className="text-lg font-headline leading-tight">{mission.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{mission.client}</p>
                    </div>
                </CardHeader>
                <CardContent className="p-4 pt-0 flex-grow">
                    <p className="font-bold text-primary mb-2">{mission.budget}</p>
                    <div className="flex flex-wrap gap-2">
                         <Badge variant="secondary">{mission.type}</Badge>
                         {mission.tags.map(tag => (
                            <Badge key={tag} variant="outline">{tag}</Badge>
                        ))}
                    </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                     <Button variant="outline" className="w-full">Voir la mission</Button>
                </CardFooter>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
