import { ContentLayoutProps } from "@/types/sidebar";
import { Navbar } from "./navbar";

export function ContentLayout({
  title,
  children,
}: ContentLayoutProps) {
  return (
    <div>
      <Navbar
        title={title}
      />
      <div className="container pt-8 pb-8 px-4 sm:px-8">{children}</div>
    </div>
  );
}