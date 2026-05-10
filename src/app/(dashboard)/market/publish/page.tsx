
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ImageUp, Loader2, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useFirestore, useStorage, useUser } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

const formSchema = z.object({
  title: z.string().min(1, "Le titre est requis."),
  description: z.string().min(1, "La description est requise."),
  price: z.string().min(1, "Le prix est requis."),
  category: z.string().min(1, "La catégorie est requise."),
  location: z.string().min(1, "La localisation est requise."),
});

export default function PublishAdPage() {
  const router = useRouter();
  const firestore = useFirestore();
  const storage = useStorage();
  const { user } = useUser();
  const { toast } = useToast();

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      category: "",
      location: "",
    },
  });
  
  const { isSubmitting } = form.formState;

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
      setImagePreviews(newImageUrls);
    }
  };

  const removeImage = (index: number) => {
    const newImageFiles = [...imageFiles];
    newImageFiles.splice(index, 1);
    setImageFiles(newImageFiles);
    
    const newImageUrls = newImageFiles.map(file => URL.createObjectURL(file));
    setImagePreviews(newImageUrls);
  };
  
  const uploadImages = async (): Promise<string[]> => {
    if (!storage || imageFiles.length === 0 || !user) return [];
    
    const imageUrls: string[] = [];
    for (const file of imageFiles) {
      const storageRef = ref(storage, `products/${user.uid}/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      imageUrls.push(downloadURL);
    }
    return imageUrls;
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!firestore || !user) {
      toast({ variant: 'destructive', title: 'Erreur', description: 'Vous devez être connecté.' });
      return;
    }
    
    try {
      const imageUrls = await uploadImages();
      
      const productData = {
        name: values.title,
        description: values.description,
        price: values.price,
        category: values.category,
        location: values.location,
        sellerId: user.uid,
        imageUrls: imageUrls,
        createdAt: serverTimestamp(),
      };

      addDoc(collection(firestore, 'products'), productData)
        .catch(async (err) => {
            const permissionError = new FirestorePermissionError({
                path: `products`,
                operation: 'create',
                requestResourceData: productData,
            });
            errorEmitter.emit('permission-error', permissionError);
        });

      toast({ title: 'Annonce publiée', description: 'Votre produit est maintenant visible sur le marché.' });
      router.push('/market');

    } catch (error) {
      console.error(error);
      toast({ variant: 'destructive', title: 'Erreur', description: "Une erreur s'est produite lors de la publication." });
    }
  }

  const categories = ["Artisanat", "Alimentaire", "Mode", "Électronique", "Maison", "Services", "Véhicules"];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Publier une nouvelle annonce</h1>
        <p className="text-muted-foreground">Remplissez les détails de votre produit ou service.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Informations sur le produit</CardTitle>
              <CardDescription>Donnez un maximum de détails pour attirer les acheteurs.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <Label>Titre de l'annonce</Label>
                    <FormControl>
                      <Input placeholder="Ex: Chaise en bois fabriquée à la main" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <Label>Description</Label>
                    <FormControl>
                      <Textarea placeholder="Décrivez votre produit en détail..." rows={5} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Prix</Label>
                      <FormControl>
                        <Input placeholder="Ex: 50$" type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Catégorie</Label>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez une catégorie" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <Label>Localisation</Label>
                    <FormControl>
                      <Input placeholder="Ex: Goma, Quartier Les Volcans" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
                <CardTitle>Photos</CardTitle>
                <CardDescription>Ajoutez jusqu'à 5 photos. La première sera la photo principale.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {imagePreviews.map((image, index) => (
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
                    {imagePreviews.length < 5 && (
                      <Label htmlFor="image-upload" className="aspect-square border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-muted-foreground cursor-pointer hover:bg-muted/50 transition-colors">
                        <ImageUp className="h-8 w-8" />
                        <span className="text-xs text-center mt-2">Ajouter</span>
                        <Input id="image-upload" type="file" multiple accept="image/*" className="sr-only" onChange={handleImageChange} />
                      </Label>
                    )}
                </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
              <Button size="lg" type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Publier l'annonce
              </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
