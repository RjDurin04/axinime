import { ReactNode } from "react";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardFooter } from "./DashboardFooter";

interface DashboardLayoutProps {
  children: ReactNode;
  sfwMode: boolean;
  onSfwChange: (sfw: boolean) => void;
}

export function DashboardLayout({ children, sfwMode, onSfwChange }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardHeader sfwMode={sfwMode} onSfwChange={onSfwChange} />
      <main className="flex-1">{children}</main>
      <DashboardFooter />
    </div>
  );
}
