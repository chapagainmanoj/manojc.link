import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Mdx } from "./mdx";
import { Header } from "./article-header";
import { Navigation } from "./nav";
import { Footer } from "./footer";
import { ReportView } from "./view";
import { JsonLd, personSchema } from "./seo";
import { siteUrl } from "./site";
import "./mdx.css";

type Doc = {
	slug: string;
	title: string;
	description: string;
	date?: string;
	readingTime: number;
	published?: boolean;
	url?: string;
	repository?: string;
	type: string;
	body: { code: string };
};

type Props = {
	doc: Doc;
	all: Doc[];
	basePath: string;
};

export const PostPage: React.FC<Props> = ({ doc, all, basePath }) => {
	const ordered = all
		.filter((d) => d.published)
		.sort(
			(a, b) =>
				new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime(),
		);
	const index = ordered.findIndex((d) => d.slug === doc.slug);
	const newer = index > 0 ? ordered[index - 1] : undefined;
	const older = index >= 0 ? ordered[index + 1] : undefined;

	return (
		<div className="min-h-screen">
			<JsonLd
				data={{
					"@type": doc.type === "Blog" ? "BlogPosting" : "CreativeWork",
					headline: doc.title,
					description: doc.description,
					url: `${siteUrl}${basePath}/${doc.slug}`,
					mainEntityOfPage: `${siteUrl}${basePath}/${doc.slug}`,
					image: `${siteUrl}/og.png`,
					...(doc.date
						? { datePublished: new Date(doc.date).toISOString() }
						: {}),
					author: personSchema,
					...(doc.repository
						? { codeRepository: `https://github.com/${doc.repository}` }
						: {}),
				}}
			/>
			<Navigation progress />
			<ReportView slug={doc.slug} />
			<Header project={doc} />

			<article className="max-w-3xl px-6 pb-16 mx-auto prose prose-invert prose-zinc prose-quoteless md:prose-lg prose-headings:font-display prose-headings:tracking-tight prose-a:text-accent-200 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl animate-fade-up anim-delay-100">
				<Mdx code={doc.body.code} />
			</article>

			{newer || older ? (
				<nav
					aria-label="More posts"
					className="grid max-w-3xl grid-cols-1 gap-4 px-6 pb-24 mx-auto sm:grid-cols-2"
				>
					{older ? (
						<Link
							href={`${basePath}/${older.slug}`}
							className="p-5 duration-200 border group rounded-2xl border-zinc-800 bg-zinc-900/40 hover:border-zinc-600"
						>
							<span className="inline-flex items-center gap-1 text-xs text-zinc-500">
								<ArrowLeft size={14} /> Previous
							</span>
							<span className="block mt-2 font-display text-zinc-200 group-hover:text-white">
								{older.title}
							</span>
						</Link>
					) : (
						<span className="hidden sm:block" />
					)}
					{newer ? (
						<Link
							href={`${basePath}/${newer.slug}`}
							className="p-5 duration-200 border group rounded-2xl border-zinc-800 bg-zinc-900/40 hover:border-zinc-600 sm:text-right"
						>
							<span className="inline-flex items-center gap-1 text-xs text-zinc-500">
								Next <ArrowRight size={14} />
							</span>
							<span className="block mt-2 font-display text-zinc-200 group-hover:text-white">
								{newer.title}
							</span>
						</Link>
					) : null}
				</nav>
			) : null}

			<Footer />
		</div>
	);
};
