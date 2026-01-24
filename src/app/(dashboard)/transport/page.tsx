import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { transportServices } from "@/lib/placeholder-data";
import { PlusCircle, Search, Star } from "lucide-react";

export default function TransportPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">Transport</h1>
          <p className="text-muted-foreground">Facilitez votre mobilité locale et communautaire.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Demander une course
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Rechercher par destination ou chauffeur..." className="pl-10" />
        </div>
        <Button>Rechercher</Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {transportServices.map((service) => (
          <Card key={service.id} className="flex flex-col h-full overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
              {service.image && (
                <div className="aspect-video relative w-full bg-secondary overflow-hidden">
                  <Image
                    src={service.image.imageUrl}
                    alt={service.type}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    data-ai-hint={service.image.imageHint}
                  />
                </div>
              )}
              <CardHeader className="p-4">
                  <CardTitle className="text-lg font-headline leading-tight">{service.type}</CardTitle>
                  <p className="text-sm font-semibold pt-1">{service.driver}</p>
                   <p className="text-sm text-muted-foreground">{service.vehicle}</p>
              </CardHeader>
              <CardContent className="p-4 pt-0 flex-grow">
                 <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{service.rating}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">Localisation: {service.location}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                  <Button variant="outline" className="w-full">
                    Contacter
                  </Button>
              </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
