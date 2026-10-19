import Link from "next/link";
import React from "react";
import { ArrowRight, Github, Linkedin, Mail, Twitter } from "lucide-react";
import { allBlogs } from "contentlayer/generated";
import Particles from "./components/particles";
import { navigation, siteDescription, siteUrl } from "./components/site";
import { JsonLd, pageMetadata, personSchema } from "./components/seo";

export const metadata = pageMetadata({ description: siteDescription, path: "/" });

const socials = [
	{ label: "GitHub", href: "https://github.com/chapagainmanoj", icon: Github },
	{
		label: "LinkedIn",
		href: "https://www.linkedin.com/in/chapagainmanoj/",
		icon: Linkedin,
	},
	{ label: "X / Twitter", href: "https://x.com/__man0j", icon: Twitter },
	{ label: "Email", href: "mailto:chapagainmanoj35@gmail.com", icon: Mail },
];

export default function Home() {
	const latest = allBlogs
		.filter((p) => p.published)
		.sort(
			(a, b) =>
				new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime(),
		)[0];

	return (
		<div className="relative flex flex-col items-center justify-center w-full min-h-screen px-6 py-24 overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
			<JsonLd
				data={{
					"@type": "WebSite",
					name: "manojc.link",
					url: siteUrl,
					author: personSchema,
				}}
			/>
			<JsonLd data={personSchema} />
			<div aria-hidden="true" className="absolute inset-0 pointer-events-none">
				<div className="absolute left-[15%] top-[20%] h-[420px] w-[620px] rounded-full bg-accent-400/10 blur-[120px] animate-drift" />
				<div className="absolute right-[10%] bottom-[15%] h-[380px] w-[560px] rounded-full bg-indigo-500/15 blur-[120px] animate-drift-reverse" />
			</div>
			<Particles className="absolute inset-0 animate-fade-in-fast" />
			<div
				aria-hidden="true"
				className="absolute inset-0 pointer-events-none bg-grain opacity-[0.06] mix-blend-overlay"
			/>

			<nav className="relative z-10 animate-fade-up">
				<ul className="flex items-center justify-center gap-6 text-sm">
					{navigation.map((item) => (
						<li key={item.href}>
							<Link
								href={item.href}
								className="duration-300 text-zinc-400 hover:text-zinc-100"
							>
								{item.name}
							</Link>
						</li>
					))}
				</ul>
			</nav>

			<div className="relative z-10 w-full text-center my-12 md:my-14">
				<div className="hidden w-full h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
				<h1 className="py-2 text-5xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-7xl md:text-9xl whitespace-nowrap bg-clip-text">
					manojc.link
				</h1>
				<div className="hidden w-full h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
			</div>

			<div className="relative z-10 flex flex-col items-center w-full max-w-xl text-center">
				<p className="text-base leading-7 text-zinc-400 animate-fade-up anim-delay-500 text-balance">
					<span className="block mb-2 text-lg text-zinc-200">
						Hey people 👋
					</span>
					I code for a living and for fun. I have a special love for{" "}
					<Ext>.py</Ext> <Ext>.ts</Ext> <Ext>.tsx</Ext> <Ext>.sh</Ext>{" "}
					<Ext>.yaml</Ext> and <Ext>.git*</Ext> files. Let's build something
					amazing together.
				</p>

				<div className="flex flex-wrap items-center justify-center gap-3 mt-8 animate-fade-up anim-delay-700">
					<Link
						href="/projects"
						className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-black duration-200 rounded-full bg-zinc-100 hover:bg-white group"
					>
						See my work
						<ArrowRight
							size={16}
							className="duration-200 group-hover:translate-x-0.5"
						/>
					</Link>
					<Link
						href="/contact"
						className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium duration-200 border rounded-full text-zinc-200 border-zinc-700 bg-black/40 hover:border-zinc-500 hover:text-white"
					>
						Get in touch
					</Link>
				</div>

				<ul className="flex items-center gap-2 mt-8 animate-fade-up anim-delay-700">
					{socials.map(({ label, href, icon: Icon }) => (
						<li key={label}>
							<Link
								href={href}
								target={href.startsWith("http") ? "_blank" : undefined}
								rel="noopener noreferrer"
								aria-label={label}
								title={label}
								className="flex items-center justify-center duration-200 rounded-full w-9 h-9 text-zinc-500 hover:text-accent-200 hover:bg-zinc-800/60"
							>
								<Icon size={18} />
							</Link>
						</li>
					))}
				</ul>

				{latest ? (
					<Link
						href={`/blog/${latest.slug}`}
						className="inline-flex items-center max-w-full gap-2 py-1 pl-1 pr-3 mt-10 text-xs duration-200 border rounded-full border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200 animate-fade-up anim-delay-700 group"
					>
						<span className="shrink-0 px-2 py-0.5 rounded-full bg-accent-400/15 text-accent-200 font-medium">
							Latest
						</span>
						<span className="truncate">{latest.title}</span>
						<ArrowRight
							size={14}
							className="duration-200 shrink-0 group-hover:translate-x-0.5"
						/>
					</Link>
				) : null}
			</div>
		</div>
	);
}

function Ext({ children }: { children: React.ReactNode }) {
	return (
		<code className="px-1.5 py-0.5 font-mono text-[0.85em] rounded-md bg-zinc-800/70 text-zinc-300">
			{children}
		</code>
	);
}
