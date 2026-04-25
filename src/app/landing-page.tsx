import Link from "next/link";
import { SokoPlusLogo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Award, ShieldCheck, ShoppingBag, Landmark } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const features = [
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: "Gestion Scolaire (ERP)",
    description: "Un système complet pour les écoles : inscriptions, comptabilité, notes et reçus officiels avec cachet.",
  },
  {
    icon: <ShoppingBag className="h-8 w-8 text-primary" />,
    title: "Économie Locale",
    description: "Un marché intégré pour vendre vos produits, trouver un emploi ou un logement vérifié dans le Kivu.",
  },
  {
    icon: <Landmark className="h-8 w-8 text-primary" />,
    title: "Gouvernance & Santé",
    description: "Accès aux démarches administratives, annuaire de santé et espace de bien-être communautaire.",
  },
];

export function LandingPageContent() {
  const heroImage = PlaceHolderImages.find(p => p.id === "landing-hero");

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
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
        </div>
      </header>

      <main className="flex-grow">
        <section className="relative overflow-hidden bg-secondary/30 py-20 md:py-32">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover object-center opacity-10"
              data-ai-hint={heroImage.imageHint}
              priority
            />
          )}
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge className="mb-4 py-1 px-3 text-sm" variant="outline">L'écosystème numérique du Kivu</Badge>
            <h1 className="font-headline text-4xl md:text-7xl font-extrabold tracking-tight text-foreground leading-tight">
              Connecter, Apprendre <br className="hidden md:block" /> et Entreprendre.
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
              Soko+ est la plateforme intégrée qui dynamise la communauté en regroupant l'éducation, le commerce, l'emploi et la solidarité.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="h-14 px-8 text-lg" asChild>
                <Link href="/signup">Rejoindre Soko+</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg" asChild>
                <Link href="/market">Explorer le Marché</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 md:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-headline text-3xl md:text-5xl font-bold">Une solution 360°</h2>
              <p className="mt-4 max-w-2xl mx-auto text-muted-foreground text-lg">
                Soko+ répond aux défis réels de notre région avec des outils numériques adaptés.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature) => (
                <Card key={feature.title} className="border-none shadow-xl bg-card hover:-translate-y-2 transition-all duration-300">
                  <CardHeader className="pt-8">
                    <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                        {feature.icon}
                    </div>
                    <CardTitle className="font-headline text-2xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-8">
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-primary text-primary-foreground py-20">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 font-headline">Prêt à numériser votre école ou votre commerce ?</h2>
                <p className="text-primary-foreground/80 mb-10 max-w-xl mx-auto">Soko+ accompagne les établissements et les entrepreneurs dans leur transformation numérique.</p>
                <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100" asChild>
                    <Link href="/signup">Créer un compte maintenant</Link>
                </Button>
            </div>
        </section>

      </main>

      <footer className="py-12 bg-card border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                <div className="col-span-1 md:col-span-2">
                    <div className="flex items-center gap-2 mb-4">
                        <SokoPlusLogo className="h-6 w-6 text-primary" />
                        <span className="font-headline text-xl font-bold">Soko+</span>
                    </div>
                    <p className="text-muted-foreground text-sm max-w-sm">La plateforme de référence pour le développement communautaire et éducatif dans la région du Kivu.</p>
                </div>
                <div>
                    <h4 className="font-bold mb-4">Services</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li><Link href="/schooling/admin/accounting">Gestion Scolaire</Link></li>
                        <li><Link href="/market">Marché Local</Link></li>
                        <li><Link href="/jobs">Emploi & Freelance</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-4">Légal</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li><Link href="#">Conditions d'utilisation</Link></li>
                        <li><Link href="#">Confidentialité</Link></li>
                        <li><Link href="#">Contact</Link></li>
                    </ul>
                </div>
            </div>
            <div className="pt-8 border-t text-center text-muted-foreground text-sm">
                <p>&copy; {new Date().getFullYear()} Soko+. L'infrastructure numérique du Kivu.</p>
            </div>
        </div>
      </footer>
    </div>
  );
}

function Badge({ children, className, variant }: any) {
    return (
        <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${variant === 'outline' ? 'border border-primary/30 text-primary' : 'bg-primary text-white'} ${className}`}>
            {children}
        </span>
    )
}
