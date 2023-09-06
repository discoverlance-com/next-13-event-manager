import { Metadata } from "next";
import AppLinkButton from "~/components/AppLinkButton";

export const metadata: Metadata = {
  title: "Event Not Found",
};

export default function NotFoundPage() {
  return (
    <div className="grid px-4 bg-white place-content-center">
      <div className="text-center">
        <h1 className="font-black text-slate-300 text-9xl">404</h1>

        <p className="text-2xl font-bold tracking-tight text-gray-700 sm:text-4xl">
          Uh-oh!
        </p>

        <p className="my-4 text-gray-500">
          We can&apos;t find the event you are looking for.
        </p>

        <AppLinkButton href="/dashboard/events">Go to Events</AppLinkButton>
      </div>
    </div>
  );
}
