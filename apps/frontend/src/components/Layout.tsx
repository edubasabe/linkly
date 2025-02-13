export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-700 flex flex-col items-center justify-center p-4">
      {children}
    </main>
  );
}
