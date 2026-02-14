export default function StyledPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-[#242424] text-white font-sans antialiased">
      {children}
    </div>
  );
}
