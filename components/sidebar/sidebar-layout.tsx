"use client";

import { cn } from "@/lib/utils";
import { useStore } from "@/hooks/use-store";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import Sidebar from "./Sidebar";
import { usePathname } from 'next/navigation'

export default function SideBarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname()
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  const shouldRenderSidebar = !pathname.includes('/login');

  return (
    <>
      {shouldRenderSidebar && <Sidebar />}
      <main
        className={cn(
          "min-h-[calc(100vh)] info-container transition-[margin-left] ease-in-out duration-300",
          shouldRenderSidebar && (sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72")
        )}
      >
        {children}
      </main>
    </>
  );
}