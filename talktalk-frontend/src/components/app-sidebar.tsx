import {
  Telescope,
  UserRoundIcon as UserRoundPen,
  Loader,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items with additional metadata
const items = [
  {
    title: "Explore",
    url: "/explore",
    icon: Telescope,
    description: "Discover new content",
  },
  {
    title: "Profile",
    url: "/profile",
    icon: UserRoundPen,
    description: "View your profile",
  },
  {
    title: "Progress",
    url: "/progress",
    icon: TrendingUp,
    description: "Track your journey",
  },
  {
    title: "Upload",
    url: "/upload",
    icon: Loader,
    description: "Share your content",
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-purple-800/20">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-6 pt-6 pb-4">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                TalkTalk
              </span>
            </Link>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="px-3 pt-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-zinc-200 transition-colors hover:bg-purple-500/10 hover:text-purple-400"
                    tooltip={item.description}
                  >
                    <Link href={item.url} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span className="text-[15px] font-medium">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
