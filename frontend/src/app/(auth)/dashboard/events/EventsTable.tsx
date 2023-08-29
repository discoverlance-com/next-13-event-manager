import AppButton from "~/components/AppButton";
import AppLinkButton from "~/components/AppLinkButton";
import TablePagination from "./TablePagination";

const EventsTable = () => {
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
          <tr>
            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              John Doe
            </td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
              24/05/1995
            </td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
              24/06/1995
            </td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">Image</td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
              computer, ghana
            </td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
              lance, armah
            </td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
              PUBLISHED
            </td>
            <td className="whitespace-nowrap px-4 py-2 flex gap-4">
              <AppLinkButton
                href="/dashboard/events/view/1"
                className="inline-block text-xs"
                innerSpanClassName="px-2"
              >
                View
              </AppLinkButton>
              <AppLinkButton
                href="/dashboard/events/edit/1"
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
        </tbody>
      </table>

      <TablePagination />
    </div>
  );
};

export default EventsTable;
