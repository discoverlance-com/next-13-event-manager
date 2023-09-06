"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

type Params = { name: string; value: string };

export const useCreateQueryString = () => {
  const searchParams = useSearchParams()!;
  const pathname = usePathname();

  const createQueryString = useCallback(
    (search: Array<Params>) => {
      const params = new URLSearchParams(searchParams);
      search.forEach(({ name, value }) => {
        params.set(name, value);
      });

      return pathname + "?" + params.toString();
    },
    [searchParams]
  );

  return createQueryString;
};
