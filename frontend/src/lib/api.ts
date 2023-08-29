export const apiRoutes = {
  events: process.env.NEXT_PUBLIC_BACKEND_URL + "/api/events",
  viewEvent: (slug: string) =>
    process.env.NEXT_PUBLIC_BACKEND_URL + "/api/events/" + slug,
  login: process.env.NEXT_PUBLIC_BACKEND_URL + "/login",
  register: process.env.NEXT_PUBLIC_BACKEND_URL + "/register",
  csRfToken: process.env.NEXT_PUBLIC_BACKEND_URL + "/sanctum/csrf-token",
  auth: {
    events: {
      myEvents: process.env.NEXT_PUBLIC_BACKEND_URL + "/api/events/my-events",
      create: process.env.NEXT_PUBLIC_BACKEND_URL + "/api/events",
      edit: (slug: string) =>
        process.env.NEXT_PUBLIC_BACKEND_URL + "/api/events/" + slug,
      view: (slug: string) =>
        process.env.NEXT_PUBLIC_BACKEND_URL + "/api/events/" + slug,
      delete: (slug: string) =>
        process.env.NEXT_PUBLIC_BACKEND_URL + "/api/events/" + slug,
      stats: process.env.NEXT_PUBLIC_BACKEND_URL + "/api/events/stats",
    },
  },
};

export const fetchWithCredentials = (
  input: RequestInfo | URL,
  init?: RequestInit | undefined
) => fetch(input, { ...init, credentials: "include" });

export const csrfRequest = () => fetchWithCredentials(apiRoutes.csRfToken);
