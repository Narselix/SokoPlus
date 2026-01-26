'use client';

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { BookCopy, CheckCircle, Percent, Clock } from "lucide-react";
import Link from "next/link";
import { useUser } from "@/firebase";
import { courses } from "@/lib/placeholder-data";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
    const { userProfile } = useUser();
    const activeCourses = courses.filter(c => c.progress > 0 && c.progress < 100);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Tableau de bord</h1>
        <p className="text-muted-foreground">Bienvenue, {userProfile?.name} ! Prêt à apprendre ?</p>
      </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Cours Inscrits</CardTitle>
                    <BookCopy className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{courses.length}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Cours Terminés</CardTitle>
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{courses.filter(c => c.progress === 100).length}</div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Progression Moyenne</CardTitle>
                    <Percent className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {courses.length > 0 ? Math.round(courses.reduce((acc, c) => acc + c.progress, 0) / courses.length) : 0}%
                    </div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Heures Apprises</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">12h</div>
                </CardContent>
            </Card>
        </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight font-headline">Continuer à apprendre</h2>
        {activeCourses.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activeCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
            ))}
            </div>
        ) : (
            <div className="text-center py-12 border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground mb-4">Vous n'avez aucun cours en progression.</p>
                <Button asChild>
                    <Link href="/courses">Explorer les cours</Link>
                </Button>
            </div>
        )}
      </div>
    </div>
  );
}

function CourseCard({ course }: { course: (typeof courses)[0] }) {
  return (
    <Card className="flex flex-col h-full overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <Link href={`/courses/${course.id}`} className="flex flex-col h-full">
            <CardHeader className="p-0">
                {course.image && (
                <div className="aspect-video relative w-full">
                    <Image
                    src={course.image.imageUrl}
                    alt={course.title}
                    fill
                    className="object-cover"
                    data-ai-hint={course.image.imageHint}
                    />
                </div>
                )}
            </CardHeader>
            <CardContent className="p-4 flex-grow flex flex-col">
                <Badge variant="secondary" className="w-fit mb-2">{course.category}</Badge>
                <CardTitle className="text-lg font-headline leading-tight mb-2 flex-grow">{course.title}</CardTitle>
                <div className="text-xs text-muted-foreground mb-4">{course.duration} de formation</div>
                {course.progress > 0 && (
                <div className="space-y-1">
                    <Progress value={course.progress} className="h-2" />
                    <p className="text-xs text-muted-foreground">{course.progress}% complété</p>
                </div>
                )}
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <Button className="w-full">
                {course.progress > 0 ? "Continuer le cours" : "Commencer le cours"}
                </Button>
            </CardFooter>
        </Link>
    </Card>
  );
}
