"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import AppLinkButton from "~/components/AppLinkButton";

import { cn } from "~/lib/utils";

const DashboardNav = () => {
  const pathname = usePathname();

  const isActiveLink = (href: string) => href === pathname;

  return (
    <nav
      role="navigation"
      className="bg-slate-200/50 shadow w-full h-14 flex items-center px-6 justify-between"
    >
      <ul className="flex gap-6">
        <li>
          <Link
            href="/dashboard"
            className={cn(
              "text-gray-700 px-3 py-2 transition-all duration-300"
            )}
            aria-current={isActiveLink("/dashboard")}
          >
            Dashboard
          </Link>
        </li>
      </ul>

      <div>
        <input
          type="search"
          id="search"
          name="search"
          placeholder="Search events..."
          className="mt-1 w-72 rounded-md border-slate-400 bg-white text-sm text-gray-700 shadow-sm"
        />
      </div>

      <div className="flex gap-4 items-center">
        <form method="POST" action="/api/dashboard/logout">
          <AppLinkButton href="/login">Logout</AppLinkButton>
        </form>
      </div>
    </nav>
  );
};

export default DashboardNav;
