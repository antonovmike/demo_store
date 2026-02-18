import type { ReactNode } from "react";

interface StyledHeaderProps {
  children: ReactNode;
}

export default function StyledHeader_2({ children }: StyledHeaderProps) {
  return <h2 className="text-2xl font-bold mb-4 text-center">{children}</h2>;
}
