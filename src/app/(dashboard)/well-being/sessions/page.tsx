'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, MicOff, Video, VideoOff, PhoneOff, Users, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function OnlineSessionPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const getCameraPermission = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Fonctionnalité non supportée',
          description: 'Votre navigateur ne supporte pas l\'accès à la caméra.',
        });
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Accès caméra/micro refusé',
          description: 'Veuillez autoriser l\'accès dans les paramètres de votre navigateur.',
        });
      }
    };

    getCameraPermission();
    
    return () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
    }
  }, [toast]);

  const toggleMute = () => {
    const newIsMuted = !isMuted;
    if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getAudioTracks().forEach(track => {
            track.enabled = !newIsMuted;
        });
    }
    setIsMuted(newIsMuted);
  };

  const toggleVideo = () => {
    const newIsVideoOff = !isVideoOff;
    if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getVideoTracks().forEach(track => {
            track.enabled = !newIsVideoOff;
        });
    }
    setIsVideoOff(newIsVideoOff);
  };
  
  const endCall = () => {
       if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
      setHasCameraPermission(false);
      toast({
          title: "Appel terminé"
      });
  };
  

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Session d'écoute en ligne</h1>
        <p className="text-muted-foreground">Un espace sécurisé pour les discussions vidéo et vocales.</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
              <Card className="h-full">
                  <CardContent className="p-2 h-full flex items-center justify-center">
                      <div className="relative aspect-video w-full bg-black rounded-md flex items-center justify-center overflow-hidden">
                          
                          <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />

                          {hasCameraPermission !== true && (
                              <div className="absolute text-center text-white p-4 z-10">
                                  <VideoOff className="h-12 w-12 mx-auto mb-2" />
                                  <p className="font-semibold">Caméra inactive</p>
                                  <p className="text-sm text-muted-foreground">Veuillez autoriser l'accès à votre caméra et microphone.</p>
                              </div>
                          )}

                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full bg-background/80 p-2 backdrop-blur-sm z-20">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                      <Button variant="ghost" size="icon" className="rounded-full bg-secondary/50 hover:bg-secondary" onClick={toggleMute}>
                                          {isMuted ? <MicOff /> : <Mic />}
                                      </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>{isMuted ? "Activer le micro" : "Couper le micro"}</p>
                                  </TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                      <Button variant="ghost" size="icon" className="rounded-full bg-secondary/50 hover:bg-secondary" onClick={toggleVideo}>
                                          {isVideoOff ? <VideoOff /> : <Video />}
                                      </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>{isVideoOff ? "Activer la caméra" : "Désactiver la caméra"}</p>
                                  </TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                      <Button variant="destructive" size="icon" className="rounded-full" onClick={endCall}>
                                          <PhoneOff />
                                      </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Quitter l'appel</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                          </div>
                          
                          <div className="absolute top-4 right-4 aspect-[4/3] h-1/4 bg-gray-800 rounded-md border-2 border-secondary z-20">
                                <Avatar className="h-full w-full rounded-md">
                                    <AvatarFallback className="rounded-md bg-transparent text-white">
                                        <User className="h-1/2 w-1/2"/>
                                    </AvatarFallback>
                                </Avatar>
                                <p className="absolute bottom-1 left-2 text-xs text-white">Écoutant</p>
                          </div>
                      </div>
                  </CardContent>
              </Card>
          </div>
          <div className="lg:col-span-1 space-y-4">
              <Card>
                  <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                          <Users className="h-5 w-5"/>
                          Participants (3)
                      </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                      <div className="flex items-center gap-3">
                          <Avatar>
                              <AvatarImage src="https://picsum.photos/seed/user1/100/100" />
                              <AvatarFallback>VO</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium">Vous</p>
                          </div>
                          {isMuted ? <MicOff className="h-4 w-4 text-muted-foreground" /> : <Mic className="h-4 w-4 text-primary" />}
                      </div>
                      <div className="flex items-center gap-3">
                          <Avatar>
                              <AvatarImage src="https://picsum.photos/seed/user2/100/100" />
                              <AvatarFallback>EA</AvatarFallback>
                          </Avatar>
                          <p className="font-medium">Écoutant A.</p>
                          <Mic className="h-4 w-4 text-primary ml-auto" />
                      </div>
                       <div className="flex items-center gap-3">
                          <Avatar>
                             <AvatarImage src="https://picsum.photos/seed/user3/100/100" />
                              <AvatarFallback>U2</AvatarFallback>
                          </Avatar>
                          <p className="font-medium">Utilisateur 2</p>
                          <MicOff className="h-4 w-4 text-muted-foreground ml-auto" />
                      </div>
                  </CardContent>
              </Card>
          </div>
      </div>
    </div>
  );
}
