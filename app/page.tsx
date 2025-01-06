"use client";

import { useSidebarToggle } from '@/hooks/use-sidebar-toggle';
import { useStore } from '@/hooks/use-store';

export default function Home({ children }: { children: React.ReactNode }) {

  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  return (
    <main>
      <p> HomePage </p>
    </main>
  );
}
