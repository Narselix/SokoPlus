import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { solidarityCampaigns } from "@/lib/placeholder-data";

export default function SolidarityPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline">Solidarité & Dons</h1>
            <p className="text-muted-foreground">Soutenez les campagnes qui font la différence dans notre communauté.</p>
        </div>
        <Button>Lancer une campagne</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {solidarityCampaigns.map((campaign) => (
          <Card key={campaign.id} className="flex flex-col h-full overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {campaign.image && (
              <div className="aspect-video relative w-full">
                <Image
                  src={campaign.image.imageUrl}
                  alt={campaign.title}
                  fill
                  className="object-cover"
                  data-ai-hint={campaign.image.imageHint}
                />
              </div>
            )}
            <CardHeader className="p-4">
                <CardTitle className="text-lg font-headline leading-tight">{campaign.title}</CardTitle>
                <CardDescription>Par : {campaign.organizer}</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0 flex-grow">
                <div className="space-y-2">
                    <Progress value={campaign.progress} className="h-2" />
                    <div className="flex justify-between text-sm">
                        <span className="font-bold text-primary">{campaign.raised}</span>
                        <span className="text-muted-foreground">Objectif : {campaign.goal}</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <Button className="w-full">Faire un don</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
