import type { Metadata } from "next";
import { author, siteUrl } from "./site";

const ogImage = { url: `${siteUrl}/og.png`, width: 1200, height: 630, alt: "manojc.link" };

/**
 * Per-page metadata. Next replaces (not merges) nested objects like
 * `openGraph`, so every page sets the full set here.
 */
export function pageMetadata({
	title,
	description,
	path,
	type = "website",
	publishedTime,
}: {
	title?: string;
	description: string;
	path: string;
	type?: "website" | "article";
	publishedTime?: string;
}): Metadata {
	return {
		...(title ? { title } : {}),
		description,
		alternates: { canonical: path },
		openGraph: {
			type,
			url: path,
			siteName: "manojc.link",
			locale: "en_US",
			title: title ?? `${author.name} · ${author.jobTitle}`,
			description,
			images: [ogImage],
			...(type === "article" && publishedTime
				? { publishedTime, authors: [author.name] }
				: {}),
		},
		twitter: {
			card: "summary_large_image",
			site: author.twitter,
			creator: author.twitter,
			title: title ?? `${author.name} · ${author.jobTitle}`,
			description,
			images: [ogImage.url],
		},
	};
}

/** Renders a schema.org JSON-LD block for search engines. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
	return (
		<script
			type="application/ld+json"
			// biome-ignore lint: JSON-LD must be injected as raw JSON
			dangerouslySetInnerHTML={{
				__html: JSON.stringify({ "@context": "https://schema.org", ...data }),
			}}
		/>
	);
}

export const personSchema = {
	"@type": "Person",
	name: author.name,
	url: siteUrl,
	jobTitle: author.jobTitle,
	sameAs: author.sameAs,
};
