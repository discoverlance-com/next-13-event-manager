import EventsTable from "./EventsTable";

export default function PageLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-8 w-full">
      <div className="rounded-lg bg-gray-100 shadow-inner lg:col-span-3">
        <EventsTable />
      </div>
      <div className="rounded-lg bg-gray-100 shadow-inner lg:col-span-2">
        {children}
      </div>
      {modal}
    </div>
  );
}
