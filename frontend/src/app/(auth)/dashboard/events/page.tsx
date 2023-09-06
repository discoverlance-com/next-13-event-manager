import AppLinkButton from "~/components/AppLinkButton";
import { requireUser } from "~/lib/auth";
import EventsTable from "./EventsTable";

export type NextSearchParams = { [key: string]: string | string[] | undefined };

export default async function Page({
  searchParams,
}: {
  searchParams: NextSearchParams;
}) {
  await requireUser();

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-8 w-full">
      <div className="rounded-lg bg-gray-100 shadow-inner lg:col-span-3">
        <EventsTable searchParams={searchParams} />
      </div>
      <div className="rounded-lg bg-gray-100 shadow-inner lg:col-span-2">
        <div className="p-4">
          <div className="flex justify-between items-center mb-8">
            <AppLinkButton href="/dashboard/events/create">
              New Event
            </AppLinkButton>
          </div>
        </div>
      </div>
    </div>
  );
}
