import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Lipsita Samal — Portfolio",
    short_name: "Lipsita",
    description: "Software Developer Portfolio",
    start_url: "/",
    display: "standalone",
    background_color: "#0B1120",
    theme_color: "#3B82F6",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
