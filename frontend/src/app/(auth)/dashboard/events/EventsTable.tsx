import { cookies } from "next/headers";
import { format, parseISO } from "date-fns";

import AppButton from "~/components/AppButton";
import AppLinkButton from "~/components/AppLinkButton";
import TablePagination from "./TablePagination";
import { apiRoutes } from "~/lib/api";
import { NextSearchParams } from "./page";

async function getEvents(searchParams: NextSearchParams) {
  const apiToken = cookies().get("apiToken")?.value;

  const page = searchParams.page;
  const url = new URL(apiRoutes.auth.events.myEvents);
  if (page && typeof page == "string") {
    url.searchParams.set("page", page);
  }

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
    next: { tags: ["myEvents"] },
  });

  return (await response.json()) as EventResponse;
}

const EventsTable = async ({
  searchParams,
}: {
  searchParams: NextSearchParams;
}) => {
  const { data, meta } = await getEvents(searchParams);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Title
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Start at
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              End at
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Image
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Tags
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Speakers
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Status
            </th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {data.length > 0 ? (
            data.map((event) => (
              <tr key={event.slug}>
                <td className="whitespace-nowrap px-4 py-2 font-medium first-of-type:text-gray-900 text-gray-700">
                  {event.title}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {format(parseISO(event.start_at), "d/m/yyyy H:m")}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {format(parseISO(event.end_at), "d/m/yyyy H:m")}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {event.tags?.join(", ")}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {event.speakers?.join(", ")}
                </td>
                <td className="uppercase whitespace-nowrap px-4 py-2 text-gray-700">
                  {event.status}
                </td>
                <td className="whitespace-nowrap px-4 py-2 flex gap-4">
                  <AppLinkButton
                    href={`/dashboard/events/view/${event.slug}`}
                    className="inline-block text-xs"
                    innerSpanClassName="px-2"
                  >
                    View
                  </AppLinkButton>
                  <AppLinkButton
                    href={`/dashboard/events/update/${event.slug}`}
                    className="inline-block text-xs"
                    innerSpanClassName="px-2"
                  >
                    Edit
                  </AppLinkButton>
                  <AppButton className="inline-block text-xs px-2">
                    Delete
                  </AppButton>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={6}
                className="whitespace-nowrap px-4 py-2 text-gray-700"
              >
                No Events available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <TablePagination meta={meta} />
    </div>
  );
};

export default EventsTable;
