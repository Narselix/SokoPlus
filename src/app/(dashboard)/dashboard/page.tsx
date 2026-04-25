'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  GraduationCap, 
  Store, 
  Briefcase, 
  HeartHandshake, 
  TrendingUp, 
  Users, 
  Wallet,
  ArrowUpRight
} from "lucide-react";
import Link from "next/link";
import { useUser } from "@/firebase";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
    const { userProfile } = useUser();

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">Bonjour, {userProfile?.name?.split(' ')[0]} !</h1>
          <p className="text-muted-foreground">Bienvenue sur votre espace Soko+. Voici un aperçu de l'écosystème aujourd'hui.</p>
        </div>
        <div className="flex gap-2">
            <Badge variant="outline" className="px-3 py-1 bg-primary/5 text-primary border-primary/20">
                Rôle : {userProfile?.role || 'Utilisateur'}
            </Badge>
        </div>
      </div>

      {/* ECOSYSTEM OVERVIEW */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
            title="Scolarité" 
            value="Actif" 
            description="Suivi en temps réel" 
            icon={<GraduationCap className="h-5 w-5" />}
            href="/schooling/grades"
            color="bg-orange-500"
        />
        <StatCard 
            title="Marché" 
            value="Nouveau" 
            description="Produits locaux" 
            icon={<Store className="h-5 w-5" />}
            href="/market"
            color="bg-teal-500"
        />
        <StatCard 
            title="Emploi" 
            value="Missions" 
            description="Opportunités au Kivu" 
            icon={<Briefcase className="h-5 w-5" />}
            href="/jobs"
            color="bg-blue-500"
        />
        <StatCard 
            title="Solidarité" 
            value="Donner" 
            description="Soutenez la communauté" 
            icon={<HeartHandshake className="h-5 w-5" />}
            href="/solidarity"
            color="bg-rose-500"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* MAIN SERVICES SECTION */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle className="font-headline">Services Prioritaires</CardTitle>
            <CardDescription>Accédez rapidement aux outils essentiels de votre quotidien.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <Link href="/schooling/fees" className="group">
                    <div className="p-4 border rounded-lg hover:border-primary transition-colors flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center text-primary">
                                <Wallet className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="font-bold text-sm">Frais Scolaires</p>
                                <p className="text-xs text-muted-foreground">Paiement & Reçus</p>
                            </div>
                        </div>
                        <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                </Link>
                <Link href="/recommendations" className="group">
                    <div className="p-4 border rounded-lg hover:border-accent transition-colors flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded bg-accent/10 flex items-center justify-center text-accent">
                                <TrendingUp className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="font-bold text-sm">Conseils IA</p>
                                <p className="text-xs text-muted-foreground">Suggestions pour vous</p>
                            </div>
                        </div>
                        <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                </Link>
            </div>
            
            <div className="mt-6">
                <h4 className="text-sm font-semibold mb-3">Activités Récentes</h4>
                <div className="space-y-3">
                    <p className="text-sm text-muted-foreground italic border-l-2 pl-3 py-1">Bienvenue sur la version améliorée de Soko+. Vos activités récentes apparaîtront ici.</p>
                </div>
            </div>
          </CardContent>
        </Card>

        {/* ECOSYSTEM NEWS / COMMUNITY FEED */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="font-headline">Communauté Kivu</CardTitle>
            <CardDescription>Dernières nouvelles de la région.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="p-4 bg-muted/50 rounded-lg">
                <Badge className="mb-2">Événement</Badge>
                <p className="font-bold text-sm">Foire des Artisans de Goma</p>
                <p className="text-xs text-muted-foreground mt-1">Samedi prochain à la place de l'Indépendance.</p>
             </div>
             <div className="p-4 border rounded-lg">
                <Badge variant="outline" className="mb-2">Alerte Santé</Badge>
                <p className="font-bold text-sm">Campagne de Vaccination</p>
                <p className="text-xs text-muted-foreground mt-1">Plus d'infos dans l'annuaire santé.</p>
             </div>
             <Button variant="outline" className="w-full" asChild>
                <Link href="/governance">Toutes les annonces</Link>
             </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ title, value, description, icon, href, color }: any) {
    return (
        <Link href={href}>
            <Card className="hover:shadow-md transition-shadow group overflow-hidden relative">
                <div className={`absolute top-0 left-0 w-1 h-full ${color}`} />
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{title}</CardTitle>
                    <div className={`p-2 rounded-full bg-muted group-hover:bg-primary/10 group-hover:text-primary transition-colors`}>
                        {icon}
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{value}</div>
                    <p className="text-xs text-muted-foreground">{description}</p>
                </CardContent>
            </Card>
        </Link>
    );
}
