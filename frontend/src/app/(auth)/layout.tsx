import { requireUser } from "~/lib/auth";
import AppLayout from "./AppLayout";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireUser();

  return (
    <div>
      <AppLayout>{children}</AppLayout>
    </div>
  );
}
