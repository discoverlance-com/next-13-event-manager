import { format, parseISO } from "date-fns";
import { type Metadata, type ResolvingMetadata } from "next";
import { cookies } from "next/headers";
import Image from "next/image";
import { notFound } from "next/navigation";

import AppModal from "~/components/AppModal";
import { apiRoutes } from "~/lib/api";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // fetch data
  const event = await getEvent(params.slug);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  const images = event?.data?.image_url
    ? new URL(event.data.image_url)
    : previousImages;

  const title = event?.data.title + " - View Event";
  return {
    title: title,
    description: event?.data?.description?.slice(0, 160),
    openGraph: {
      images: images,
    },
    twitter: {
      images: images,
      title: title,
      description: event?.data?.description?.slice(0, 160),
    },
  };
}

async function getEvent(slug: string) {
  const apiToken = cookies().get("apiToken")?.value;
  const request = await fetch(apiRoutes.auth.events.edit(slug), {
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
  });

  if (request.status === 404) {
    return undefined;
  }

  return (await request.json()) as { data: EventData };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const event = await getEvent(params.slug);

  if (event === undefined) {
    notFound();
  }

  return (
    <AppModal>
      <div>
        <h1 className="text-3xl font-bold text-center">View Event</h1>

        <div className="mt-8">
          <div className="space-y-4">
            <h2 className="font-medium text-xl">{event.data.title}</h2>
            <div>
              {event.data?.image_url ? (
                <Image
                  src={event.data.image_url}
                  alt={event.data.title}
                  width={200}
                  height={200}
                />
              ) : null}
            </div>
            <p>
              Start At:{" "}
              {format(parseISO(event.data.start_at), "mm/dd/yyyy H:m")}
            </p>
            <p>
              End At: {format(parseISO(event.data.end_at), "mm/dd/yyyy H:m")}
            </p>
            <p>STATUS: {event.data.status}</p>

            <p>Tags: {event.data.tags?.join(", ")}</p>
            <p>Speakers: {event.data.speakers?.join(", ")}</p>
            <p>Description: {event.data.description}</p>
          </div>
        </div>
      </div>
    </AppModal>
  );
}
