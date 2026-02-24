
'use client';

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFirestore, useUser } from "@/firebase";
import { collection, addDoc, onSnapshot, query, where, serverTimestamp } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, Search, GraduationCap, Loader2, User } from "lucide-react";

export default function StudentManagementPage() {
  const { userProfile } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    firstName: "",
    gender: "M",
    birthDate: "",
    classId: "",
    parentName: "",
    parentPhone: "",
    address: ""
  });

  useEffect(() => {
    if (!firestore || !userProfile?.schoolId) return;

    const q = query(
      collection(firestore, "students"),
      where("schoolId", "==", userProfile.schoolId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setStudents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });

    return () => unsubscribe();
  }, [firestore, userProfile]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firestore || !userProfile?.schoolId) return;

    setSubmitting(true);
    try {
      const year = new Date().getFullYear();
      const random = Math.floor(Math.random() * 9000 + 1000);
      const matricule = `SOKO-SC-${year}-${random}`;

      await addDoc(collection(firestore, "students"), {
        ...formData,
        schoolId: userProfile.schoolId,
        matricule,
        createdAt: serverTimestamp(),
      });

      toast({ title: "Élève inscrit", description: `Matricule généré: ${matricule}` });
      setFormData({ name: "", firstName: "", gender: "M", birthDate: "", classId: "", parentName: "", parentPhone: "", address: "" });
    } catch (error) {
      toast({ variant: "destructive", title: "Erreur", description: "Échec de l'inscription." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Gestion des Élèves</h1>
        <p className="text-muted-foreground">Inscrivez et suivez les dossiers des élèves de votre établissement.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1 h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><UserPlus className="h-5 w-5" /> Nouvel Élève</CardTitle>
            <CardDescription>Inscription et génération de matricule.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label>Nom</Label>
                  <Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Prénom</Label>
                  <Input required value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label>Sexe</Label>
                  <Select value={formData.gender} onValueChange={v => setFormData({...formData, gender: v})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="M">Masculin</SelectItem>
                      <SelectItem value="F">Féminin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Classe</Label>
                  <Input required placeholder="Ex: 6ème A" value={formData.classId} onChange={e => setFormData({...formData, classId: e.target.value})} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Nom du Parent / Tuteur</Label>
                <Input required value={formData.parentName} onChange={e => setFormData({...formData, parentName: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Téléphone Parent</Label>
                <Input required value={formData.parentPhone} onChange={e => setFormData({...formData, parentPhone: e.target.value})} />
              </div>
              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : <GraduationCap className="h-4 w-4 mr-2" />}
                Inscrire l'élève
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-4 mb-2">
             <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Rechercher par nom ou matricule..." className="pl-10" />
             </div>
             <Button variant="outline">Filtrer par classe</Button>
          </div>
          
          {loading ? (
             <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>
          ) : (
            <div className="grid gap-4">
               {students.length === 0 && <p className="text-center text-muted-foreground py-12">Aucun élève inscrit pour le moment.</p>}
               {students.map(student => (
                  <Card key={student.id}>
                    <CardContent className="p-4 flex items-center justify-between">
                       <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                             <User className="h-5 w-5" />
                          </div>
                          <div>
                             <h3 className="font-bold">{student.name} {student.firstName}</h3>
                             <p className="text-xs text-muted-foreground font-mono">{student.matricule} • {student.classId}</p>
                          </div>
                       </div>
                       <Button variant="ghost" size="sm">Détails</Button>
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
