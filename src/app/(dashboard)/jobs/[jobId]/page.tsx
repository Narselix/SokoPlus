'use client';

import { jobs } from "@/lib/placeholder-data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function JobDetailPage({ params }: { params: { jobId: string } }) {
  const job = jobs.find(p => p.id.toString() === params.jobId);

  if (!job) {
    notFound();
  }
  
  return (
    <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
        <div className="md:col-span-2 space-y-6">
            <div>
                <h1 className="text-3xl lg:text-4xl font-bold tracking-tight font-headline">{job.title}</h1>
                <p className="text-xl text-muted-foreground mt-1">{job.company}</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Description du poste</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground">
                    <p>{job.description}</p>
                </CardContent>
            </Card>
        </div>

        <div className="space-y-6">
            <Card>
                 <CardContent className="p-4 flex flex-col gap-4">
                    <Button className="w-full" size="lg">
                      Postuler maintenant
                    </Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Détails de l'offre</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                    <div className="flex items-center gap-3">
                        <MapPin className="h-4 w-4 text-muted-foreground"/>
                        <div>
                            <p className="font-semibold">Localisation</p>
                            <p className="text-muted-foreground">{job.location}</p>
                        </div>
                    </div>
                   <div className="flex items-center gap-3">
                        <Briefcase className="h-4 w-4 text-muted-foreground"/>
                        <div>
                            <p className="font-semibold">Type de contrat</p>
                            <p className="text-muted-foreground">{job.type}</p>
                        </div>
                    </div>
                    <div>
                         <p className="font-semibold mb-2">Compétences</p>
                         <div className="flex flex-wrap gap-2">
                            {job.tags.map(tag => (
                                <Badge key={tag} variant="secondary">{tag}</Badge>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
