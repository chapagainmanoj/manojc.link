import type { MetadataRoute } from "next";
import { author, siteDescription } from "./components/site";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: `${author.name} · ${author.jobTitle}`,
		short_name: "manojc.link",
		description: siteDescription,
		start_url: "/",
		display: "standalone",
		background_color: "#000000",
		theme_color: "#000000",
		icons: [
			{ src: "/icon-192.png", sizes: "192x192", type: "image/png" },
			{ src: "/icon-512.png", sizes: "512x512", type: "image/png" },
		],
	};
}
