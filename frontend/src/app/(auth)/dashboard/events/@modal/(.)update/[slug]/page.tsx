import { type Metadata, type ResolvingMetadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import EventForm from "~/app/(auth)/dashboard/events/EventForm";
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

  const title = event?.data.title + " - Update Event";
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

export default async function Page({ params }: Props) {
  const event = await getEvent(params.slug);

  if (event === undefined) {
    notFound();
  }
  return (
    <AppModal>
      <div>
        <h1 className="text-3xl font-bold text-center">Edit Event</h1>

        <div className="mt-8">
          <EventForm data={event.data} />
        </div>
      </div>
    </AppModal>
  );
}
