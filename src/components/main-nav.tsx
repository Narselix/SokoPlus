"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  BookCopy,
  LayoutDashboard,
  Award,
} from "lucide-react";
import { ShuleLogo } from "./icons";

const links = [
  {
    href: "/",
    label: "Tableau de bord",
    icon: LayoutDashboard,
  },
  {
    href: "/courses",
    label: "Cours",
    icon: BookCopy,
  },
  {
    href: "/certificates",
    label: "Certificats",
    icon: Award,
  },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full">
        <div className="p-4 flex items-center gap-2">
            <ShuleLogo className="h-8 w-8 text-primary" />
            <span className="font-headline text-xl font-bold group-data-[collapsible=icon]:hidden">Shule</span>
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
