import RenderParallelRoute from "./RenderParallelRoute";

export default function Layout({
  children,
  analytics,
  stats,
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  stats: React.ReactNode;
}) {
  return (
    <div className="space-y-12">
      <div>{children}</div>

      <RenderParallelRoute>{stats}</RenderParallelRoute>
      <RenderParallelRoute>{analytics}</RenderParallelRoute>
    </div>
  );
}
