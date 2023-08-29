import { Metadata } from "next";
import EventForm from "~/app/(auth)/dashboard/events/EventForm";

export const metadata: Metadata = {
  title: "Create Event",
};

export default function Page() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center">Create Event</h1>

      <div className="mt-8">
        <EventForm />
      </div>
    </div>
  );
}
