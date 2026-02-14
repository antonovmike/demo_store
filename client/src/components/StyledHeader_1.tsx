import type { ReactNode } from "react";

interface StyledHeaderProps {
  children: ReactNode;
}

export default function StyledHeader_1({ children }: StyledHeaderProps) {
  return <h1 className="text-[#8ec07c] font-mono text-xl">{children}</h1>;
}
