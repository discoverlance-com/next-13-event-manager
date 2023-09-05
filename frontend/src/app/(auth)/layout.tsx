import AppLayout from "./AppLayout";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <AppLayout>{children}</AppLayout>
    </div>
  );
}
