import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, GraduationCap, Handshake, HeartPulse, ShoppingCart, Smile, Users, Wand2 } from "lucide-react";
import Link from "next/link";

const modules = [
  {
    icon: GraduationCap,
    title: "Éducation",
    description: "Formez-vous aux compétences de demain.",
    href: "/education",
  },
  {
    icon: ShoppingCart,
    title: "Marché",
    description: "Achetez et vendez des produits localement.",
    href: "/market",
  },
  {
    icon: Briefcase,
    title: "Emploi & Freelance",
    description: "Trouvez votre prochaine opportunité.",
    href: "/jobs",
  },
  {
    icon: HeartPulse,
    title: "Pharmacie",
    description: "Accédez aux médicaments facilement.",
    href: "/pharmacy",
  },
  {
    icon: Users,
    title: "Solidarité",
    description: "Soutenez des causes qui comptent.",
    href: "/solidarity",
  },
  {
    icon: Smile,
    title: "Bien-être",
    description: "Prenez soin de votre santé mentale.",
    href: "/well-being",
  },
];


export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Tableau de bord</h1>
        <p className="text-muted-foreground">Bienvenue sur Soko+, votre écosystème digital.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {modules.map((module) => (
          <Link href={module.href} key={module.title}>
            <Card className="h-full hover:bg-card/80 hover:shadow-md transition-all">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium font-headline">{module.title}</CardTitle>
                <module.icon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">{module.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

       <div className="pt-4">
          <Link href="/recommendations">
            <Card className="bg-gradient-to-r from-primary/80 to-accent/80 text-primary-foreground hover:from-primary hover:to-accent transition-all">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium font-headline">Recommandations Personnalisées</CardTitle>
                 <Wand2 className="h-6 w-6" />
              </CardHeader>
              <CardContent>
                <p className="text-sm">Laissez notre IA vous guider vers les meilleures opportunités pour vous.</p>
              </CardContent>
            </Card>
          </Link>
        </div>
    </div>
  );
}
