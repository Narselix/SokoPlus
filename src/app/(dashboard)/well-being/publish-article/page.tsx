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
import { ImageUp, Loader2, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useFirestore, useStorage, useUser } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

const formSchema = z.object({
  title: z.string().min(1, "Le titre est requis."),
  author: z.string().min(1, "Le nom de l'auteur est requis."),
  category: z.string().min(1, "La catégorie est requise."),
  content: z.string().min(1, "Le contenu est requis."),
});

export default function PublishArticlePage() {
  const router = useRouter();
  const firestore = useFirestore();
  const storage = useStorage();
  const { user } = useUser();
  const { toast } = useToast();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      category: "",
      content: "",
    },
  });

  const { isSubmitting } = form.formState;

  const articleCategories = ["Santé Mentale", "Social", "Développement Personnel", "Stress", "Famille"];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };
  
  const uploadImage = async (): Promise<string | null> => {
    if (!storage || !imageFile || !user) return null;
    
    const storageRef = ref(storage, `articles/${user.uid}/${Date.now()}_${imageFile.name}`);
    await uploadBytes(storageRef, imageFile);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!firestore || !user) {
      toast({ variant: 'destructive', title: 'Erreur', description: 'Vous devez être connecté.' });
      return;
    }
    
    try {
      const imageUrl = await uploadImage();
      if (imageFile && !imageUrl) {
        throw new Error("Le téléversement de l'image a échoué.");
      }
      
      const articleData = {
        title: values.title,
        author: values.author,
        category: values.category,
        content: values.content,
        authorId: user.uid,
        imageUrl: imageUrl || null,
      };

      await addDoc(collection(firestore, 'articles'), articleData)
        .catch(err => {
            const permissionError = new FirestorePermissionError({
                path: 'articles/unknown',
                operation: 'create',
                requestResourceData: articleData,
            });
            errorEmitter.emit('permission-error', permissionError);
            throw err;
        });

      toast({ title: 'Article publié', description: 'Votre article est maintenant visible.' });
      router.push('/well-being');

    } catch (error) {
      console.error(error);
      toast({ variant: 'destructive', title: 'Erreur', description: "Une erreur s'est produite lors de la publication." });
    }
  }


  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Publier un nouvel article</h1>
        <p className="text-muted-foreground">Partagez vos conseils et votre expertise avec la communauté.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Détails de l'article</CardTitle>
              <CardDescription>Rédigez votre article et choisissez une catégorie pertinente.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <Label>Titre de l'article</Label>
                    <FormControl><Input placeholder="Ex: 5 techniques pour gérer le stress" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <Label>Nom de l'auteur</Label>
                    <FormControl><Input placeholder="Ex: Dr. A. Mweni" {...field} /></FormControl>
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
                        {articleCategories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <Label>Contenu de l'article</Label>
                    <FormControl><Textarea placeholder="Rédigez votre article ici..." rows={12} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          
          <Card>
              <CardHeader>
                  <CardTitle>Image de l'article</CardTitle>
                  <CardDescription>Ajoutez une image d'illustration pour votre article.</CardDescription>
              </CardHeader>
              <CardContent>
                  {imagePreview ? (
                      <div className="relative aspect-video w-full max-w-md group">
                          <Image src={imagePreview} alt="Preview de l'article" fill className="rounded-md object-cover" />
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
              </CardContent>
          </Card>

          <div className="flex justify-end">
              <Button size="lg" type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Publier l'article
              </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
