"use client";

import { useCreateQueryString } from "~/hooks/useCreateQueryString";
import { cn } from "~/lib/utils";

type Props = {
  meta: EventResponse["meta"];
};

const TablePagination = ({ meta }: Props) => {
  const createQueryString = useCreateQueryString();

  const previousPage = meta?.links?.filter((link) =>
    link.label.includes("Previous")
  )[0];

  const nextPage = meta?.links?.filter((link) =>
    link.label.includes("Next")
  )[0];

  return (
    <div>
      <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6 mt-8">
        <div className="flex flex-1 justify-between sm:hidden">
          {previousPage && previousPage.url ? (
            <a
              href={createQueryString([
                {
                  name: "page",
                  value:
                    new URL(previousPage.url!).searchParams.get("page") ?? "",
                },
              ])}
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <span dangerouslySetInnerHTML={{ __html: previousPage.label }} />
            </a>
          ) : null}

          {nextPage && nextPage.url ? (
            <a
              href={createQueryString([
                {
                  name: "page",
                  value: new URL(nextPage.url!).searchParams.get("page") ?? "",
                },
              ])}
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <span dangerouslySetInnerHTML={{ __html: nextPage.label }} />
            </a>
          ) : null}
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            {meta?.total && meta.total > 0 ? (
              <p className="text-sm text-gray-700 transition duration-300">
                Showing <span className="font-medium">{meta?.from}</span> to{" "}
                <span className="font-medium">{meta?.to}</span> of{" "}
                <span className="font-medium">{meta?.total}</span> results
              </p>
            ) : (
              ""
            )}
          </div>
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              {meta?.links && meta.links.length > 0
                ? meta.links
                    .filter((link) => link.url !== null)
                    .map((link) => (
                      <a
                        href={createQueryString([
                          {
                            name: "page",
                            value:
                              link.label.includes("Next") ||
                              link.label.includes("Previous")
                                ? new URL(link.url!).searchParams.get("page") ??
                                  ""
                                : link.label,
                          },
                        ])}
                        key={link.label}
                        aria-current={link.active}
                        className={cn(
                          "relative items-center px-4 py-2 text-sm font-semibold focus:z-20",
                          {
                            "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0":
                              !link.active,
                            "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600":
                              link.active,
                            "inline-flex":
                              link.label.includes("Previous") ||
                              link.label.includes("Next"),
                            "hidden md:inline-flex first-of-type:inline-flex":
                              !link.label.includes("Previous") &&
                              !link.label.includes("Next"),
                          }
                        )}
                      >
                        <span
                          dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                      </a>
                    ))
                : null}

              {/* <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                ...
              </span> */}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TablePagination;
