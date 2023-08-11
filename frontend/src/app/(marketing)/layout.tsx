import MainNav from "./MainNav";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <MainNav />
      <main className="mt-12 max-w-6xl mx-auto px-8">{children}</main>
    </div>
  );
}
