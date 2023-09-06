import { type Metadata, type ResolvingMetadata } from "next";
import EventForm from "~/app/(auth)/dashboard/events/EventForm";
import EventsTable from "../../EventsTable";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: "Some Event - View Event",
  };
}

export default function Page({ params, searchParams }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-8 w-full">
      <div className="rounded-lg bg-gray-100 shadow-inner lg:col-span-3">
        <EventsTable searchParams={searchParams} />
      </div>
      <div className="rounded-lg bg-gray-100 shadow-inner lg:col-span-2">
        <div className="p-4">
          <h1 className="text-3xl font-bold text-center">View Event</h1>

          <div className="mt-8">
            <EventForm />
          </div>
        </div>
      </div>
    </div>
  );
}
