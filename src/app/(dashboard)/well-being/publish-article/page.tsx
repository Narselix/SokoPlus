'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ImageUp, X } from 'lucide-react';

export default function PublishArticlePage() {
  const articleCategories = ["Santé Mentale", "Social", "Développement Personnel", "Stress", "Famille"];
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImage(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImage(null);
  };


  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Publier un nouvel article</h1>
        <p className="text-muted-foreground">Partagez vos conseils et votre expertise avec la communauté.</p>
      </div>

      <form className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Détails de l'article</CardTitle>
            <CardDescription>Rédigez votre article et choisissez une catégorie pertinente.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titre de l'article</Label>
              <Input id="title" placeholder="Ex: 5 techniques pour gérer le stress" />
            </div>
             <div className="space-y-2">
              <Label htmlFor="author">Nom de l'auteur</Label>
              <Input id="author" placeholder="Ex: Dr. A. Mweni" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Catégorie</Label>
              <Select>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Sélectionnez une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {articleCategories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                  </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Contenu de l'article</Label>
              <Textarea id="content" placeholder="Rédigez votre article ici..." rows={12} />
            </div>
          </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>Image de l'article</CardTitle>
                <CardDescription>Ajoutez une image d'illustration pour votre article.</CardDescription>
            </CardHeader>
            <CardContent>
                {image ? (
                    <div className="relative aspect-video w-full max-w-md group">
                        <Image src={image} alt="Preview de l'article" fill className="rounded-md object-cover" />
                        <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={removeImage}
                        >
                        <X className="h-4 w-4" />
                        </Button>
                    </div>
                ) : (
                    <Label htmlFor="image-upload" className="aspect-video w-full max-w-md border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-muted-foreground cursor-pointer hover:bg-muted/50 transition-colors">
                        <ImageUp className="h-8 w-8" />
                        <span className="text-xs text-center mt-2">Ajouter une image</span>
                        <Input id="image-upload" type="file" accept="image/*" className="sr-only" onChange={handleImageChange} />
                    </Label>
                )}
                 <p className="text-xs text-muted-foreground mt-2">
                    Pour l'instant, l'image est uniquement prévisualisée. La fonctionnalité de téléversement sera ajoutée prochainement.
                </p>
            </CardContent>
        </Card>

        <div className="flex justify-end">
            <Button size="lg" type="submit">
                Publier l'article
            </Button>
        </div>
      </form>
    </div>
  );
}
