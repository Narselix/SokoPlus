
'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { courses as placeholderCourses } from "@/lib/placeholder-data";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { useFirestore, useUser } from "@/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { PlusCircle, Loader2 } from "lucide-react";

export default function EducationPage() {
  const { user, userProfile } = useUser();
  const firestore = useFirestore();
  const [dbCourses, setDbCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = ["Tous", "Mathématiques", "Science", "Français", "Histoire-Géo", "Informatique", "Tech", "Business", "Littérature"];
  const isStaff = userProfile?.role === "Teacher" || userProfile?.role === "Admin";

  useEffect(() => {
    if (!firestore) return;

    const q = query(collection(firestore, "courses"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDbCourses(fetched);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching courses:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [firestore]);

  // Combine placeholders with database courses
  const allCourses = [...dbCourses, ...placeholderCourses];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">Catalogue Éducation</h1>
          <p className="text-muted-foreground">Développez vos compétences avec les formations de nos établissements partenaires.</p>
        </div>
        {isStaff && (
          <Button asChild>
            <Link href="/schooling/admin/courses/publish">
                <PlusCircle className="mr-2 h-4 w-4" />
                Publier un cours
            </Link>
          </Button>
        )}
      </div>

      <Tabs defaultValue="Tous" className="space-y-4">
        <TabsList className="flex flex-wrap h-auto gap-2 bg-transparent p-0">
            {categories.map(category => (
                <TabsTrigger 
                    key={category} 
                    value={category}
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border rounded-full px-4"
                >
                    {category}
                </TabsTrigger>
            ))}
        </TabsList>

        {loading ? (
            <div className="flex justify-center p-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        ) : (
            <>
                <TabsContent value="Tous" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {allCourses.map((course) => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </TabsContent>
                {categories.slice(1).map(category => (
                    <TabsContent key={category} value={category} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {allCourses.filter(c => c.category === category || (category === "Science" && (c.category === "Biologie" || c.category === "Chimie"))).map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </TabsContent>
                ))}
            </>
        )}
      </Tabs>
    </div>
  );
}


function CourseCard({ course }: { course: any }) {
  const imageUrl = course.imageUrl || course.image?.imageUrl;

  return (
    <Card className="flex flex-col h-full overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <Link href={`/courses/${course.id}`} className="flex flex-col h-full">
        <CardHeader className="p-0">
          {imageUrl && (
            <div className="aspect-video relative w-full overflow-hidden bg-muted">
              <Image
                src={imageUrl}
                alt={course.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
        </CardHeader>
        <CardContent className="p-4 flex-grow flex flex-col">
          <Badge variant="secondary" className="w-fit mb-2">{course.category}</Badge>
          <CardTitle className="text-lg font-headline leading-tight mb-2 flex-grow">{course.title}</CardTitle>
          <div className="text-xs text-muted-foreground mb-4">
            <p>{course.duration} de formation</p>
            <p className="font-medium mt-1">Par {course.teacher}</p>
          </div>
          {course.progress > 0 && (
            <div className="space-y-1 mt-auto">
              <Progress value={course.progress} className="h-2" />
              <p className="text-xs text-muted-foreground">{course.progress}% complété</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button className="w-full">
            {course.progress > 0 ? "Continuer" : "Voir le cours"}
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
}
