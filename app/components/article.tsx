import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatDate } from "./site";

export type Entry = {
	slug: string;
	title: string;
	description: string;
	date?: string;
	readingTime: number;
	repository?: string;
};

type Props = {
	entry: Entry;
	href: string;
	featured?: boolean;
};

export const Meta: React.FC<{ entry: Entry }> = ({ entry }) => (
	<div className="flex items-center gap-2 text-xs text-zinc-500">
		{entry.date ? (
			<time dateTime={new Date(entry.date).toISOString()}>
				{formatDate(entry.date)}
			</time>
		) : (
			<span>SOON</span>
		)}
		<span aria-hidden="true">·</span>
		<span>{entry.readingTime} min read</span>
	</div>
);

export const Article: React.FC<Props> = ({ entry, href, featured = false }) => {
	return (
		<Link href={href} className="block h-full rounded-2xl">
			<article
				className={`flex flex-col h-full ${featured ? "p-6 md:p-10" : "p-6"}`}
			>
				<div className="flex items-center justify-between gap-2">
					<Meta entry={entry} />
					{featured ? (
						<span className="px-2.5 py-0.5 text-[11px] font-medium tracking-wide uppercase rounded-full text-accent-200 bg-accent-400/10 ring-1 ring-inset ring-accent-300/20">
							Featured
						</span>
					) : null}
				</div>
				<h2
					className={`mt-4 font-display tracking-tight text-zinc-100 duration-200 group-hover:text-white ${
						featured ? "text-3xl sm:text-4xl leading-tight" : "text-xl"
					}`}
				>
					{entry.title}
				</h2>
				<p
					className={`mt-3 text-zinc-400 duration-200 group-hover:text-zinc-300 ${
						featured ? "text-base leading-7" : "text-sm leading-6 line-clamp-3"
					}`}
				>
					{entry.description}
				</p>
				<span
					className={`inline-flex items-center gap-1 text-sm font-medium text-zinc-300 duration-200 group-hover:text-accent-200 ${
						featured ? "mt-auto pt-8" : "mt-auto pt-5"
					}`}
				>
					Read more
					<ArrowUpRight
						size={16}
						className="duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
					/>
				</span>
			</article>
		</Link>
	);
};
