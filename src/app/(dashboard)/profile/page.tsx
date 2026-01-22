'use client';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUser, useFirestore } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError } from "@/firebase/errors";

const profileSchema = z.object({
  name: z.string().min(1, "Le nom est requis."),
  email: z.string().email("L'email est invalide."),
  role: z.enum(["Student", "Teacher", "Admin"]),
});

export default function ProfilePage() {
    const { user, userProfile, loading } = useUser();
    const firestore = useFirestore();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: "",
            email: "",
            role: "Student",
        }
    });

    useEffect(() => {
        if (userProfile) {
            form.reset({
                name: userProfile.name,
                email: userProfile.email,
                role: userProfile.role,
            });
        } else if (user) {
            form.reset({
                name: user.displayName || "",
                email: user.email || "",
                role: "Student",
            });
        }
    }, [user, userProfile, form]);
    
    const { isSubmitting } = form.formState;

    async function onSubmit(values: z.infer<typeof profileSchema>) {
        if (!firestore || !user) {
            toast({ variant: "destructive", title: "Erreur", description: "Utilisateur non connecté ou Firestore non disponible." });
            return;
        }

        const userRef = doc(firestore, "users", user.uid);
        const userData = {
            ...userProfile,
            name: values.name,
            email: values.email,
            role: values.role,
        };

        setDoc(userRef, userData, { merge: true })
            .then(() => {
                toast({ title: "Profil mis à jour", description: "Vos informations ont été enregistrées." });
            })
            .catch(async () => {
                 const permissionError = new FirestorePermissionError({
                    path: userRef.path,
                    operation: 'update',
                    requestResourceData: userData,
                });
                errorEmitter.emit('permission-error', permissionError);
                toast({ variant: "destructive", title: "Erreur", description: "Impossible d'enregistrer les modifications." });
            });
    }

    const getInitials = (name: string | undefined) => {
        if (!name) return 'U';
        const names = name.split(' ');
        if (names.length > 1) {
            return `${names[0][0]}${names[names.length-1][0]}`.toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    }
    
    if (loading) {
        return (
             <div className="flex h-full w-full items-center justify-center">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        )
    }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Profil Utilisateur</h1>
        <p className="text-muted-foreground">Gérez les informations de votre compte.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Photo de profil</CardTitle>
          <CardDescription>
            Ceci sera affiché sur votre profil public.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
           <Avatar className="h-20 w-20">
            <AvatarImage src={user?.photoURL || ''} alt="Avatar" />
            <AvatarFallback>{getInitials(userProfile?.name)}</AvatarFallback>
          </Avatar>
          <Button type="button">Changer la photo</Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Informations personnelles</CardTitle>
          <CardDescription>
            Mettez à jour vos informations personnelles ici.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="space-y-2">
                <Label htmlFor="name">Nom complet</Label>
                <Input id="name" {...form.register("name")} />
                 {form.formState.errors.name && <p className="text-sm font-medium text-destructive">{form.formState.errors.name.message}</p>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...form.register("email")} disabled/>
                 <p className="text-xs text-muted-foreground">La modification de l'email n'est pas supportée ici.</p>
            </div>
          </div>
           <div className="space-y-2">
            <Label htmlFor="role">Rôle principal</Label>
             <Controller
                control={form.control}
                name="role"
                render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger id="role">
                            <SelectValue placeholder="Sélectionnez un rôle" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Student">Apprenant(e)</SelectItem>
                            <SelectItem value="Teacher">Enseignant(e)</SelectItem>
                            <SelectItem value="Admin">Administrateur</SelectItem>
                        </SelectContent>
                    </Select>
                )}
             />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isSubmitting}>
             {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Enregistrer les modifications</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
