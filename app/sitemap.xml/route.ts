import { allBlogs, allProjects } from "contentlayer/generated";
import { siteUrl } from "../components/site";

// A route handler instead of app/sitemap.ts: Next 13.5 can't statically
// export the sitemap.ts metadata route with `output: "export"`.
export const dynamic = "force-static";

type Entry = { path: string; lastModified?: string; priority: number };

export function GET() {
	const pages: Entry[] = ["", "/blog", "/projects", "/contact"].map(
		(path) => ({ path, priority: path === "" ? 1 : 0.8 }),
	);
	const content: Entry[] = [
		...allBlogs.map((d) => ({ ...d, base: "/blog" })),
		...allProjects.map((d) => ({ ...d, base: "/projects" })),
	]
		.filter((d) => d.published)
		.map((d) => ({
			path: `${d.base}/${d.slug}`,
			lastModified: d.date,
			priority: 0.7,
		}));
	const files: Entry[] = [{ path: "/ManojChapagain-Resume.pdf", priority: 0.6 }];

	const urls = [...pages, ...content, ...files]
		.map(
			(e) =>
				`  <url>\n    <loc>${siteUrl}${e.path}</loc>\n${
					e.lastModified
						? `    <lastmod>${new Date(e.lastModified).toISOString()}</lastmod>\n`
						: ""
				}    <priority>${e.priority}</priority>\n  </url>`,
		)
		.join("\n");

	return new Response(
		`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
		{ headers: { "Content-Type": "application/xml" } },
	);
}
