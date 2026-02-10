'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search, Store, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useFirestore } from "@/firebase";
import { collection, onSnapshot, query } from "firebase/firestore";

export default function MarketPage() {
  const firestore = useFirestore();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const categories = ["Toutes", "Artisanat", "Alimentaire", "Mode", "Électronique", "Maison"];

  useEffect(() => {
    if (!firestore) return;
    const unsubscribe = onSnapshot(collection(firestore, "products"), (snapshot) => {
      setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, [firestore]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">Marché Local</h1>
          <p className="text-muted-foreground">Découvrez et achetez les produits de nos artisans et commerçants.</p>
        </div>
        <Button asChild>
          <Link href="/market/publish">
            <PlusCircle className="mr-2 h-4 w-4" />
            Publier une annonce
          </Link>
        </Button>
      </div>


      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Rechercher un produit..." className="pl-10" />
        </div>
        <div className="flex gap-4">
            <Select defaultValue="Toutes">
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
      ) : products.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
            <Card key={product.id} className="flex flex-col h-full overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
                <Link href={`/market/${product.id}`} className="flex flex-col h-full">
                {product.imageUrls && product.imageUrls.length > 0 && (
                    <div className="aspect-square relative w-full bg-secondary overflow-hidden">
                    <Image
                        src={product.imageUrls[0]}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    </div>
                )}
                <CardHeader className="p-4">
                    <CardTitle className="text-lg font-headline leading-tight">{product.name}</CardTitle>
                    <p className="text-sm text-muted-foreground pt-1">{product.location}</p>
                </CardHeader>
                <CardContent className="p-4 pt-0 flex-grow">
                    <Badge variant="secondary">{product.category}</Badge>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between items-center">
                    <p className="text-lg font-semibold">{product.price}</p>
                    <Button variant="outline" asChild>
                        <span className="w-full text-center">Voir l'offre</span>
                    </Button>
                </CardFooter>
                </Link>
            </Card>
            ))}
        </div>
      ) : (
        <div className="text-center py-20 border-2 border-dashed rounded-lg bg-muted/30">
            <Store className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold">Le marché est vide</h3>
            <p className="text-muted-foreground">Soyez le premier à publier un produit local !</p>
        </div>
      )}
    </div>
  );
}
