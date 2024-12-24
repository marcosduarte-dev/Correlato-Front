"use client";

import Sidebar from '@/components/sidebar/Sidebar';
import SideBarLayout from '@/components/sidebar/sidebar-layout';
import { useSidebarToggle } from '@/hooks/use-sidebar-toggle';
import { useStore } from '@/hooks/use-store';
import { cn } from '@/lib/utils';

export default function Home({ children }: { children: React.ReactNode }) {

  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  return (
    <main>
      {/* <Sidebar /> */}
      <p> HomePage </p>
    </main>
  );
}
