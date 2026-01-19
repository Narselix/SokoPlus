import Link from "next/link";
import Image from "next/image";
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
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ProfilePage() {
    const avatar = PlaceHolderImages.find(p => p.id === 'user-avatar-1');

  return (
    <div className="space-y-8">
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
            <AvatarImage src={avatar?.imageUrl} alt="Avatar" data-ai-hint={avatar?.imageHint}/>
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <Button>Changer la photo</Button>
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
                <Input id="name" defaultValue="John Doe" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john.doe@example.com" />
            </div>
          </div>
           <div className="space-y-2">
            <Label htmlFor="role">Rôle principal</Label>
             <Select defaultValue="user">
              <SelectTrigger id="role">
                <SelectValue placeholder="Sélectionnez un rôle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">Utilisateur simple</SelectItem>
                <SelectItem value="seller">Vendeur</SelectItem>
                <SelectItem value="trainer">Formateur</SelectItem>
                <SelectItem value="recruiter">Recruteur</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Enregistrer les modifications</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
