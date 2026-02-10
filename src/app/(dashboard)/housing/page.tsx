'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search, Home, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useFirestore } from "@/firebase";
import { collection, onSnapshot } from "firebase/firestore";

export default function HousingPage() {
  const firestore = useFirestore();
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const categories = ["Tout", "Maison", "Chambre", "Studio", "Terrain"];

  useEffect(() => {
    if (!firestore) return;
    const unsubscribe = onSnapshot(collection(firestore, "housing"), (snapshot) => {
      setListings(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, [firestore]);

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
      
      {loading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : listings.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {listings.map((listing) => (
            <Card key={listing.id} className="flex flex-col h-full overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
                <Link href={`/housing/${listing.id}`} className="flex flex-col h-full">
                {listing.imageUrls && listing.imageUrls.length > 0 && (
                    <div className="aspect-video relative w-full bg-secondary overflow-hidden">
                    <Image
                        src={listing.imageUrls[0]}
                        alt={listing.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
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
      ) : (
        <div className="text-center py-20 border-2 border-dashed rounded-lg bg-muted/30">
            <Home className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold">Aucune annonce immobilière</h3>
            <p className="text-muted-foreground">Les offres de location et de vente apparaîtront ici.</p>
        </div>
      )}
    </div>
  );
}
