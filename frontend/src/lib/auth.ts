import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import axios from "./axios";
import { apiRoutes } from "./api";
import { AxiosError } from "axios";

export const requireUser = async () => {
  const apiToken = cookies().get("apiToken")?.value;
  if (!apiToken) {
    redirect("/login");
  }
  try {
    return await getUser();
  } catch (error) {
    const err = error as AxiosError;

    console.log(err.response?.data);
    console.log(err.request?._header);

    // logout
    await axios.post(apiRoutes.auth.logout, null, {
      headers: { Authorization: `Bearer ${apiToken}` },
    });

    redirect("/login");
  }
};

export const getUser = async () => {
  const apiToken = cookies().get("apiToken")?.value;

  const user = await axios.get(apiRoutes.auth.user, {
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
  });

  return user.data as User;
};

export const redirectIfAuthenticated = async () => {
  try {
    const user = await getUser();
    redirect("/dashboard");
  } catch (error) {}
};
