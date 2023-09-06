import { notFound } from "next/navigation";

import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import { apiRoutes } from "~/lib/api";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.slug;

  // fetch data
  const event = await getEvent(id);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  const images = event?.data?.image_url
    ? new URL(event.data.image_url)
    : previousImages;

  return {
    title: event?.data?.title,
    description: event?.data?.description?.slice(0, 160),
    openGraph: {
      images: images,
    },
    twitter: {
      images: images,
      title: event?.data?.title,
      description: event?.data?.description?.slice(0, 160),
    },
  };
}

async function getEvent(slug: string) {
  const request = await fetch(apiRoutes.viewEvent(slug), {
    next: { tags: ["viewEvent"] },
  });

  if (request.status === 404) {
    return undefined;
  }

  return (await request.json()) as { data: EventData };
}

export default async function Page({ params }: Props) {
  const event = await getEvent(params.slug);

  if (!event) {
    notFound();
  }

  return (
    <div>
      {event.data.image_url && (
        <div className="mb-12">
          <Image
            src={event.data.image_url}
            alt={event.data.title}
            width={500}
            className="rounded-lg mx-auto aspect-video"
            height={600}
            priority
          />
        </div>
      )}
      <h1 className="text-5xl text-center font-bold">{event.data.title}</h1>

      <div className="text-center mt-3 text-lg">{event.data.description}</div>
    </div>
  );
}
