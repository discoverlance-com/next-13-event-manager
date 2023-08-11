import { notFound } from "next/navigation";
import { demoEvents } from "../../demo-events";

import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";

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

  return {
    title: event?.title,
    description: event?.description.slice(0, 160),
    openGraph: {
      images: [...previousImages],
    },
  };
}

async function getEvent(slug: string) {
  const event = demoEvents.find((event) => event.slug === slug);

  return event;
}

export default async function Page({ params }: Props) {
  const event = await getEvent(params.slug);

  if (!event) {
    notFound();
  }

  return (
    <div>
      {event.image && (
        <div className="mb-12">
          <Image
            src={event.image}
            alt={event.title}
            width={500}
            className="rounded-lg mx-auto"
            height={600}
          />
        </div>
      )}
      <h1 className="text-5xl text-center font-bold">{event.title}</h1>

      <div className="text-center mt-3 text-lg">{event.description}</div>
    </div>
  );
}
