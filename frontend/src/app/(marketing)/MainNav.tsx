"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import AppButton from "~/components/AppButton";
import AppLinkButton from "~/components/AppLinkButton";

import { cn } from "~/lib/utils";

const MainNav = () => {
  const pathname = usePathname();
  const router = useRouter();

  const isActiveLink = (href: string) => href === pathname;

  return (
    <nav
      role="navigation"
      className="bg-slate-200/50 shadow w-full h-14 flex items-center px-6 justify-between"
    >
      <ul className="flex gap-6">
        <li>
          <Link
            href="/"
            className={cn(
              "text-gray-700 px-3 py-2 transition-all duration-300",
              {
                "bg-slate-400  text-white rounded-lg": isActiveLink("/"),
              }
            )}
            aria-current={isActiveLink("/")}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className={cn(
              "text-gray-700 px-3 py-2 transition-all duration-300",
              {
                "bg-slate-400  text-white rounded-lg": isActiveLink("/about"),
              }
            )}
            aria-current={isActiveLink("/about")}
          >
            About
          </Link>
        </li>
      </ul>

      <div className="flex gap-4 items-center">
        <AppLinkButton href="/login">Login</AppLinkButton>
        <AppButton onClick={() => router.push("/register")}>Register</AppButton>
      </div>
    </nav>
  );
};

export default MainNav;
