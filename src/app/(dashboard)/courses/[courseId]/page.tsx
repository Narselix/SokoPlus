'use client';

import { courses } from "@/lib/placeholder-data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, RadioButton } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function CourseDetailPage({ params }: { params: { courseId: string } }) {
  const course = courses.find(c => c.id.toString() === params.courseId);

  if (!course) {
    notFound();
  }
  
  const totalLessons = course.modules.reduce((acc, mod) => acc + mod.lessons.length, 0);
  const completedLessons = course.modules.reduce((acc, mod) => acc + mod.lessons.filter(l => l.completed).length, 0);
  const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : course.progress;

  return (
    <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
            <div>
                <div className="aspect-video relative w-full rounded-lg overflow-hidden mb-4">
                    {course.image && <Image src={course.image.imageUrl} alt={course.title} fill className="object-cover" data-ai-hint={course.image.imageHint} />}
                </div>
                <Badge variant="secondary" className="mb-2">{course.category}</Badge>
                <h1 className="text-3xl lg:text-4xl font-bold tracking-tight font-headline">{course.title}</h1>
                <p className="text-lg text-muted-foreground mt-2">{course.description}</p>
                <p className="text-sm text-muted-foreground mt-2">Créé par {course.teacher}</p>
            </div>

            <div>
                <h2 className="text-2xl font-bold font-headline mb-4">Contenu du cours</h2>
                 <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
                    {course.modules.map((module, index) => (
                        <AccordionItem value={`item-${index}`} key={module.id}>
                            <AccordionTrigger className="font-bold text-lg">{module.title}</AccordionTrigger>
                            <AccordionContent>
                                <ul className="space-y-2">
                                    {module.lessons.map(lesson => (
                                        <li key={lesson.id} className="flex items-center justify-between p-3 rounded-md hover:bg-muted/50 transition-colors">
                                            <div className="flex items-center gap-3">
                                                {lesson.completed ? (
                                                    <CheckCircle className="h-5 w-5 text-primary"/>
                                                ) : (
                                                    <RadioButton className="h-5 w-5 text-muted-foreground"/>
                                                )}
                                                <span className="flex-1">{lesson.title}</span>
                                            </div>
                                            <div className="text-sm text-muted-foreground flex items-center gap-2">
                                                <Clock className="h-4 w-4"/>
                                                {lesson.duration}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                 </Accordion>
                 {course.modules.length === 0 && <p className="text-muted-foreground">Le contenu de ce cours sera bientôt disponible.</p>}
            </div>
        </div>

        <div className="space-y-6">
            <Card className="overflow-hidden">
                <CardHeader>
                    <CardTitle>Progression</CardTitle>
                </CardHeader>
                <CardContent>
                    <Progress value={progress} className="h-3 mb-2" />
                    <p className="text-center text-muted-foreground text-sm">{progress}% complété</p>
                </CardContent>
                 <CardContent>
                    <Button className="w-full">
                      {progress > 0 ? "Continuer le cours" : "Commencer le cours"}
                    </Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Détails du cours</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                    <div className="flex items-center gap-2">
                        <Badge variant="outline">{course.level}</Badge>
                        <Badge variant="outline">{course.duration}</Badge>
                    </div>
                     <p><span className="font-semibold">Formateur:</span> {course.teacher}</p>
                     <p><span className="font-semibold">Catégorie:</span> {course.category}</p>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
