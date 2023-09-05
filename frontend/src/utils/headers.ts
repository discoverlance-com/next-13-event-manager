"use server";

import { headers } from "next/headers";

export const getUserDeviceIdentifier = () => {
  return (
    headers().get("sec-ch-ua-platform") + " - " + headers().get("user-agent")
  );
};
