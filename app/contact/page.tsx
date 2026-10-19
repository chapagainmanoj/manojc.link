import {
	ArrowUpRight,
	Crown,
	Download,
	Github,
	Linkedin,
	Mail,
	Twitter,
} from "lucide-react";
import Link from "next/link";
import { Navigation } from "../components/nav";
import { Footer } from "../components/footer";
import { Card } from "../components/card";
import { CopyButton } from "../components/copy-button";
import PageShell from "../components/page-shell";
import { pageMetadata } from "../components/seo";

export const metadata = pageMetadata({
	title: "Contact",
	description:
		"Get in touch with Manoj Chapagain by email, GitHub, LinkedIn or X.",
	path: "/contact",
});

type Social = {
	icon: React.ReactNode;
	href: string;
	label: string;
	handle: string;
	/** Show a copy button instead of navigating (used for email). */
	copy?: boolean;
};

const socials: Social[] = [
	{
		icon: <Mail size={20} />,
		href: "mailto:chapagainmanoj35@gmail.com",
		label: "Email",
		handle: "chapagainmanoj35@gmail.com",
		copy: true,
	},
	{
		icon: <Github size={20} />,
		href: "https://github.com/chapagainmanoj",
		label: "GitHub",
		handle: "/chapagainmanoj",
	},
	{
		icon: <Linkedin size={20} />,
		href: "https://www.linkedin.com/in/chapagainmanoj/",
		label: "LinkedIn",
		handle: "/in/chapagainmanoj",
	},
	{
		icon: <Twitter size={20} />,
		href: "https://x.com/__man0j",
		label: "X / Twitter",
		handle: "@__man0j",
	},
	{
		icon: <Crown size={20} />,
		href: "https://lichess.org/@/imsober",
		label: "Lichess",
		handle: "@imsober",
	},
	{
		icon: <Download size={20} />,
		href: "/ManojChapagain-Resume.pdf",
		label: "Resume",
		handle: "Download PDF",
	},
];

export default function Contact() {
	return (
		<PageShell>
			<Navigation />
			<main className="max-w-6xl px-6 pt-32 pb-24 mx-auto lg:px-8 md:pt-40">
				<div className="max-w-2xl animate-fade-up">
					<p className="text-sm font-medium tracking-wide text-accent-300">
						Say hello
					</p>
					<h1 className="mt-2 text-4xl tracking-tight font-display text-zinc-50 sm:text-5xl">
						Let's talk
					</h1>
					<p className="mt-4 text-lg leading-8 text-zinc-400">
						Have a project in mind, a question, or just want to chat about
						code? Reach out on any of these. Email is the fastest way to get
						a reply.
					</p>
				</div>

				<div className="grid grid-cols-1 gap-6 mt-14 sm:grid-cols-2 lg:grid-cols-3 animate-fade-up anim-delay-100">
					{socials.map((s) => (
						<Card key={s.label}>
							<div className="relative h-full">
								<Link
									href={s.href}
									target={s.href.startsWith("http") ? "_blank" : undefined}
									rel="noopener noreferrer"
									className="flex items-center h-full gap-4 p-6 pr-16 rounded-2xl"
								>
									<span className="flex items-center justify-center w-12 h-12 duration-300 border rounded-xl shrink-0 text-zinc-300 border-zinc-700 bg-zinc-900 group-hover:text-accent-200 group-hover:border-accent-300/50">
										{s.icon}
									</span>
									<span className="flex flex-col min-w-0">
										<span className="text-xs font-medium tracking-wide uppercase text-zinc-500">
											{s.label}
										</span>
										<span className="mt-1 break-words">
											<Handle value={s.handle} />
										</span>
									</span>
								</Link>
								<span className="absolute -translate-y-1/2 right-5 top-1/2">
									{s.copy ? (
										<CopyButton
											value={s.handle}
											label={`Copy ${s.label.toLowerCase()} address`}
										/>
									) : (
										<ArrowUpRight
											size={18}
											aria-hidden="true"
											className="duration-200 pointer-events-none text-zinc-500 group-hover:text-accent-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
										/>
									)}
								</span>
							</div>
						</Card>
					))}
				</div>
			</main>
			<Footer />
		</PageShell>
	);
}

/** Lets long handles wrap after a "/" or before an email's "@", not mid-word. */
function Handle({ value }: { value: string }) {
	const parts = value.split(/(?<=\/)|(?=@)/).filter(Boolean);
	// Keep a leading "/" attached so it never sits alone on a line.
	if (parts[0] === "/" && parts.length > 1) parts.splice(0, 2, `/${parts[1]}`);
	return (
		<span className="text-lg font-display text-zinc-100 group-hover:text-white">
			{parts.map((part, i) => (
				<span key={`${i}-${part}`}>
					{i > 0 ? <wbr /> : null}
					{part}
				</span>
			))}
		</span>
	);
}
