export default function Loading() {
  return (
    <div>
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="animate-pulse bg-slate-200 w-3/4 mx-auto h-10"></h2>

        <p className="mt-4 animate-pulse bg-slate-200 h-7 w-full mx-auto"></p>
      </div>
      <div className="mt-8 sm:mt-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="h-36 w-[370px] px-4 py-8 animate-pulse bg-slate-200 rounded-lg border"></div>
          <div className="h-36 w-[370px] px-4 py-8 animate-pulse bg-slate-200 rounded-lg border"></div>
          <div className="h-36 w-[370px] px-4 py-8 animate-pulse bg-slate-200 rounded-lg border"></div>
        </div>
      </div>
    </div>
  );
}
