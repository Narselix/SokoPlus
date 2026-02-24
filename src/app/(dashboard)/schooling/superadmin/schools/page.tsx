
'use client';

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFirestore, useStorage } from "@/firebase";
import { collection, addDoc, onSnapshot, query, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useToast } from "@/hooks/use-toast";
import { Plus, Building2, Loader2, MapPin, Globe } from "lucide-react";
import Image from "next/image";

export default function SuperAdminSchoolsPage() {
  const [schools, setSchools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const firestore = useFirestore();
  const storage = useStorage();
  const { toast } = useToast();

  const [newSchool, setNewSchool] = useState({
    name: "",
    address: "",
    city: "",
    province: "",
    directorName: "",
    phone: "",
    email: "",
    currency: "USD"
  });

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [stampFile, setStampFile] = useState<File | null>(null);

  useEffect(() => {
    if (!firestore) return;
    const q = query(collection(firestore, "schools"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setSchools(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, [firestore]);

  const handleCreateSchool = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firestore || !storage) return;

    setSubmitting(true);
    try {
      let logoUrl = "";
      let stampUrl = "";

      if (logoFile) {
        const logoRef = ref(storage, `schools/logos/${Date.now()}_${logoFile.name}`);
        await uploadBytes(logoRef, logoFile);
        logoUrl = await getDownloadURL(logoRef);
      }

      if (stampFile) {
        const stampRef = ref(storage, `schools/stamps/${Date.now()}_${stampFile.name}`);
        await uploadBytes(stampRef, stampFile);
        stampUrl = await getDownloadURL(stampRef);
      }

      await addDoc(collection(firestore, "schools"), {
        ...newSchool,
        logoUrl,
        stampUrl,
        createdAt: serverTimestamp(),
      });

      toast({ title: "École enregistrée", description: `${newSchool.name} a été créée avec succès.` });
      setNewSchool({ name: "", address: "", city: "", province: "", directorName: "", phone: "", email: "", currency: "USD" });
      setLogoFile(null);
      setStampFile(null);
    } catch (error) {
      console.error(error);
      toast({ variant: "destructive", title: "Erreur", description: "Impossible d'enregistrer l'école." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Gestion des Établissements</h1>
        <p className="text-muted-foreground">Enregistrez et gérez les écoles partenaires de l'écosystème Soko+.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Nouvelle École</CardTitle>
            <CardDescription>Remplissez les informations officielles de l'établissement.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateSchool} className="space-y-4">
              <div className="space-y-2">
                <Label>Nom de l'école</Label>
                <Input required value={newSchool.name} onChange={e => setNewSchool({...newSchool, name: e.target.value})} placeholder="Collège Mwanga" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label>Ville</Label>
                  <Input required value={newSchool.city} onChange={e => setNewSchool({...newSchool, city: e.target.value})} placeholder="Goma" />
                </div>
                <div className="space-y-2">
                  <Label>Province</Label>
                  <Input required value={newSchool.province} onChange={e => setNewSchool({...newSchool, province: e.target.value})} placeholder="Nord-Kivu" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Nom du Directeur</Label>
                <Input value={newSchool.directorName} onChange={e => setNewSchool({...newSchool, directorName: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Devise principale</Label>
                <Select value={newSchool.currency} onValueChange={v => setNewSchool({...newSchool, currency: v})}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="CDF">CDF (FC)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Logo</Label>
                <Input type="file" accept="image/*" onChange={e => setLogoFile(e.target.files?.[0] || null)} />
              </div>
              <div className="space-y-2">
                <Label>Cachet Officiel (PNG Transparent)</Label>
                <Input type="file" accept="image/*" onChange={e => setStampFile(e.target.files?.[0] || null)} />
              </div>
              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
                Créer l'école
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold font-headline">Écoles Partenaires ({schools.length})</h2>
          {loading ? (
             <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>
          ) : (
            <div className="grid gap-4">
              {schools.map(school => (
                <Card key={school.id}>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded bg-muted relative overflow-hidden">
                        {school.logoUrl && <Image src={school.logoUrl} alt={school.name} fill className="object-cover" />}
                      </div>
                      <div>
                        <h3 className="font-bold">{school.name}</h3>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" /> {school.city}, {school.province}
                          <span className="bg-primary/10 text-primary px-2 py-0.5 rounded">{school.currency}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Gérer</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
