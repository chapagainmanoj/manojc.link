import Link from "next/link";
import { socials } from "./site";

export const Footer: React.FC = () => {
	return (
		<footer className="border-t border-zinc-800/80">
			<div className="flex flex-col items-center justify-between max-w-6xl gap-4 px-6 py-10 mx-auto text-sm sm:flex-row lg:px-8">
				<p className="text-zinc-500">
					© {new Date().getFullYear()} Manoj Chapagain
				</p>
				<ul className="flex items-center gap-5">
					{socials.map((s) => (
						<li key={s.label}>
							<Link
								href={s.href}
								target={s.href.startsWith("http") ? "_blank" : undefined}
								rel="noopener noreferrer"
								className="duration-200 text-zinc-500 hover:text-accent-200"
							>
								{s.label}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</footer>
	);
};
