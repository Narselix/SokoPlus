import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { jobs } from "@/lib/placeholder-data";
import { MapPin, Search, PlusCircle } from "lucide-react";

export default function JobsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">Emploi & Freelance</h1>
          <p className="text-muted-foreground">Trouvez des offres d'emploi et des missions freelance au Kivu et au-delà.</p>
        </div>
        <Button asChild>
            <Link href="/jobs/publish">
                <PlusCircle className="mr-2 h-4 w-4" />
                Publier une offre
            </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Rechercher un poste, une compétence..." className="pl-10" />
        </div>
        <Button>Rechercher</Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <Card key={job.id} className="flex flex-col h-full overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
            <Link href={`/jobs/${job.id}`} className="flex flex-col h-full">
                <CardHeader className="flex-row items-center gap-4 p-4">
                    {job.logo && <Image src={job.logo.imageUrl} alt={job.company} width={40} height={40} className="rounded-md object-contain" data-ai-hint={job.logo.imageHint}/>}
                    <div>
                        <CardTitle className="text-lg font-headline leading-tight">{job.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{job.company}</p>
                    </div>
                </CardHeader>
                <CardContent className="p-4 pt-0 flex-grow">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                        <MapPin className="h-4 w-4" /> {job.location}
                    </div>
                    <div className="flex flex-wrap gap-2">
                         <Badge variant="secondary">{job.type}</Badge>
                         {job.tags.map(tag => (
                            <Badge key={tag} variant="outline">{tag}</Badge>
                        ))}
                    </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                     <Button variant="outline" className="w-full">Voir l'offre</Button>
                </CardFooter>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
