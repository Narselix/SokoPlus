'use client';

import { useUser } from "@/firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SokoPlusLogo } from "@/components/icons";
import { LandingPageContent } from "./landing-page";

export default function RootPage() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace('/dashboard');
    }
  }, [user, loading, router]);
  
  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <SokoPlusLogo className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (user) {
    // Show a loader while redirecting
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <SokoPlusLogo className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }
  
  return <LandingPageContent />;
}
