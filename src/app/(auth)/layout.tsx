import { ShuleLogo } from "@/components/icons";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-secondary/30 p-4">
        <div className="mb-6 flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
            <ShuleLogo className="h-10 w-10 text-primary" />
            <span className="font-headline text-3xl font-bold text-foreground">Shule</span>
            </Link>
        </div>
      {children}
    </div>
  );
}
