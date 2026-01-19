import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { pharmacyItems } from "@/lib/placeholder-data";
import { Search } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

export default function PharmacyPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Pharmacie en Ligne</h1>
        <p className="text-muted-foreground">Consultez le catalogue des produits de nos pharmacies partenaires.</p>
      </div>
      
       <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Avertissement</AlertTitle>
          <AlertDescription>
            Soko+ ne fournit pas de diagnostic médical. Consultez toujours un professionnel de santé avant toute commande.
          </AlertDescription>
        </Alert>

      <div className="flex gap-4 items-center">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Rechercher un médicament..." className="pl-10" />
        </div>
        <Button>Rechercher</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {pharmacyItems.map((item) => (
          <Card key={item.id} className="flex flex-col h-full overflow-hidden hover:shadow-lg transition-shadow duration-300">
             {item.image && (
              <div className="aspect-square relative w-full bg-secondary">
                <Image
                  src={item.image.imageUrl}
                  alt={item.name}
                  fill
                  className="object-cover"
                  data-ai-hint={item.image.imageHint}
                />
              </div>
            )}
            <CardHeader className="p-4">
                <CardTitle className="text-lg font-headline leading-tight">{item.name}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0 flex-grow">
                <p className="text-sm text-muted-foreground">Disponible chez : <span className="font-medium">{item.pharmacy}</span></p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <Button className="w-full">Commander</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
