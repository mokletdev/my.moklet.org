import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const conventionalRoutes = ["/", "/records"];

  return [
    {
      url: `https://my.moklet.org/`,
      changeFrequency: "yearly",
      lastModified: new Date().toISOString(),
      priority: 1,
    },
    {
      url: `https://my.moklet.org/records`,
      changeFrequency: "daily",
      lastModified: new Date().toISOString(),
      priority: 0.8,
    },
  ];
}
