export default function Page() {
  return (
    <div>
      <section className="bg-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Global Statistics</h2>

          <p className="mt-4 text-gray-500 sm:text-xl">
            Find here our global statistics for all events
          </p>
        </div>

        <div className="mt-8 sm:mt-12">
          <dl className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="flex flex-col rounded-lg border border-slate-100 px-4 py-8 text-center">
              <dt className="order-last text-lg font-medium text-slate-500">
                Total Events
              </dt>

              <dd className="text-4xl font-extrabold text-slate-600 md:text-5xl">
                170
              </dd>
            </div>

            <div className="flex flex-col rounded-lg border border-slate-100 px-4 py-8 text-center">
              <dt className="order-last text-lg font-medium text-slate-500">
                Published Events
              </dt>

              <dd className="text-4xl font-extrabold text-slate-600 md:text-5xl">
                80
              </dd>
            </div>

            <div className="flex flex-col rounded-lg border border-slate-100 px-4 py-8 text-center">
              <dt className="order-last text-lg font-medium text-slate-500">
                Archived Events
              </dt>

              <dd className="text-4xl font-extrabold text-slate-600 md:text-5xl">
                70
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </div>
  );
}
