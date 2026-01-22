import Link from "next/link";
import { SokoPlusLogo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Award } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const features = [
  {
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    title: "Apprentissage Flexible",
    description: "Accédez à des centaines de cours et apprenez à votre propre rythme.",
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "Formateurs Experts",
    description: "Bénéficiez de l'expertise d'enseignants et de professionnels qualifiés.",
  },
  {
    icon: <Award className="h-8 w-8 text-primary" />,
    title: "Certifications",
    description: "Validez vos compétences avec des certificats à la fin de vos formations.",
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
              Soko+ est une plateforme qui intègre l'éducation, le commerce, l'emploi et la solidarité pour dynamiser la communauté.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/signup">S'inscrire gratuitement</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/courses">Explorer les cours</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 md:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-headline text-3xl md:text-4xl font-bold">Une plateforme pour réussir</h2>
              <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                Tout ce dont vous avez besoin pour apprendre, entreprendre et vous développer.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature) => (
                <Card key={feature.title} className="hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <CardHeader className="flex flex-row items-center gap-4">
                    {feature.icon}
                    <CardTitle className="font-headline">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
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
