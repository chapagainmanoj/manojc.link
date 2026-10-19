"use client";
import { motion, useMotionTemplate, useSpring } from "framer-motion";

import { MouseEvent, PropsWithChildren } from "react";

export const Card: React.FC<PropsWithChildren<{ className?: string }>> = ({
	children,
	className = "",
}) => {
	const mouseX = useSpring(0, { stiffness: 500, damping: 100 });
	const mouseY = useSpring(0, { stiffness: 500, damping: 100 });

	function onMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
		const { left, top } = currentTarget.getBoundingClientRect();
		mouseX.set(clientX - left);
		mouseY.set(clientY - top);
	}
	const background = useMotionTemplate`radial-gradient(320px circle at ${mouseX}px ${mouseY}px, rgba(252, 183, 77, 0.10), transparent 80%)`;

	return (
		<div
			onMouseMove={onMouseMove}
			className={`group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 transition duration-300 hover:-translate-y-0.5 hover:border-zinc-600 hover:bg-zinc-900/70 focus-within:border-zinc-600 ${className}`}
		>
			<motion.div
				aria-hidden="true"
				className="absolute inset-0 transition duration-300 opacity-0 pointer-events-none group-hover:opacity-100"
				style={{ background }}
			/>
			<div className="relative h-full">{children}</div>
		</div>
	);
};
