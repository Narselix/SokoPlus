'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ImageUp, X } from "lucide-react";

export default function PublishAdPage() {
  const categories = ["Artisanat", "Alimentaire", "Mode", "Électronique", "Maison", "Services", "Véhicules"];
  const [images, setImages] = useState<string[]>([]);
  
  // A placeholder for the actual files
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      
      const currentImageCount = imageFiles.length;
      const remainingSlots = 5 - currentImageCount;
      if (remainingSlots <= 0) return;

      const filesToAdd = files.slice(0, remainingSlots);

      const newImageFiles = [...imageFiles, ...filesToAdd];
      setImageFiles(newImageFiles);
      
      const newImageUrls = newImageFiles.map(file => URL.createObjectURL(file));
      setImages(newImageUrls);
    }
  };

  const removeImage = (index: number) => {
    const newImageFiles = [...imageFiles];
    newImageFiles.splice(index, 1);
    setImageFiles(newImageFiles);

    const newImageUrls = newImageFiles.map(file => URL.createObjectURL(file));
    setImages(newImageUrls);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Publier une nouvelle annonce</h1>
        <p className="text-muted-foreground">Remplissez les détails de votre produit ou service.</p>
      </div>

      <form className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Informations sur le produit</CardTitle>
            <CardDescription>Donnez un maximum de détails pour attirer les acheteurs.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titre de l'annonce</Label>
              <Input id="title" placeholder="Ex: Chaise en bois fabriquée à la main" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Décrivez votre produit en détail..." rows={5} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Prix</Label>
                <Input id="price" placeholder="Ex: 50$" type="text" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Catégorie</Label>
                <Select>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Sélectionnez une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Localisation</Label>
              <Input id="location" placeholder="Ex: Goma, Quartier Les Volcans" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
              <CardTitle>Photos</CardTitle>
              <CardDescription>Ajoutez jusqu'à 5 photos. La première sera la photo principale.</CardDescription>
          </CardHeader>
          <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative aspect-square group">
                      <Image src={image} alt={`Preview ${index}`} fill className="rounded-md object-cover" />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  {images.length < 5 && (
                    <Label htmlFor="image-upload" className="aspect-square border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-muted-foreground cursor-pointer hover:bg-muted/50 transition-colors">
                      <ImageUp className="h-8 w-8" />
                      <span className="text-xs text-center mt-2">Ajouter</span>
                      <Input id="image-upload" type="file" multiple accept="image/*" className="sr-only" onChange={handleImageChange} />
                    </Label>
                  )}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Pour l'instant, les images sont uniquement prévisualisées. La fonctionnalité de téléversement sera ajoutée prochainement.
              </p>
          </CardContent>
        </Card>
        
        <div className="flex justify-end">
            <Button size="lg" type="submit">
                Publier l'annonce
            </Button>
        </div>
      </form>
    </div>
  );
}
