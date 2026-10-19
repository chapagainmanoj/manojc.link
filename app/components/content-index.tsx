import { Navigation } from "./nav";
import { Footer } from "./footer";
import { Card } from "./card";
import { Article, Entry } from "./article";

type Props = {
	title: string;
	/** Heading for the section listing non-pinned entries, e.g. "More posts". */
	moreLabel: string;
	description: string;
	basePath: string;
	entries: (Entry & { published?: boolean })[];
	/** Slugs pinned to the top: first is the large featured card. */
	pinned: string[];
};

export const ContentIndex: React.FC<Props> = ({
	title,
	moreLabel,
	description,
	basePath,
	entries,
	pinned,
}) => {
	const published = entries.filter((e) => e.published);
	const top = pinned
		.map((slug) => published.find((e) => e.slug === slug))
		.filter((e): e is NonNullable<typeof e> => Boolean(e));
	const [featured, ...highlights] = top;
	const rest = published
		.filter((e) => !pinned.includes(e.slug))
		.sort(
			(a, b) =>
				new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
				new Date(a.date ?? Number.POSITIVE_INFINITY).getTime(),
		);

	return (
		<div className="relative">
			<Navigation />
			<main className="max-w-6xl px-6 pt-32 pb-24 mx-auto lg:px-8 md:pt-40">
				<div className="max-w-2xl animate-fade-up">
					<p className="text-sm font-medium tracking-wide text-accent-300">
						{published.length} {published.length === 1 ? "entry" : "entries"}
					</p>
					<h1 className="mt-2 text-4xl tracking-tight font-display text-zinc-50 sm:text-5xl">
						{title}
					</h1>
					<p className="mt-4 text-lg leading-8 text-zinc-400">{description}</p>
				</div>

				{featured ? (
					<div className="grid grid-cols-1 gap-6 mt-14 lg:grid-cols-2 animate-fade-up anim-delay-100">
						<Card>
							<Article
								entry={featured}
								href={`${basePath}/${featured.slug}`}
								featured
							/>
						</Card>
						<div className="flex flex-col gap-6">
							{highlights.map((entry) => (
								<Card key={entry.slug} className="flex-1">
									<Article entry={entry} href={`${basePath}/${entry.slug}`} />
								</Card>
							))}
						</div>
					</div>
				) : null}

				{rest.length ? (
					<section className="mt-20 animate-fade-up anim-delay-200">
						<div className="flex items-center gap-4 mb-6">
							<h2 className="text-sm font-medium tracking-wide uppercase text-zinc-500">
								{moreLabel}
							</h2>
							<div className="flex-1 h-px bg-zinc-800" />
						</div>
						<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
							{rest.map((entry) => (
								<Card key={entry.slug}>
									<Article entry={entry} href={`${basePath}/${entry.slug}`} />
								</Card>
							))}
						</div>
					</section>
				) : null}
			</main>
			<Footer />
		</div>
	);
};
