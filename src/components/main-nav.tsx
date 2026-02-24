
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
  Library,
  Archive,
  BookOpenText,
  Users,
  Settings,
  ShieldCheck,
  Wallet
} from "lucide-react";
import { SokoPlusLogo } from "./icons";
import { useUser } from "@/firebase";

export function MainNav() {
  const pathname = usePathname();
  const { userProfile } = useUser();

  const role = userProfile?.role;
  const isSuperAdmin = role === "SuperAdmin";
  const isSchoolAdmin = role === "SchoolAdmin";
  const isAccountant = role === "Accountant";
  const isTeacher = role === "Teacher";
  const isStudentParent = role === "Student" || role === "Parent";

  const primaryLinks = [
    { href: "/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  ];

  const superAdminLinks = [
    { href: "/schooling/superadmin/schools", label: "Gérer les Écoles", icon: ShieldCheck },
  ];

  const schoolAdminLinks = [
    { href: "/schooling/admin/students", label: "Gestion Élèves", icon: Users },
    { href: "/schooling/admin/courses", label: "Gestion Cours", icon: BookOpenText },
    { href: "/schooling/admin/accounting", label: "Comptabilité", icon: Wallet },
    { href: "/schooling/admin/reports", label: "Rapports Financiers", icon: FileSpreadsheet },
  ];

  const accountantLinks = [
    { href: "/schooling/admin/students", label: "Chercher Élève", icon: Users },
    { href: "/schooling/admin/accounting", label: "Saisir Paiement", icon: Receipt },
  ];

  const schoolingLinks = [
    { href: "/schooling/grades", label: "Notes & Résultats", icon: FileSpreadsheet },
    { href: "/schooling/fees", label: "Mes Paiements", icon: Wallet },
    { href: "/schooling/news", label: "Actualités École", icon: Newspaper },
    { href: "/schooling/messages", label: "Messages École", icon: MessageSquareText },
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

        {isSuperAdmin && (
          <>
            <SidebarGroup>
              <SidebarGroupLabel>Administration Soko+</SidebarGroupLabel>
              <SidebarMenu>{renderLinks(superAdminLinks)}</SidebarMenu>
            </SidebarGroup>
            <SidebarSeparator />
          </>
        )}

        {(isSchoolAdmin || isAccountant) && (
          <>
            <SidebarGroup>
              <SidebarGroupLabel>Gestion École</SidebarGroupLabel>
              <SidebarMenu>{renderLinks(isSchoolAdmin ? schoolAdminLinks : accountantLinks)}</SidebarMenu>
            </SidebarGroup>
            <SidebarSeparator />
          </>
        )}

        {isStudentParent && (
          <>
            <SidebarGroup>
              <SidebarGroupLabel>Ma Scolarité</SidebarGroupLabel>
              <SidebarMenu>{renderLinks(schoolingLinks)}</SidebarMenu>
            </SidebarGroup>
            <SidebarSeparator />
          </>
        )}

        <SidebarGroup>
          <SidebarGroupLabel>Services Communautaires</SidebarGroupLabel>
          <SidebarMenu>
            {renderLinks([
              { href: "/market", label: "Marché Local", icon: Store },
              { href: "/jobs", label: "Emploi", icon: Briefcase },
              { href: "/housing", label: "Logement", icon: Home },
              { href: "/transport", label: "Transport", icon: Car },
              { href: "/solidarity", label: "Solidarité", icon: HeartHandshake },
            ])}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Santé & Bien-être</SidebarGroupLabel>
          <SidebarMenu>
            {renderLinks([
              { href: "/health", label: "Santé", icon: HeartPulse },
              { href: "/pharmacy", label: "Pharmacie", icon: Pill },
              { href: "/well-being", label: "Bien-être", icon: Smile },
            ])}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Outils IA</SidebarGroupLabel>
          <SidebarMenu>{renderLinks([{ href: "/recommendations", label: "Pour vous (IA)", icon: Wand2 }])}</SidebarMenu>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Gouvernance</SidebarGroupLabel>
          <SidebarMenu>{renderLinks([{ href: "/governance", label: "Administration", icon: Landmark }])}</SidebarMenu>
        </SidebarGroup>
      </SidebarMenu>
    </div>
  );
}
