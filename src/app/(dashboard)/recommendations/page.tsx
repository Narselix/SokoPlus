import { RecommendationsClient } from "./recommendations-client";

export default function RecommendationsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Recommandations par IA</h1>
        <p className="text-muted-foreground">
          Obtenez des suggestions personnalisées de cours, produits, emplois et campagnes solidaires.
        </p>
      </div>
      <RecommendationsClient />
    </div>
  );
}
