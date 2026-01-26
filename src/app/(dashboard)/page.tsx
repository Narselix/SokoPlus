'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { SokoPlusLogo } from '@/components/icons';

export default function DashboardRootPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/dashboard');
  }, [router]);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background">
      <SokoPlusLogo className="h-12 w-12 animate-spin text-primary" />
    </div>
  );
}
