'use client';

import { housingListings } from "@/lib/placeholder-data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Phone, Star, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function HousingDetailPage({ params }: { params: { housingId: string } }) {
  const listing = housingListings.find(p => p.id.toString() === params.housingId);

  if (!listing) {
    notFound();
  }
  
  return (
    <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
        <div className="md:col-span-2">
            <div className="aspect-video relative w-full rounded-lg overflow-hidden mb-4 shadow-lg">
                {listing.image && <Image src={listing.image.imageUrl} alt={listing.title} fill className="object-cover" data-ai-hint={listing.image.imageHint} />}
            </div>
            
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Description</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{listing.description}</p>
                </CardContent>
            </Card>
        </div>

        <div className="space-y-6">
            <div className="space-y-2">
                <Badge variant="secondary">{listing.type}</Badge>
                <h1 className="text-3xl lg:text-4xl font-bold tracking-tight font-headline">{listing.title}</h1>
                <p className="text-3xl font-bold text-primary">{listing.price}</p>
                 <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4"/>
                    <span>{listing.location}</span>
                </div>
            </div>
            
            <Card>
                 <CardContent className="p-4 flex flex-col gap-4">
                    <Button className="w-full" variant="outline" size="lg">
                      <MessageSquare className="mr-2 h-5 w-5"/>
                      Contacter le propriétaire
                    </Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Informations du propriétaire</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                   <div className="flex items-center gap-4">
                        <Avatar>
                            <AvatarImage src={`https://picsum.photos/seed/owner${listing.id}/100/100`} />
                            <AvatarFallback>P</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-bold">{listing.owner}</p>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span>Vendeur vérifié</span>
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
