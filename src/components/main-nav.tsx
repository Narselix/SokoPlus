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
  Landmark,
  Receipt,
  FileSpreadsheet,
  MessageSquareText,
  Newspaper,
  BookOpen,
  Users,
  CheckSquare,
  Library,
  Archive
} from "lucide-react";
import { SokoPlusLogo } from "./icons";
import { useUser } from "@/firebase";

export function MainNav() {
  const pathname = usePathname();
  const { userProfile } = useUser();

  const isStaff = userProfile?.role === "Teacher" || userProfile?.role === "Admin";
  const isAdmin = userProfile?.role === "Admin";

  const primaryLinks = [
    { href: "/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  ];

  // Liens pour les parents et élèves
  const schoolingLinks = [
    { href: "/schooling/grades", label: "Notes & Résultats", icon: FileSpreadsheet },
    { href: "/schooling/fees", label: "Frais Scolaires", icon: Receipt },
    { href: "/schooling/news", label: "Actualités École", icon: Newspaper },
    { href: "/schooling/messages", label: "Messages École", icon: MessageSquareText },
  ];

  // Liens de gestion pour le personnel (Enseignants/Admin)
  const managementLinks = [
    { href: "/schooling/admin/attendance", label: "Faire l'appel", icon: CheckSquare },
    { href: "/schooling/admin/grades", label: "Saisie des notes", icon: GraduationCap },
    { href: "/schooling/library", label: "Bibliothèque", icon: Library },
    { href: "/schooling/archives", label: "Archives", icon: Archive },
  ];

  const educationLinks = [
    { href: "/education", label: "Catalogue Cours", icon: GraduationCap },
    { href: "/courses", label: "Mes Cours", icon: BookCopy },
    { href: "/certificates", label: "Mes Certificats", icon: Award },
  ];

  const communityLinks = [
    { href: "/market", label: "Marché Local", icon: Store },
    { href: "/jobs", label: "Emploi", icon: Briefcase },
    { href: "/freelance", label: "Freelance", icon: ClipboardSignature },
    { href: "/housing", label: "Logement", icon: Home },
    { href: "/transport", label: "Transport", icon: Car },
    { href: "/solidarity", label: "Solidarité", icon: HeartHandshake },
  ];

  const servicesLinks = [
    { href: "/health", label: "Santé & Orientation", icon: HeartPulse },
    { href: "/pharmacy", label: "Pharmacie", icon: Pill },
    { href: "/well-being", label: "Bien-être", icon: Smile },
  ];

  const aiLinks = [
    { href: "/recommendations", label: "Pour vous (IA)", icon: Wand2 },
  ];

  const governanceLinks = [
    { href: "/governance", label: "Administration", icon: Landmark },
  ];

  const renderLinks = (links: any[]) => links.map((link) => (
    <SidebarMenuItem key={link.href}>
      <SidebarMenuButton
        isActive={pathname === link.href || (pathname.startsWith(link.href) && link.href !== "/")}
        tooltip={link.label}
        asChild
      >
        <Link href={link.href}>
          <link.icon />
          <span>{link.label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  ));

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 flex items-center gap-2">
        <SokoPlusLogo className="h-8 w-8 text-primary" />
        <span className="font-headline text-xl font-bold">Soko+</span>
      </div>

      <SidebarMenu className="flex-1 p-2 overflow-y-auto">
        <SidebarGroup>
          <SidebarMenu>{renderLinks(primaryLinks)}</SidebarMenu>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Section Management pour l'école (Shule style) */}
        {isStaff && (
          <>
            <SidebarGroup>
              <SidebarGroupLabel>Gestion École</SidebarGroupLabel>
              <SidebarMenu>{renderLinks(managementLinks)}</SidebarMenu>
            </SidebarGroup>
            <SidebarSeparator />
          </>
        )}

        <SidebarGroup>
          <SidebarGroupLabel>Ma Scolarité</SidebarGroupLabel>
          <SidebarMenu>{renderLinks(schoolingLinks)}</SidebarMenu>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Auto-Formation</SidebarGroupLabel>
          <SidebarMenu>{renderLinks(educationLinks)}</SidebarMenu>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Communauté</SidebarGroupLabel>
          <SidebarMenu>{renderLinks(communityLinks)}</SidebarMenu>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Services</SidebarGroupLabel>
          <SidebarMenu>{renderLinks(servicesLinks)}</SidebarMenu>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>IA & Perso</SidebarGroupLabel>
          <SidebarMenu>{renderLinks(aiLinks)}</SidebarMenu>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Gouvernance</SidebarGroupLabel>
          <SidebarMenu>{renderLinks(governanceLinks)}</SidebarMenu>
        </SidebarGroup>
      </SidebarMenu>
    </div>
  );
}
