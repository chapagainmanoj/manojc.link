import "../global.css";
import { Inter } from "@next/font/google";
import LocalFont from "@next/font/local";
import { Metadata } from "next";
import { Analytics } from "./components/analytics";
import { pageMetadata } from "./components/seo";
import { author, siteDescription, siteUrl } from "./components/site";

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: {
		default: `${author.name} · ${author.jobTitle}`,
		template: `%s | ${author.name}`,
	},
	applicationName: "manojc.link",
	authors: [{ name: author.name, url: siteUrl }],
	creator: author.name,
	verification: { google: "wkjj30wMlw0Z7xi2K6shlw_3BFHau8e6r78_oKRSOV8" },
	keywords: [
		"Manoj Chapagain",
		"software engineer",
		"full-stack developer",
		"Python",
		"TypeScript",
		"React",
		"AI",
		"open source",
		"tech blog",
	],
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	themeColor: "#000000",
	manifest: "/manifest.webmanifest",
	...pageMetadata({ description: siteDescription, path: "/" }),
	// Canonical URLs are set per page; inheriting "/" would be wrong elsewhere.
	alternates: undefined,
};
const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

const calSans = LocalFont({
	src: "../public/fonts/CalSans-SemiBold.ttf",
	variable: "--font-calsans",
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={[inter.variable, calSans.variable].join(" ")}>
			<head>
				<Analytics />
			</head>
			<body
				className={`bg-black ${
					process.env.NODE_ENV === "development" ? "debug-screens" : ""
				}`}
			>
				{children}
			</body>
		</html>
	);
}
