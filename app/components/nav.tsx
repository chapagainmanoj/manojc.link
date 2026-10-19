"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { navigation } from "./site";

type Props = {
	/** Show a reading progress bar along the bottom edge of the nav. */
	progress?: boolean;
};

export const Navigation: React.FC<Props> = ({ progress = false }) => {
	const pathname = usePathname() ?? "";
	const [scrolled, setScrolled] = useState(false);
	const [readProgress, setReadProgress] = useState(0);

	useEffect(() => {
		const onScroll = () => {
			setScrolled(window.scrollY > 8);
			if (progress) {
				const max =
					document.documentElement.scrollHeight - window.innerHeight;
				setReadProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
			}
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, [progress]);

	return (
		<header
			className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
				scrolled
					? "bg-black/60 backdrop-blur-md border-zinc-800/80"
					: "bg-transparent border-transparent"
			}`}
		>
			<nav className="flex items-center justify-between max-w-6xl px-6 py-4 mx-auto lg:px-8">
				<Link
					href="/"
					className="text-lg tracking-tight duration-200 font-display text-zinc-100 hover:text-white"
				>
					manojc<span className="text-accent-300">.</span>link
				</Link>
				<ul className="flex items-center gap-1 text-sm sm:gap-2">
					{navigation.map((item) => {
						const active = pathname.startsWith(item.href);
						return (
							<li key={item.href}>
								<Link
									href={item.href}
									aria-current={active ? "page" : undefined}
									className={`relative px-3 py-1.5 rounded-full duration-200 ${
										active
											? "text-white bg-zinc-800/80"
											: "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/40"
									}`}
								>
									{item.name}
								</Link>
							</li>
						);
					})}
				</ul>
			</nav>
			{progress ? (
				<div
					aria-hidden="true"
					className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-accent-500 via-accent-300 to-accent-100"
					style={{ width: `${readProgress * 100}%` }}
				/>
			) : null}
		</header>
	);
};
