import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { courses } from "@/lib/placeholder-data";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CoursesPage() {
  const categories = ["Tous", "Mathématiques", "Science", "Droit", "Histoire", "Tech", "Business", "Littérature"];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Catalogue des Cours</h1>
        <p className="text-muted-foreground">Trouvez la formation parfaite pour développer vos compétences.</p>
      </div>

      <Tabs defaultValue="Tous" className="space-y-4">
        <TabsList>
            {categories.map(category => (
                <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
            ))}
        </TabsList>
        <TabsContent value="Tous" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
            ))}
        </TabsContent>
        {categories.slice(1).map(category => (
            <TabsContent key={category} value={category} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {courses.filter(c => c.category === category).map((course) => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </TabsContent>
        ))}
      </Tabs>
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

    