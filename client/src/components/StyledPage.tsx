import type { ReactNode } from "react";

interface StyledPageProps {
  children: ReactNode;
}

export default function StyledPage({ children }: StyledPageProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-[#242424] text-white font-sans antialiased">
      {children}
    </div>
  );
}
