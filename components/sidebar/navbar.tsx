"use client"

import { NavbarProps } from "@/types/sidebar";

export function Navbar({
  title,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-10 w-full shadow backdrop-blur bg-default">
      <div className="mx-4 sm:mx-8 flex h-14 items-center">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <h1 className="font-bold">{title}</h1>
        </div>
      </div>
    </header>
  );
}