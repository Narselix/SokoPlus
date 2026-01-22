'use client';

import { products } from "@/lib/placeholder-data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Phone, ShoppingCart, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProductDetailPage({ params }: { params: { productId: string } }) {
  const product = products.find(p => p.id.toString() === params.productId);

  if (!product) {
    notFound();
  }
  
  return (
    <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
        <div className="md:col-span-2">
            <div className="aspect-square relative w-full rounded-lg overflow-hidden mb-4 shadow-lg">
                {product.image && <Image src={product.image.imageUrl} alt={product.name} fill className="object-cover" data-ai-hint={product.image.imageHint} />}
            </div>
            
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Description</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{product.description}</p>
                </CardContent>
            </Card>
        </div>

        <div className="space-y-6">
            <div className="space-y-2">
                <Badge variant="secondary">{product.category}</Badge>
                <h1 className="text-3xl lg:text-4xl font-bold tracking-tight font-headline">{product.name}</h1>
                <p className="text-3xl font-bold text-primary">{product.price}</p>
                 <p className="text-sm text-muted-foreground">{product.location}</p>
            </div>
            
            <Card>
                 <CardContent className="p-4 flex flex-col gap-4">
                    <Button className="w-full" size="lg">
                      <ShoppingCart className="mr-2 h-5 w-5"/>
                      Commander
                    </Button>
                    <Button className="w-full" variant="outline" size="lg">
                      <MessageSquare className="mr-2 h-5 w-5"/>
                      Contacter le vendeur
                    </Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Informations du vendeur</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                   <div className="flex items-center gap-4">
                        <Avatar>
                            <AvatarImage src="https://picsum.photos/seed/seller1/100/100" />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-bold">{product.seller}</p>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span>4.8 (23 avis)</span>
                            </div>
                        </div>
                   </div>
                   <Button variant="secondary" className="w-full">
                        <Phone className="mr-2 h-4 w-4"/> Afficher le numéro
                   </Button>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
