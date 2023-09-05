"use server";

import { cookies } from "next/headers";
import { apiRoutes } from "~/lib/api";
import axios from "~/lib/axios";

export async function logoutAction(formData: FormData) {
  const apiToken = cookies().get("apiToken")?.value;

  await axios.post(apiRoutes.auth.logout, null, {
    headers: { Authorization: `Bearer ${apiToken}` },
  });

  cookies().delete("apiToken");
}
