
'use client';

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFirestore, useUser } from "@/firebase";
import { collection, addDoc, onSnapshot, query, where, serverTimestamp, doc, getDoc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { Receipt, Search, CreditCard, Wallet, Printer, CheckCircle2, Loader2 } from "lucide-react";

export default function SchoolAccountingPage() {
  const { userProfile, user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  
  const [students, setStudents] = useState<any[]>([]);
  const [fees, setFees] = useState<any[]>([]);
  const [schoolData, setSchoolData] = useState<any>(null);
  const [selectedStudent, setSelectedStudent] = useState<string>("");
  const [selectedFee, setSelectedFee] = useState<string>("");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("Cash");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [lastPayment, setLastPayment] = useState<any>(null);

  useEffect(() => {
    if (!firestore || !userProfile?.schoolId) return;

    // Fetch school info
    getDoc(doc(firestore, "schools", userProfile.schoolId)).then(snap => {
      if (snap.exists()) setSchoolData(snap.data());
    });

    // Fetch students
    const qStudents = query(collection(firestore, "students"), where("schoolId", "==", userProfile.schoolId));
    const unsubStudents = onSnapshot(qStudents, (snap) => {
      setStudents(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    // Fetch fees config
    const qFees = query(collection(firestore, "feeConfigs"), where("schoolId", "==", userProfile.schoolId));
    const unsubFees = onSnapshot(qFees, (snap) => {
      setFees(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });

    return () => { unsubStudents(); unsubFees(); };
  }, [firestore, userProfile]);

  const handlePayment = async () => {
    if (!firestore || !user || !userProfile?.schoolId || !selectedStudent || !amount) return;

    setSubmitting(true);
    try {
      const year = new Date().getFullYear();
      const receiptNum = `REC-SOKO-${year}-${Math.floor(Math.random() * 900000 + 100000)}`;
      
      const paymentData = {
        schoolId: userProfile.schoolId,
        studentId: selectedStudent,
        feeId: selectedFee,
        amount: parseFloat(amount),
        method,
        receiptNumber: receiptNum,
        comptableId: user.uid,
        date: serverTimestamp(),
      };

      const docRef = await addDoc(collection(firestore, "payments"), paymentData);
      
      setLastPayment({ id: docRef.id, ...paymentData });
      toast({ title: "Paiement enregistré", description: `Reçu ${receiptNum} généré.` });
      setAmount("");
    } catch (error) {
      toast({ variant: "destructive", title: "Erreur", description: "Impossible d'enregistrer le paiement." });
    } finally {
      setSubmitting(false);
    }
  };

  const printReceipt = () => {
    window.print();
  };

  if (loading) return <div className="flex h-96 items-center justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 no-print">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">Comptabilité & Caisse</h1>
          <p className="text-muted-foreground">Enregistrez les paiements des élèves pour {schoolData?.name}.</p>
        </div>
        {lastPayment && (
          <Button onClick={printReceipt} variant="outline">
            <Printer className="mr-2 h-4 w-4" /> Imprimer dernier reçu
          </Button>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-8 no-print">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Wallet className="h-5 w-5 text-primary" /> Nouveau Paiement</CardTitle>
            <CardDescription>Saisie manuelle des frais scolaires.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Sélectionner l'Élève</Label>
              <Select onValueChange={setSelectedStudent}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir un élève" />
                </SelectTrigger>
                <SelectContent>
                  {students.map(s => <SelectItem key={s.id} value={s.id}>{s.matricule} - {s.name} {s.firstName}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Type de Frais</Label>
              <Select onValueChange={setSelectedFee}>
                <SelectTrigger>
                  <SelectValue placeholder="Type de frais" />
                </SelectTrigger>
                <SelectContent>
                  {fees.map(f => <SelectItem key={f.id} value={f.id}>{f.name} ({f.amount}{schoolData?.currency})</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Montant Payé</Label>
                <Input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <Label>Méthode</Label>
                <Select value={method} onValueChange={setMethod}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cash">Cash</SelectItem>
                    <SelectItem value="Mobile Money">Mobile Money</SelectItem>
                    <SelectItem value="Bank">Virement Bancaire</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button className="w-full" onClick={handlePayment} disabled={submitting || !amount || !selectedStudent}>
              {submitting ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : <CheckCircle2 className="h-4 w-4 mr-2" />}
              Enregistrer & Générer Reçu
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><CreditCard className="h-5 w-5 text-accent" /> Configuration des Frais</CardTitle>
            <CardDescription>Définissez les montants officiels de l'établissement.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="space-y-2">
                <Label>Nom du frais</Label>
                <Input placeholder="Ex: Minerval 1er Trimestre" />
             </div>
             <div className="space-y-2">
                <Label>Montant Fixé ({schoolData?.currency})</Label>
                <Input type="number" placeholder="100" />
             </div>
             <Button variant="outline" className="w-full">Ajouter type de frais</Button>
          </CardContent>
        </Card>
      </div>

      {/* RENDERED RECEIPT FOR PRINTING */}
      {lastPayment && (
        <div className="print-only p-8 border-2 border-dashed border-gray-300 rounded-lg max-w-2xl mx-auto bg-white text-black">
          <div className="flex justify-between items-start border-b pb-4 mb-4">
             <div className="flex items-center gap-3">
                {schoolData?.logoUrl && <img src={schoolData.logoUrl} className="h-16 w-16 object-contain" alt="Logo" />}
                <div>
                  <h2 className="text-xl font-bold uppercase">{schoolData?.name}</h2>
                  <p className="text-xs">{schoolData?.address}, {schoolData?.city}</p>
                  <p className="text-xs">{schoolData?.phone}</p>
                </div>
             </div>
             <div className="text-right">
                <h3 className="text-lg font-bold">REÇU DE PAIEMENT</h3>
                <p className="text-sm font-mono text-primary">{lastPayment.receiptNumber}</p>
                <p className="text-xs italic">Date: {new Date().toLocaleDateString()}</p>
             </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex justify-between border-b py-1">
              <span className="font-semibold">Élève:</span>
              <span>{students.find(s => s.id === lastPayment.studentId)?.name} {students.find(s => s.id === lastPayment.studentId)?.firstName}</span>
            </div>
             <div className="flex justify-between border-b py-1">
              <span className="font-semibold">Matricule:</span>
              <span className="font-mono">{students.find(s => s.id === lastPayment.studentId)?.matricule}</span>
            </div>
            <div className="flex justify-between border-b py-1">
              <span className="font-semibold">Libellé:</span>
              <span>{fees.find(f => f.id === lastPayment.feeId)?.name || "Frais Scolaires"}</span>
            </div>
             <div className="flex justify-between border-b py-1">
              <span className="font-semibold">Montant payé:</span>
              <span className="font-bold text-lg">{lastPayment.amount} {schoolData?.currency}</span>
            </div>
             <div className="flex justify-between border-b py-1">
              <span className="font-semibold">Méthode:</span>
              <span>{lastPayment.method}</span>
            </div>
          </div>

          <div className="flex justify-between items-end mt-12">
            <div className="text-center">
              <p className="text-xs mb-8">Signature de l'élève/parent</p>
              <div className="w-32 border-b border-black mx-auto"></div>
            </div>
            <div className="relative text-center">
              <p className="text-xs mb-8">Cachet et Signature de la caisse</p>
              {schoolData?.stampUrl && (
                <img src={schoolData.stampUrl} className="absolute inset-0 h-24 w-24 opacity-70 -translate-y-4 mx-auto object-contain" alt="Cachet" />
              )}
              <div className="w-32 border-b border-black mx-auto"></div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t text-[10px] text-center text-gray-500 italic">
            Document généré par l'infrastructure Soko+ - L'écosystème numérique du Kivu.
          </div>
        </div>
      )}

      <style jsx global>{`
        @media print {
          body * { visibility: hidden; }
          .print-only, .print-only * { visibility: visible; }
          .print-only { position: absolute; left: 0; top: 0; width: 100%; }
          .no-print { display: none !important; }
        }
        .print-only { display: none; }
        @media print { .print-only { display: block; } }
      `}</style>
    </div>
  );
}
