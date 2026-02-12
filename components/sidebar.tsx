import { ThemeToggle } from "@/components/theme-toggle";

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-[103px] flex-col bg-sidebar">
      {/* Logo */}
      <div className="flex h-[103px] items-center justify-center border-r border-sidebar-border bg-primary">
        <div className="relative flex h-10 w-10 items-center justify-center">
          {/* Logo placeholder - purple circle with white accent */}
          <div className="absolute inset-0 rounded-r-lg bg-primary-foreground" />
          <div className="absolute bottom-0 left-0 h-1/2 w-full rounded-br-lg rounded-tl-lg bg-accent" />
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Theme toggle and avatar section */}
      <div className="flex flex-col items-center gap-0 border-t border-sidebar-border">
        {/* Theme toggle */}
        <div className="flex h-[88px] w-full items-center justify-center">
          <ThemeToggle />
        </div>

        {/* Avatar placeholder */}
        <div className="flex h-[88px] w-full items-center justify-center border-t border-sidebar-border">
          <div className="h-10 w-10 rounded-full bg-muted-foreground" />
        </div>
      </div>
    </aside>
  );
}
