import { LucideIcon } from "lucide-react";

declare type Submenu = {
    href: string;
    label: string;
    active: boolean;
};

declare type CollapseMenuButtonProps = {
    icon: LucideIcon;
    label: string;
    active: boolean;
    submenus: Submenu[];
    isOpen: boolean | undefined;
};

declare type ContentLayoutProps = {
    title: string;
    children: React.ReactNode;
};

declare type MenuProps = {
    isOpen: boolean | undefined;
};

declare type NavbarProps = {
    title: string;
};

declare type SidebarToggleProps = {
    isOpen: boolean | undefined;
    setIsOpen?: () => void;
};
