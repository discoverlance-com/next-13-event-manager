import { requireUser } from "~/lib/auth";
import RenderParallelRoute from "./RenderParallelRoute";

export default async function Layout({
  children,
  analytics,
  stats,
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  stats: React.ReactNode;
}) {
  await requireUser();

  return (
    <div className="space-y-12">
      <div>{children}</div>

      <RenderParallelRoute>{stats}</RenderParallelRoute>
      <RenderParallelRoute>{analytics}</RenderParallelRoute>
    </div>
  );
}
