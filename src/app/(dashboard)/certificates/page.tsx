import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { certificates } from "@/lib/placeholder-data";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";

export default function CertificatesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Mes Certificats</h1>
        <p className="text-muted-foreground">
          Félicitations ! Voici les certificats que vous avez obtenus.
        </p>
      </div>

       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {certificates.map((cert) => (
          <Card key={cert.id} className="overflow-hidden">
            {cert.image && (
                <div className="aspect-video relative w-full bg-secondary">
                    <Image
                    src={cert.image.imageUrl}
                    alt={cert.courseTitle}
                    fill
                    className="object-cover"
                    data-ai-hint={cert.image.imageHint}
                    />
                </div>
            )}
            <CardHeader>
              <CardTitle className="font-headline">{cert.courseTitle}</CardTitle>
              <CardDescription>Obtenu le {cert.date}</CardDescription>
            </CardHeader>
            <CardFooter className="gap-2">
                <Button className="w-full">
                    <Download className="mr-2 h-4 w-4"/>
                    Télécharger
                </Button>
                 <Button variant="outline" className="w-full">
                    <Share2 className="mr-2 h-4 w-4"/>
                    Partager
                </Button>
            </CardFooter>
          </Card>
        ))}

        {certificates.length === 0 && (
            <p className="text-muted-foreground md:col-span-3 text-center">
                Vous n'avez pas encore obtenu de certificat. Continuez à apprendre !
            </p>
        )}
      </div>
    </div>
  );
}
