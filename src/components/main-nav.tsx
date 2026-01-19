"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  Briefcase,
  GraduationCap,
  HeartPulse,
  LayoutDashboard,
  ShoppingCart,
  Smile,
  Users,
  Wand2,
} from "lucide-react";
import { SokoPlusLogo } from "./icons";

const links = [
  {
    href: "/",
    label: "Tableau de bord",
    icon: LayoutDashboard,
  },
  {
    href: "/education",
    label: "Éducation",
    icon: GraduationCap,
  },
  {
    href: "/market",
    label: "Marché",
    icon: ShoppingCart,
  },
  {
    href: "/jobs",
    label: "Emploi",
    icon: Briefcase,
  },
  {
    href: "/pharmacy",
    label: "Pharmacie",
    icon: HeartPulse,
  },
  {
    href: "/solidarity",
    label: "Solidarité",
    icon: Users,
  },
  {
    href: "/well-being",
    label: "Bien-être",
    icon: Smile,
  },
  {
    href: "/recommendations",
    label: "Recommandations IA",
    icon: Wand2,
  },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full">
        <div className="p-4 flex items-center gap-2">
            <SokoPlusLogo className="h-8 w-8 text-primary" />
            <span className="font-headline text-xl font-bold group-data-[collapsible=icon]:hidden">Soko+</span>
        </div>

        <SidebarMenu className="flex-1 p-2">
            {links.map((link) => (
            <SidebarMenuItem key={link.href}>
                <Link href={link.href} passHref legacyBehavior>
                <SidebarMenuButton
                    isActive={pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))}
                    tooltip={link.label}
                >
                    <link.icon />
                    <span>{link.label}</span>
                </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
            ))}
        </SidebarMenu>
    </div>
  );
}
