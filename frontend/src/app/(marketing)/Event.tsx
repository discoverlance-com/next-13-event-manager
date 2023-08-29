import { format, parseISO } from "date-fns";
import Link from "next/link";

type Props = {
  title: EventData["title"];
  author: EventData["author"];
  date: EventData["start_at"];
  slug: EventData["slug"];
  description?: EventData["description"];
  tags?: EventData["tags"];
  speakers?: EventData["speakers"];
};

const Event = async ({
  title,
  author,
  speakers,
  description,
  tags,
  date,
  slug,
}: Props) => {
  return (
    <article className="rounded-xl bg-gradient-to-r from-slate-200 via-slate-500-500 to-slate-600 p-1 shadow-xl transition hover:shadow-sm">
      <div className="rounded-lg bg-white p-4 pt-16 sm:p-6">
        <div className="space-y-1 mb-2">
          <span className="font-medium">By: {author.name}</span>
          <time dateTime={date} className="block text-xs text-gray-500">
            {format(parseISO(date), "LLLL d, yyyy")}
          </time>
        </div>

        <Link href={`/events/${slug}`}>
          <h3 className="mt-1 text-lg font-medium text-gray-800 underline">
            {title}
          </h3>
        </Link>

        <p className="text-sm text-gray-500">{description?.slice(0, 100)}...</p>

        {tags && tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className="whitespace-nowrap rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {speakers && speakers.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1">
            <span className="text-sm">Speakers:</span>
            {speakers.map((speaker) => (
              <span
                key={speaker}
                className="whitespace-nowrap rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600"
              >
                {speaker}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

export default Event;
