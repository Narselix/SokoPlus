import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { adminProcedures, publicAlerts } from "@/lib/placeholder-data";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { FileText, Megaphone, ShieldAlert, HeartPulse, TrafficCone } from "lucide-react";

const getIcon = (category: string) => {
    switch (category) {
        case "Santé":
            return <HeartPulse className="h-5 w-5 text-accent" />;
        case "Sécurité":
            return <ShieldAlert className="h-5 w-5 text-destructive" />;
        case "Circulation":
            return <TrafficCone className="h-5 w-5 text-primary" />;
        default:
            return <Megaphone className="h-5 w-5 text-foreground" />;
    }
}

export default function GovernancePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Administration & Gouvernance</h1>
        <p className="text-muted-foreground">Rapprocher les citoyens de l’information et des services publics.</p>
      </div>

       <Alert variant="default">
          <Megaphone className="h-4 w-4" />
          <AlertTitle>Plateforme d'Information</AlertTitle>
          <AlertDescription>
            Cette section fournit des informations à titre indicatif. Vérifiez toujours auprès des services compétents pour les démarches officielles.
          </AlertDescription>
        </Alert>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold tracking-tight font-headline">Démarches Administratives</h2>
             <Accordion type="single" collapsible className="w-full">
                {adminProcedures.map((procedure) => (
                    <AccordionItem value={`item-${procedure.id}`} key={procedure.id}>
                        <AccordionTrigger className="font-bold text-lg">
                            <div className="flex items-center gap-3">
                                <FileText className="h-5 w-5 text-primary"/>
                                {procedure.title}
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="pl-11 space-y-4">
                            <p className="text-muted-foreground">{procedure.description}</p>
                            <div>
                                <h4 className="font-semibold mb-2">Documents Requis</h4>
                                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                                    {procedure.requiredDocuments.map(doc => <li key={doc}>{doc}</li>)}
                                </ul>
                            </div>
                            <div className="flex gap-8">
                                <div>
                                    <h4 className="font-semibold">Coût Estimé</h4>
                                    <p className="text-muted-foreground">{procedure.estimatedCost}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Délai Estimé</h4>
                                    <p className="text-muted-foreground">{procedure.estimatedTime}</p>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
             </Accordion>
        </div>
        <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight font-headline">Alertes Publiques</h2>
            {publicAlerts.map(alert => (
                 <Card key={alert.id}>
                    <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                        {getIcon(alert.category)}
                        <div>
                            <CardTitle className="text-base font-headline">{alert.title}</CardTitle>
                            <CardDescription>{format(new Date(alert.publishedDate), "d MMMM yyyy", { locale: fr })}</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">{alert.content}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
