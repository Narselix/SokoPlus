'use client';

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useFirestore, useUser } from "@/firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { Loader2, Download, FileSpreadsheet, TrendingUp, Calendar, Filter } from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  LineChart,
  Line
} from "recharts";

const dataRecettes = [
  { name: 'Jan', total: 4500 },
  { name: 'Fév', total: 5200 },
  { name: 'Mar', total: 6100 },
  { name: 'Avr', total: 4800 },
  { name: 'Mai', total: 3900 },
  { name: 'Juin', total: 7200 },
];

export default function SchoolReportsPage() {
  const { userProfile } = useUser();
  const firestore = useFirestore();
  const [loading, setLoading] = useState(true);
  const [schoolData, setSchoolData] = useState<any>(null);

  useEffect(() => {
    // Simuler un chargement pour l'interface
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <div className="flex h-96 items-center justify-center"><Loader2 className="animate-spin text-primary" /></div>;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">Rapports Financiers</h1>
          <p className="text-muted-foreground">Analyse des recettes et prévisions pour {userProfile?.schoolName || "votre établissement"}.</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" /> Filtres
            </Button>
            <Button>
                <Download className="mr-2 h-4 w-4" /> Exporter PDF
            </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
          <Card>
              <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Encaissé (Mois)</CardTitle>
              </CardHeader>
              <CardContent>
                  <div className="text-2xl font-bold">7,200 $</div>
                  <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                      <TrendingUp className="h-3 w-3" /> +12% par rapport au mois dernier
                  </p>
              </CardContent>
          </Card>
          <Card>
              <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Élèves en Règle</CardTitle>
              </CardHeader>
              <CardContent>
                  <div className="text-2xl font-bold">64%</div>
                  <p className="text-xs text-muted-foreground mt-1">Sur un total de 450 élèves</p>
              </CardContent>
          </Card>
          <Card>
              <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Reste à Recouvrer</CardTitle>
              </CardHeader>
              <CardContent>
                  <div className="text-2xl font-bold">12,450 $</div>
                  <p className="text-xs text-orange-600 mt-1 italic">Délai : Fin du 2ème trimestre</p>
              </CardContent>
          </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-1">
            <CardHeader>
                <CardTitle className="font-headline text-lg">Recettes Mensuelles</CardTitle>
                <CardDescription>Flux de trésorerie sur les 6 derniers mois.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dataRecettes}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `${value}$`} />
                        <Tooltip 
                            cursor={{fill: 'transparent'}}
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        />
                        <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]}>
                            {dataRecettes.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={index === 5 ? 'hsl(var(--accent))' : 'hsl(var(--primary))'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>

        <Card className="col-span-1">
            <CardHeader>
                <CardTitle className="font-headline text-lg">Répartition par Classe</CardTitle>
                <CardDescription>Paiements effectués par niveau d'étude.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="font-medium">Primaire</span>
                        <span>85%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: '85%' }} />
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="font-medium">Secondaire</span>
                        <span>42%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-accent" style={{ width: '42%' }} />
                    </div>
                </div>
                 <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground mb-4">Besoin d'un rapport détaillé par élève ?</p>
                    <Button variant="outline" className="w-full">
                        <FileSpreadsheet className="mr-2 h-4 w-4" /> Télécharger Excel Complet
                    </Button>
                 </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
