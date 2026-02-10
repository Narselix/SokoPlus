
'use client';

import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";

const mockMessages = [
  { id: 1, sender: "Direction", content: "Bonjour, nous avons bien reçu votre demande de transfert de dossier.", time: "10:30", isMe: false },
  { id: 2, sender: "Vous", content: "Merci. Quel est le délai moyen pour le traitement ?", time: "10:45", isMe: true },
  { id: 3, sender: "Direction", content: "Comptez environ 48h ouvrables. Vous recevrez une notification ici.", time: "11:00", isMe: false },
];

export default function SchoolMessagesPage() {
  const [input, setInput] = useState("");

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Communication École</h1>
        <p className="text-muted-foreground">Discutez directement avec l'administration ou les enseignants.</p>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden">
        <CardHeader className="border-b">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base">Administration Scolaire</CardTitle>
              <p className="text-xs text-muted-foreground">En ligne - Répond généralement en quelques heures</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-4 overflow-hidden">
          <ScrollArea className="h-full pr-4">
            <div className="space-y-4">
              {mockMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] rounded-lg p-3 ${msg.isMe ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                    <p className="text-sm">{msg.content}</p>
                    <p className="text-[10px] mt-1 opacity-70 text-right">{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="border-t p-4">
          <form className="flex w-full items-center gap-2" onSubmit={(e) => e.preventDefault()}>
            <Input 
              placeholder="Écrivez votre message..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
