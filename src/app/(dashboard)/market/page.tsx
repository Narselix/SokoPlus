import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { products } from "@/lib/placeholder-data";
import { Search, ShoppingCart } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function MarketPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Marché Local</h1>
        <p className="text-muted-foreground">Découvrez et achetez les produits de nos artisans et commerçants.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Rechercher un produit..." className="pl-10" />
        </div>
        <div className="flex gap-4">
            <Select>
            <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Catégories" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">Toutes</SelectItem>
                <SelectItem value="artisanat">Artisanat</SelectItem>
                <SelectItem value="alimentaire">Alimentaire</SelectItem>
                <SelectItem value="mode">Mode</SelectItem>
            </SelectContent>
            </Select>
            <Button>Rechercher</Button>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <Card key={product.id} className="flex flex-col h-full overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {product.image && (
              <div className="aspect-square relative w-full bg-secondary">
                <Image
                  src={product.image.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                  data-ai-hint={product.image.imageHint}
                />
              </div>
            )}
            <CardHeader className="p-4">
                <CardTitle className="text-lg font-headline leading-tight">{product.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 flex-grow">
              <p className="text-sm text-muted-foreground">Vendu par : {product.seller}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between items-center">
                <p className="text-lg font-semibold">{product.price}</p>
                <Button variant="outline" size="icon">
                    <ShoppingCart className="h-4 w-4"/>
                    <span className="sr-only">Ajouter au panier</span>
                </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
