import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: process.env.NEXT_PUBLIC_APP_URL!,
      lastModified: "2023-08-10T21:39:49.783Z",
    },
    {
      url: process.env.NEXT_PUBLIC_APP_URL! + "/about",
      lastModified: "2023-08-10T21:39:49.783Z",
    },
    {
      url: process.env.NEXT_PUBLIC_APP_URL! + "/events",
      lastModified: "2023-08-10T21:39:49.783Z",
    },
  ];
}
