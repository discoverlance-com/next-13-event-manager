"use server";

import { cookies } from "next/headers";
import { apiRoutes } from "~/lib/api";
import axios from "~/lib/axios";

export const parseCookie = (str: string) =>
  str
    .split("; ")
    .map((v) => v.split("="))
    .reduce((acc, v) => {
      if (v[0] === "httponly") {
        v[1] = "true";
      }
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      return acc;
    }, {} as Record<string, string>);

export const setCsrfCookie = async () => {
  // set csrf token
  const csrf = await axios.get(apiRoutes.csRfCookie);

  return setCookiesFromHeader(csrf.headers["set-cookie"]);
};

export const setCookiesFromHeader = (data: string[] | undefined) => {
  if (data) {
    const cookiesResponse: Array<Record<string, string>> = [];
    for (const cookie of data) {
      const information = parseCookie(cookie);

      const name = Object.keys(information)[0];
      const value = Object.values(information)[0];
      const expires = information.expires
        ? new Date(information.expires)
        : new Date().setHours(new Date().getHours() + 2);
      cookies().set(name, value, {
        expires: expires,
        path: information.path,
        maxAge: Number(information.maxAge),
        sameSite: "strict",
        httpOnly: true,
      });

      cookiesResponse.push(information);
    }
    return cookiesResponse;
  }
};

export const setApiTokenCookie = (value: string) => {
  cookies().set("apiToken", value, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV == "production",
    expires: new Date().setHours(new Date().getHours() + 3),
  });
};
