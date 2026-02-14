export default function StyledLink({ href, children }) {
  return (
    <a
      href={href}
      className="mr-5 no-underline text-sky-700 font-medium hover:underline"
    >
      {children}
    </a>
  );
}
