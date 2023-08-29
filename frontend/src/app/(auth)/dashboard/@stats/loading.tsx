export default function Loading() {
  return (
    <div className="grid lg:grid-cols-2 gap-8 xl:grid-cols-4">
      <div className="h-23 w-64 animate-pulse rounded-lg border border-gray-100 bg-slate-100 p-6"></div>
      <div className="h-24 w-64 animate-pulse rounded-lg border border-gray-100 bg-slate-100 p-6"></div>
      <div className="h-24 w-64 animate-pulse rounded-lg border border-gray-100 bg-slate-100 p-6"></div>
      <div className="h-24 w-64 animate-pulse rounded-lg border border-gray-100 bg-slate-100 p-6"></div>
    </div>
  );
}
