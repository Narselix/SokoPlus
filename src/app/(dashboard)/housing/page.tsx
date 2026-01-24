import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { housingListings } from "@/lib/placeholder-data";
import { PlusCircle, Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export default function HousingPage() {
  const categories = ["Tout", "Maison", "Chambre", "Studio", "Terrain"];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">Logement</h1>
          <p className="text-muted-foreground">Trouvez un logement fiable, local et vérifié.</p>
        </div>
        <Button asChild>
          <Link href="/housing/publish">
            <PlusCircle className="mr-2 h-4 w-4" />
            Publier une annonce
          </Link>
        </Button>
      </div>


      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Rechercher par localisation..." className="pl-10" />
        </div>
        <div className="flex gap-4">
            <Select defaultValue="Tout">
            <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Catégories" />
            </SelectTrigger>
            <SelectContent>
                {categories.map(category => (
                     <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
            </SelectContent>
            </Select>
            <Button>Rechercher</Button>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {housingListings.map((listing) => (
          <Card key={listing.id} className="flex flex-col h-full overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
            <Link href={`/housing/${listing.id}`} className="flex flex-col h-full">
              {listing.image && (
                <div className="aspect-video relative w-full bg-secondary overflow-hidden">
                  <Image
                    src={listing.image.imageUrl}
                    alt={listing.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    data-ai-hint={listing.image.imageHint}
                  />
                </div>
              )}
              <CardHeader className="p-4">
                  <CardTitle className="text-lg font-headline leading-tight">{listing.title}</CardTitle>
                  <p className="text-sm text-muted-foreground pt-1">{listing.location}</p>
              </CardHeader>
              <CardContent className="p-4 pt-0 flex-grow">
                <Badge variant="secondary">{listing.type}</Badge>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between items-center">
                  <p className="text-lg font-semibold text-primary">{listing.price}</p>
                  <Button variant="outline" asChild>
                    <span className="w-full text-center">Voir le logement</span>
                  </Button>
              </CardFooter>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
