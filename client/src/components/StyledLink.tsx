import type { ReactNode } from "react";

interface StyledLinkProps {
  href: string;
  children: ReactNode;
}

export default function StyledLink({ href, children }: StyledLinkProps) {
  return (
    <a
      href={href}
      className="mr-5 no-underline text-sky-700 font-medium hover:underline"
    >
      {children}
    </a>
  );
}
