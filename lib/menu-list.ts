import {
    Tag,
    Users,
    Settings,
    Bookmark,
    SquarePen,
    LayoutGrid,
    LucideIcon,
    Earth,
    SquareStack,
    ArrowBigUp,
    ShieldMinus,
  } from "lucide-react";
  
  type Submenu = {
    href: string;
    label: string;
    active: boolean;
  };
  
  type Menu = {
    href: string;
    label: string;
    active: boolean;
    icon: LucideIcon;
    submenus: Submenu[];
  };
  
  type Group = {
    groupLabel: string;
    menus: Menu[];
  };
  
  export function getMenuList(pathname: string): Group[] {
    return [
      {
        groupLabel: "",
        menus: [
          {
            href: "/analise-equivalencias",
            label: "Analise Equivalencias",
            active: pathname.includes("/analise-equivalencias"),
            icon: LayoutGrid,
            submenus: [],
          },
        ],
      },
      {
        groupLabel: "Analises",
        menus: [
          {
            href: "",
            label: "Posts",
            active: pathname.includes("/posts"),
            icon: SquarePen,
            submenus: [
              {
                href: "/posts",
                label: "All Posts",
                active: pathname === "/posts",
              },
              {
                href: "/posts/new",
                label: "New Post",
                active: pathname === "/posts/new",
              },
            ],
          },
          // {
          //   href: "/analise-equivalencias",
          //   label: "Analise Equivalencias",
          //   active: pathname.includes("/analise-equivalencias"),
          //   icon: Bookmark,
          //   submenus: [],
          // },
          {
            href: "/ia-response",
            label: "IA Response",
            active: pathname.includes("/ia-response"),
            icon: Tag,
            submenus: [],
          },
        ],
      },
      {
        groupLabel: "Configurações",
        menus: [
          {
            href: "/configuracoes/faculdades",
            label: "Faculdade",
            active: pathname.includes("/configuracoes/faculdades"),
            icon: SquareStack,
            submenus: [],
          },
          {
            href: "/configuracoes/cursos",
            label: "Curso",
            active: pathname.includes("/configuracoes/cursos"),
            icon: ShieldMinus,
            submenus: [],
          },
          {
            href: "/configuracoes/disciplinas",
            label: "Disciplina",
            active: pathname.includes("/configuracoes/disciplinas"),
            icon: Earth,
            submenus: [],
          },
          {
            href: "/configuracoes/usuario",
            label: "Usuario",
            active: pathname.includes("/configuracoes/usuario"),
            icon: Users,
            submenus: [],
          },
        ],
      },
    ];
  }