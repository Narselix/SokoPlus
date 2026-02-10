
'use client';

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, BookOpen, Clock, Users, Loader2, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useFirestore, useUser } from "@/firebase";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import Image from "next/image";

export default function AdminCoursesPage() {
  const { user, userProfile } = useUser();
  const firestore = useFirestore();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!firestore || !user) return;

    const coursesRef = collection(firestore, "courses");
    const q = query(
        coursesRef, 
        where("teacherId", "==", user.uid),
        orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const coursesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCourses(coursesData);
      setLoading(false);
    }, (error) => {
        console.error("Error fetching courses:", error);
        setLoading(false);
    });

    return () => unsubscribe();
  }, [firestore, user]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">Gestion des Cours</h1>
          <p className="text-muted-foreground">Créez et gérez les formations proposées par votre établissement.</p>
        </div>
        <Button asChild>
          <Link href="/schooling/admin/courses/publish">
            <PlusCircle className="mr-2 h-4 w-4" />
            Créer un cours
          </Link>
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : courses.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Card key={course.id} className="overflow-hidden flex flex-col h-full">
              {course.imageUrl && (
                <div className="aspect-video relative w-full">
                  <Image src={course.imageUrl} alt={course.title} fill className="object-cover" />
                </div>
              )}
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary">{course.category}</Badge>
                  <Badge variant="outline">{course.level}</Badge>
                </div>
                <CardTitle className="font-headline text-xl leading-tight">{course.title}</CardTitle>
                <CardDescription className="line-clamp-2">{course.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" /> {course.duration || 'Durée non spécifiée'}
                </div>
                 <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" /> 0 Apprenants
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/50 p-4 flex gap-2">
                 <Button variant="outline" size="sm" className="flex-1">
                    <Pencil className="mr-2 h-4 w-4" /> Modifier
                 </Button>
                 <Button variant="outline" size="sm" className="flex-1 text-destructive hover:text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" /> Supprimer
                 </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border-2 border-dashed rounded-lg bg-muted/30">
          <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold">Aucun cours publié</h3>
          <p className="text-muted-foreground mb-6">Commencez par créer votre premier cours pour les élèves.</p>
          <Button asChild>
            <Link href="/schooling/admin/courses/publish">
              <PlusCircle className="mr-2 h-4 w-4" /> Créer mon premier cours
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
