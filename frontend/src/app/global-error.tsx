"use client";

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import AppButton from "~/components/AppButton";

export const metadata: Metadata = {
  title: "Unexpected Error",
};

const inter = Inter({ subsets: ["latin"] });

export default function GlobalErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div
          className={`${inter.className} grid h-screen px-4 bg-white place-content-center`}
        >
          <div className="text-center">
            <h1 className="font-black text-slate-300 text-8xl">
              Something went wrong
            </h1>

            <p className="my-4 text-gray-500">{error.message}</p>

            <AppButton onClick={() => reset()}>Try again</AppButton>
          </div>
        </div>
      </body>
    </html>
  );
}
