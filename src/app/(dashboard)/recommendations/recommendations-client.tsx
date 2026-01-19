"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getRecommendations, RecommendationsInput, RecommendationsOutput } from "@/ai/flows/ai-powered-recommendations";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { aiPicks } from "@/lib/placeholder-data";
import { Loader2, Wand2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  userProfile: z.string().min(10, "Veuillez décrire le profil utilisateur."),
  availableCourses: z.string().min(1, "Veuillez lister les cours."),
  availableProducts: z.string().min(1, "Veuillez lister les produits."),
  availableJobListings: z.string().min(1, "Veuillez lister les offres d'emploi."),
  availableSolidarityCampaigns: z.string().min(1, "Veuillez lister les campagnes."),
});

export function RecommendationsClient() {
  const [recommendations, setRecommendations] = useState<RecommendationsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userProfile: aiPicks.userProfile,
      availableCourses: aiPicks.availableCourses,
      availableProducts: aiPicks.availableProducts,
      availableJobListings: aiPicks.availableJobListings,
      availableSolidarityCampaigns: aiPicks.availableSolidarityCampaigns,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setRecommendations(null);
    try {
      const result = await getRecommendations(values);
      setRecommendations(result);
    } catch (error) {
      console.error("Failed to get recommendations:", error);
      // You can use the Toaster component here to show an error
    } finally {
      setIsLoading(false);
    }
  }

  const renderRecommendations = (title: string, items: string) => {
    if (!items || items.trim() === '') return null;
    const itemList = items.split(',').map(item => item.trim());
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-headline">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            {itemList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Générateur de Recommandations</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="userProfile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profil Utilisateur</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Décrivez le profil..." {...field} rows={4} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="availableCourses"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cours Disponibles (séparés par une virgule)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Cours 1, Cours 2, ..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="availableProducts"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Produits Disponibles (séparés par une virgule)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Produit 1, Produit 2, ..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="availableJobListings"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Emplois Disponibles (séparés par une virgule)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Emploi 1, Emploi 2, ..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
                <FormField
                control={form.control}
                name="availableSolidarityCampaigns"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Campagnes Disponibles (séparées par une virgule)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Campagne 1, Campagne 2, ..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                Générer les recommandations
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        <h2 className="text-2xl font-bold font-headline">Résultats</h2>
        {isLoading && (
            <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )}
        {recommendations ? (
            <div className="space-y-4">
                {renderRecommendations("Cours Recommandés", recommendations.recommendedCourses)}
                {renderRecommendations("Produits Recommandés", recommendations.recommendedProducts)}
                {renderRecommendations("Emplois Recommandés", recommendations.recommendedJobListings)}
                {renderRecommendations("Campagnes Recommandées", recommendations.recommendedSolidarityCampaigns)}
            </div>
        ) : (
            !isLoading && <p className="text-muted-foreground">Les recommandations de l'IA apparaîtront ici.</p>
        )}
      </div>
    </div>
  );
}
