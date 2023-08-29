import { type Metadata, type ResolvingMetadata } from "next";
import EventForm from "~/app/(auth)/dashboard/events/EventForm";

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

export default function Page({ params }: Props) {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center">View Event</h1>

      <div className="mt-8">
        <EventForm />
      </div>
    </div>
  );
}
