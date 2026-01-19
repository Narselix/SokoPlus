import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { jobs } from "@/lib/placeholder-data";
import { MapPin, Search } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function JobsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Emploi & Freelance</h1>
        <p className="text-muted-foreground">Trouvez des offres d'emploi et des missions freelance au Kivu et au-delà.</p>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Rechercher un poste, une compétence..." className="pl-10" />
        </div>
        <Button>Rechercher</Button>
        <Button variant="outline" className="hidden sm:inline-flex">Filtres</Button>
      </div>
      
      <div className="space-y-4">
        {jobs.map((job) => (
          <Card key={job.id} className="hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row">
                <div className="p-6 flex items-center justify-center sm:border-r">
                    {job.logo && <Image src={job.logo.imageUrl} alt={job.company} width={50} height={50} className="rounded-md object-contain" data-ai-hint={job.logo.imageHint}/>}
                </div>
                <div className="flex-grow">
                    <CardHeader>
                        <CardTitle className="font-headline">{job.title}</CardTitle>
                        <CardDescription>
                            <span className="font-semibold">{job.company}</span>
                            <span className="flex items-center gap-1 text-sm mt-1">
                                <MapPin className="h-3 w-3" /> {job.location}
                            </span>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                        <Badge variant="secondary">{job.type}</Badge>
                        {job.tags.map(tag => (
                            <Badge key={tag} variant="outline">{tag}</Badge>
                        ))}
                    </CardContent>
                </div>
                 <div className="p-6 flex items-center justify-center sm:border-l">
                    <Button>Postuler</Button>
                </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
