import Link from "next/link";
import { SokoPlusLogo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, GraduationCap, Handshake, HeartPulse, ShoppingCart, Smile, Users, Wand2 } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const modules = [
  {
    icon: <GraduationCap className="h-8 w-8 text-primary" />,
    title: "Éducation",
    description: "Formez-vous aux compétences de demain avec nos cours en ligne.",
    href: "/education",
  },
  {
    icon: <ShoppingCart className="h-8 w-8 text-primary" />,
    title: "Marché",
    description: "Achetez et vendez des produits localement en toute simplicité.",
    href: "/market",
  },
  {
    icon: <Briefcase className="h-8 w-8 text-primary" />,
    title: "Emploi & Freelance",
    description: "Trouvez des opportunités de carrière et des missions.",
    href: "/jobs",
  },
  {
    icon: <HeartPulse className="h-8 w-8 text-primary" />,
    title: "Pharmacie",
    description: "Accédez à un catalogue de médicaments de nos pharmacies partenaires.",
    href: "/pharmacy",
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "Solidarité & Dons",
    description: "Soutenez des campagnes et des projets communautaires.",
    href: "/solidarity",
  },
  {
    icon: <Smile className="h-8 w-8 text-primary" />,
    title: "Bien-être",
    description: "Ressources et soutien pour votre bien-être psychologique.",
    href: "/well-being",
  },
];

export default function LandingPage() {
  const heroImage = PlaceHolderImages.find(p => p.id === "landing-hero");

  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <SokoPlusLogo className="h-8 w-8 text-primary" />
          <span className="font-headline text-2xl font-bold">Soko+</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Se connecter</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Commencer</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-grow">
        <section className="relative py-20 md:py-32 bg-secondary/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-headline text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
              L'écosystème qui connecte le Kivu.
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
              Soko+ est la plateforme tout-en-un pour se former, commercer, trouver un emploi, accéder à la santé et s'engager pour la communauté.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/signup">Créer un compte</Link>
              </Button>
              <Button size="lg" variant="outline">
                Découvrir les modules
              </Button>
            </div>
          </div>
        </section>

        <section id="modules" className="py-20 md:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-headline text-3xl md:text-4xl font-bold">Une plateforme, toutes les opportunités</h2>
              <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                Chaque module est conçu pour répondre à un besoin essentiel de la vie quotidienne et économique.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {modules.map((module) => (
                <Card key={module.title} className="hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <CardHeader className="flex flex-row items-center gap-4">
                    {module.icon}
                    <CardTitle className="font-headline">{module.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{module.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
             <div className="mt-16 text-center">
                <Card className="max-w-3xl mx-auto bg-card border-2 border-primary/50 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <Wand2 className="h-8 w-8 text-primary" />
                    <CardTitle className="font-headline">Recommandations par IA</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Notre intelligence artificielle vous suggère des cours, produits et opportunités pertinents en fonction de votre profil pour une expérience personnalisée.</p>
                     <Button asChild className="mt-4">
                        <Link href="/recommendations">Tester l'IA</Link>
                    </Button>
                  </CardContent>
                </Card>
            </div>
          </div>
        </section>

      </main>

      <footer className="py-8 bg-card border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Soko+. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
