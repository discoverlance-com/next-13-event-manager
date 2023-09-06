"use client";

import { Metadata } from "next";
import AppButton from "~/components/AppButton";

export const metadata: Metadata = {
  title: "Not Found",
};

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="grid h-screen px-4 bg-white place-content-center">
      <div className="text-center">
        <h1 className="font-black text-slate-300 text-9xl">Error</h1>

        <p className="text-2xl font-bold tracking-tight text-gray-700 sm:text-4xl">
          Uh-oh!
        </p>

        <p className="my-4 text-gray-500">{error.message}</p>

        <div className="flex justify-center">
          <AppButton onClick={() => reset()}>Try again</AppButton>
        </div>
      </div>
    </div>
  );
}
