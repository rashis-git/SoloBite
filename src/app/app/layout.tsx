export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-4xl mx-auto min-h-screen px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}
