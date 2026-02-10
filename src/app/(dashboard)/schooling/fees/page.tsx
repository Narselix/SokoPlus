
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Receipt, Download, AlertCircle } from "lucide-react";

const mockFees = [
  { term: "1er Trimestre", amount: "150$", status: "Payé", date: "15 Sept 2024" },
  { term: "2ème Trimestre", amount: "150$", status: "Partiel", date: "10 Jan 2025", balance: "50$" },
  { term: "3ème Trimestre", amount: "150$", status: "En attente", date: "-" },
];

export default function SchoolFeesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Frais Scolaires</h1>
        <p className="text-muted-foreground">Suivez vos paiements et téléchargez vos reçus.</p>
      </div>

      <div className="grid gap-6">
        {mockFees.map((fee, i) => (
          <Card key={i} className={fee.status === "En attente" ? "border-destructive/50" : ""}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle>{fee.term}</CardTitle>
                <CardDescription>Montant : {fee.amount}</CardDescription>
              </div>
              <Badge variant={fee.status === "Payé" ? "default" : fee.status === "Partiel" ? "secondary" : "destructive"}>
                {fee.status}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="text-sm text-muted-foreground">
                  {fee.status !== "En attente" ? (
                    <div className="flex items-center gap-2">
                      <Receipt className="h-4 w-4" />
                      Dernier paiement le {fee.date}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-destructive">
                      <AlertCircle className="h-4 w-4" />
                      Paiement requis avant le 15 Avril
                    </div>
                  )}
                  {fee.balance && <p className="mt-1 font-bold text-foreground">Reste à payer : {fee.balance}</p>}
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <Button size="sm" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Reçu PDF
                  </Button>
                  {fee.status !== "Payé" && (
                    <Button size="sm">
                      Payer maintenant
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
