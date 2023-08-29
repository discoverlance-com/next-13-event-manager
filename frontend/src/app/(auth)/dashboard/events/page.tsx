import AppLinkButton from "~/components/AppLinkButton";

export default function Page() {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-8">
        <AppLinkButton href="/dashboard/events/create">New Event</AppLinkButton>
      </div>
    </div>
  );
}
