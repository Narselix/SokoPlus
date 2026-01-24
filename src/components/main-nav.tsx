"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  GraduationCap,
  BookCopy,
  Award,
  Store,
  Briefcase,
  HeartHandshake,
  Pill,
  Smile,
  Wand2,
  ClipboardSignature,
  HeartPulse,
  Home,
  Car,
} from "lucide-react";
import { SokoPlusLogo } from "./icons";

const primaryLinks = [
  {
    href: "/",
    label: "Tableau de bord",
    icon: LayoutDashboard,
  },
];

const educationLinks = [
   {
    href: "/education",
    label: "Éducation",
    icon: GraduationCap,
  },
  {
    href: "/courses",
    label: "Mes Cours",
    icon: BookCopy,
  },
  {
    href: "/certificates",
    label: "Mes Certificats",
    icon: Award,
  },
];

const communityLinks = [
  {
    href: "/market",
    label: "Marché Local",
    icon: Store,
  },
  {
    href: "/jobs",
    label: "Emploi",
    icon: Briefcase,
  },
  {
    href: "/freelance",
    label: "Freelance",
    icon: ClipboardSignature,
  },
  {
    href: "/housing",
    label: "Logement",
    icon: Home,
  },
  {
    href: "/transport",
    label: "Transport",
    icon: Car,
  },
  {
    href: "/solidarity",
    label: "Solidarité",
    icon: HeartHandshake,
  },
];

const servicesLinks = [
    {
        href: "/health",
        label: "Santé & Orientation",
        icon: HeartPulse,
    },
    {
    href: "/pharmacy",
    label: "Pharmacie",
    icon: Pill,
  },
  {
    href: "/well-being",
    label: "Bien-être",
    icon: Smile,
  },
];

const aiLinks = [
    {
    href: "/recommendations",
    label: "Pour vous (IA)",
    icon: Wand2,
  },
]

export function MainNav() {
  const pathname = usePathname();

  const renderLinks = (links: any[]) => links.map((link) => (
    <SidebarMenuItem key={link.href}>
        <Link href={link.href} passHref legacyBehavior>
        <SidebarMenuButton
            isActive={pathname === link.href || (pathname.startsWith(link.href) && link.href !== "/")}
            tooltip={link.label}
        >
            <link.icon />
            <span>{link.label}</span>
        </SidebarMenuButton>
        </Link>
    </SidebarMenuItem>
    ));

  return (
    <div className="flex flex-col h-full">
        <div className="p-4 flex items-center gap-2">
            <SokoPlusLogo className="h-8 w-8 text-primary" />
            <span className="font-headline text-xl font-bold group-data-[collapsible=icon]:hidden">Soko+</span>
        </div>

        <SidebarMenu className="flex-1 p-2 overflow-y-auto">
            <SidebarGroup>
                 <SidebarMenu>
                    {renderLinks(primaryLinks)}
                 </SidebarMenu>
            </SidebarGroup>
            
            <SidebarSeparator/>

            <SidebarGroup>
                <SidebarGroupLabel>Éducation</SidebarGroupLabel>
                 <SidebarMenu>
                    {renderLinks(educationLinks)}
                 </SidebarMenu>
            </SidebarGroup>

            <SidebarSeparator/>
            
            <SidebarGroup>
                <SidebarGroupLabel>Communauté</SidebarGroupLabel>
                <SidebarMenu>
                    {renderLinks(communityLinks)}
                 </SidebarMenu>
            </SidebarGroup>

            <SidebarSeparator/>

             <SidebarGroup>
                <SidebarGroupLabel>Services</SidebarGroupLabel>
                <SidebarMenu>
                    {renderLinks(servicesLinks)}
                 </SidebarMenu>
            </SidebarGroup>
            
             <SidebarSeparator/>

             <SidebarGroup>
                <SidebarGroupLabel>Personnalisation</SidebarGroupLabel>
                <SidebarMenu>
                    {renderLinks(aiLinks)}
                 </SidebarMenu>
            </SidebarGroup>


        </SidebarMenu>
    </div>
  );
}
