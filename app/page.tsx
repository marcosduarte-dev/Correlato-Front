"use client";

import { AuthContext } from '@/contexts/AuthContext';
import { useSidebarToggle } from '@/hooks/use-sidebar-toggle';
import { useStore } from '@/hooks/use-store';
import { useContext } from 'react';

export default function Home({ children }: { children: React.ReactNode }) {

  const sidebar = useStore(useSidebarToggle, (state) => state);

  const { user } = useContext(AuthContext);

  if (!sidebar) return null;

  return (
    <main>
      <p> {user?.nome} </p>
    </main>
  );
}
