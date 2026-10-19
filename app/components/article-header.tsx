import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import Link from "next/link";
import React from "react";
import { formatDate } from "./site";

type Props = {
	project: {
		url?: string;
		title: string;
		description: string;
		repository?: string;
		date?: string;
		readingTime: number;
		type?: string;
	};
};

export const Header: React.FC<Props> = ({ project }) => {
	const isBlog = project.type === "Blog";
	const links: { label: string; href: string; icon: React.ReactNode }[] = [];
	if (project.repository) {
		links.push({
			label: "View on GitHub",
			href: `https://github.com/${project.repository}`,
			icon: <Github size={16} />,
		});
	}
	if (project.url) {
		links.push({
			label: "Visit website",
			href: project.url,
			icon: <ArrowUpRight size={16} />,
		});
	}

	return (
		<header className="max-w-3xl px-6 pt-32 pb-8 mx-auto md:pt-40 animate-fade-up">
			<Link
				href={isBlog ? "/blog" : "/projects"}
				className="inline-flex items-center gap-1.5 text-sm duration-200 text-zinc-400 hover:text-accent-200 group"
			>
				<ArrowLeft
					size={16}
					className="duration-200 group-hover:-translate-x-0.5"
				/>
				{isBlog ? "All posts" : "All projects"}
			</Link>

			<div className="flex items-center gap-2 mt-10 text-sm text-zinc-500">
				{project.date ? (
					<time dateTime={new Date(project.date).toISOString()}>
						{formatDate(project.date)}
					</time>
				) : null}
				{project.date ? <span aria-hidden="true">·</span> : null}
				<span>{project.readingTime} min read</span>
			</div>

			<h1 className="mt-4 text-4xl leading-[1.1] tracking-tight text-white sm:text-5xl font-display text-balance">
				{project.title}
			</h1>
			<p className="mt-6 text-lg leading-8 text-zinc-400">
				{project.description}
			</p>

			{links.length ? (
				<div className="flex flex-wrap gap-3 mt-8">
					{links.map((link) => (
						<Link
							key={link.label}
							target="_blank"
							rel="noopener noreferrer"
							href={link.href}
							className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium duration-200 border rounded-full text-zinc-200 border-zinc-700 bg-zinc-900/60 hover:border-accent-300/60 hover:text-white"
						>
							{link.icon}
							{link.label}
						</Link>
					))}
				</div>
			) : null}

			<div className="h-px mt-12 bg-gradient-to-r from-zinc-700 via-zinc-800 to-transparent" />
		</header>
	);
};
