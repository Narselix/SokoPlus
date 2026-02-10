
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
import { ImageUp, Loader2, X, BookPlus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useFirestore, useStorage, useUser } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

const formSchema = z.object({
  title: z.string().min(5, "Le titre doit faire au moins 5 caractères."),
  description: z.string().min(20, "Veuillez fournir une description détaillée."),
  category: z.string().min(1, "La catégorie est requise."),
  level: z.string().min(1, "Le niveau est requis."),
  duration: z.string().min(1, "Indiquez la durée estimée."),
});

export default function PublishCoursePage() {
  const router = useRouter();
  const firestore = useFirestore();
  const storage = useStorage();
  const { user, userProfile } = useUser();
  const { toast } = useToast();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      level: "",
      duration: "",
    },
  });

  const { isSubmitting } = form.formState;

  const categories = ["Mathématiques", "Science", "Français", "Histoire-Géo", "Informatique", "Langues", "Technique", "Sport", "Art"];
  const levels = ["Primaire", "Secondaire", "Université", "Professionnel", "Tous niveaux"];

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
    
    const storageRef = ref(storage, `courses/${user.uid}/${Date.now()}_${imageFile.name}`);
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
      
      const courseData = {
        ...values,
        teacher: userProfile?.name || user.displayName || "Enseignant",
        teacherId: user.uid,
        imageUrl: imageUrl || null,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(firestore, 'courses'), courseData)
        .catch(err => {
            const permissionError = new FirestorePermissionError({
                path: 'courses/unknown',
                operation: 'create',
                requestResourceData: courseData,
            });
            errorEmitter.emit('permission-error', permissionError);
            throw err;
        });

      toast({ title: 'Cours créé', description: 'Le cours est maintenant disponible dans le catalogue.' });
      router.push('/schooling/admin/courses');

    } catch (error) {
      console.error(error);
      toast({ variant: 'destructive', title: 'Erreur', description: "Une erreur s'est produite lors de la publication." });
    }
  }


  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <X className="h-6 w-6" />
        </Button>
        <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline">Nouveau Cours</h1>
            <p className="text-muted-foreground">Créez un contenu pédagogique pour vos élèves.</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Informations Générales</CardTitle>
              <CardDescription>Détails visibles par les élèves dans le catalogue.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <Label>Titre du cours</Label>
                    <FormControl><Input placeholder="Ex: Algèbre linéaire appliquée" {...field} /></FormControl>
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
                    <FormControl><Textarea placeholder="Décrivez les objectifs du cours, les prérequis, etc..." rows={6} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Matière / Catégorie</Label>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choisir" />
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
                <FormField
                  control={form.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Niveau</Label>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choisir" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {levels.map(lvl => <SelectItem key={lvl} value={lvl}>{lvl}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Durée estimée</Label>
                      <FormControl><Input placeholder="Ex: 10h de formation" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
              <CardHeader>
                  <CardTitle>Couverture du cours</CardTitle>
                  <CardDescription>Une image attrayante pour illustrer votre cours.</CardDescription>
              </CardHeader>
              <CardContent>
                  {imagePreview ? (
                      <div className="relative aspect-video w-full max-w-md group border rounded-md overflow-hidden">
                          <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                          <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={removeImage}
                          >
                          <X className="h-4 w-4" />
                          </Button>
                      </div>
                  ) : (
                      <Label htmlFor="image-upload" className="aspect-video w-full max-w-md border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-muted-foreground cursor-pointer hover:bg-muted/50 transition-colors">
                          <ImageUp className="h-8 w-8 mb-2" />
                          <span className="text-sm">Téléverser une image</span>
                          <Input id="image-upload" type="file" accept="image/*" className="sr-only" onChange={handleImageChange} />
                      </Label>
                  )}
              </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
              <Button variant="outline" type="button" onClick={() => router.back()}>Annuler</Button>
              <Button size="lg" type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  <BookPlus className="mr-2 h-4 w-4" />
                  Créer le cours
              </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
