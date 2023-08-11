export default function Loading() {
  return (
    <div className="h-full w-full flex items-center justify-center flex-col">
      <div className="font-bold w-3/4 block animate-pulse bg-slate-200 h-14"></div>
      <div className="mt-3 text-lg block animate-pulse bg-slate-200 h-7 w-80"></div>

      <section className="w-full mt-12">
        <div className="w-full h-72 animate-pulse bg-slate-200"></div>
      </section>
    </div>
  );
}
