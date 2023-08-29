"use client";

import Link from "next/link";
import DashboardNav from "./DashboardNav";
import Image from "next/image";

type Props = { children: React.ReactNode };

const AppLayout = ({ children }: Props) => {
  return (
    <div>
      <DashboardNav />

      <div className="flex gap-8 h-[calc(100vh-56px)]">
        <div className="flex flex-col justify-between border-e bg-slate-200/50 w-96 shadow">
          <div className="px-4 py-6">
            <ul className="space-y-1">
              <li>
                <Link
                  href="/dashboard"
                  className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                >
                  Dashboard
                </Link>
              </li>

              <li>
                <details className="group [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                    <span className="text-sm font-medium"> Events </span>

                    <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </summary>

                  <ul className="mt-2 space-y-1 px-4">
                    <li>
                      <Link
                        href="/dashboard/events"
                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      >
                        List
                      </Link>
                    </li>

                    <li>
                      <Link
                        href="/dashboard/events/create"
                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      >
                        Create
                      </Link>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </div>

          <div className="sticky inset-x-0 bottom-0 border-t border-slate-100">
            <Link
              href="/dashboard/profile"
              className="flex items-center gap-2 bg-slate-200 p-4 hover:bg-slate-50"
            >
              <Image
                alt="Man"
                src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                className="h-10 w-10 rounded-full object-cover"
                width={40}
                height={40}
              />

              <div>
                <p className="text-xs">
                  <strong className="block font-medium">Eric Frusciante</strong>

                  <span> eric@frusciante.com </span>
                </p>
              </div>
            </Link>
          </div>
        </div>
        <main className="pt-8 pr-8 overflow-y-scroll w-full">{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;
