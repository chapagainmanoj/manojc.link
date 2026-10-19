"use client";

import React, { useEffect, useRef } from "react";

interface ParticlesProps {
	className?: string;
	/** Screen area (px²) per star; lower means more stars. */
	density?: number;
	/** How strongly stars follow the mouse; higher is calmer. */
	staticity?: number;
	ease?: number;
	shootingStars?: boolean;
}

type Star = {
	x: number;
	y: number;
	/** Depth from 0 (far) to 1 (near): drives size, drift and parallax. */
	z: number;
	size: number;
	alpha: number;
	twinkleSpeed: number;
	twinklePhase: number;
	color: string;
	dx: number;
	dy: number;
	translateX: number;
	translateY: number;
};

type ShootingStar = {
	x: number;
	y: number;
	vx: number;
	vy: number;
	length: number;
	life: number;
	maxLife: number;
};

// Mostly white, with a few warm (matches the accent) and cool stars.
const pickColor = () => {
	const r = Math.random();
	if (r < 0.15) return "255, 214, 170";
	if (r < 0.25) return "190, 210, 255";
	return "255, 255, 255";
};

export default function Particles({
	className = "",
	density = 4500,
	staticity = 50,
	ease = 80,
	shootingStars = true,
}: ParticlesProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const container = containerRef.current;
		const ctx = canvas?.getContext("2d");
		if (!canvas || !container || !ctx) return;

		const reduceMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		const size = { w: 0, h: 0 };
		const mouse = { x: 0, y: 0 };
		let stars: Star[] = [];
		let shooting: ShootingStar | null = null;
		let nextShootingAt = performance.now() + 4000 + Math.random() * 6000;
		let frame: number | undefined;
		let visible = true;

		const createStar = (): Star => {
			// Steep power curve: almost all stars are tiny and far, very few are big.
			const z = Math.pow(Math.random(), 6);
			return {
				x: Math.random() * size.w,
				y: Math.random() * size.h,
				z,
				size: 0.3 + z * 1.5,
				alpha: 0.25 + z * 0.6 + Math.random() * 0.15,
				twinkleSpeed: 0.0003 + Math.random() * 0.0009,
				twinklePhase: Math.random() * Math.PI * 2,
				color: pickColor(),
				dx: (Math.random() - 0.5) * (0.02 + z * 0.06),
				dy: (Math.random() - 0.5) * (0.02 + z * 0.06),
				translateX: 0,
				translateY: 0,
			};
		};

		const resize = () => {
			const dpr = window.devicePixelRatio || 1;
			size.w = container.offsetWidth;
			size.h = container.offsetHeight;
			canvas.width = size.w * dpr;
			canvas.height = size.h * dpr;
			canvas.style.width = `${size.w}px`;
			canvas.style.height = `${size.h}px`;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			const count = Math.min(
				320,
				Math.max(60, Math.round((size.w * size.h) / density)),
			);
			stars = Array.from({ length: count }, createStar);
		};

		const drawStar = (star: Star, alpha: number) => {
			const x = star.x + star.translateX;
			const y = star.y + star.translateY;
			// Soft halo on the nearest, brightest stars.
			if (star.z > 0.7) {
				const r = star.size * 4;
				const glow = ctx.createRadialGradient(x, y, 0, x, y, r);
				glow.addColorStop(0, `rgba(${star.color}, ${alpha * 0.35})`);
				glow.addColorStop(1, `rgba(${star.color}, 0)`);
				ctx.fillStyle = glow;
				ctx.beginPath();
				ctx.arc(x, y, r, 0, Math.PI * 2);
				ctx.fill();
			}
			ctx.fillStyle = `rgba(${star.color}, ${alpha})`;
			ctx.beginPath();
			ctx.arc(x, y, star.size, 0, Math.PI * 2);
			ctx.fill();
		};

		const drawShootingStar = (s: ShootingStar) => {
			const progress = s.life / s.maxLife;
			// Fade in quickly, fade out slowly.
			const alpha = Math.min(1, progress * 6) * (1 - progress);
			const speed = Math.hypot(s.vx, s.vy);
			const tailX = s.x - (s.vx / speed) * s.length;
			const tailY = s.y - (s.vy / speed) * s.length;
			const trail = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
			trail.addColorStop(0, `rgba(255, 240, 220, ${alpha})`);
			trail.addColorStop(1, "rgba(255, 240, 220, 0)");
			ctx.strokeStyle = trail;
			ctx.lineWidth = 1.2;
			ctx.lineCap = "round";
			ctx.beginPath();
			ctx.moveTo(s.x, s.y);
			ctx.lineTo(tailX, tailY);
			ctx.stroke();
		};

		const spawnShootingStar = (): ShootingStar => {
			const angle = (Math.PI / 180) * (20 + Math.random() * 25);
			const speed = 9 + Math.random() * 5;
			const dir = Math.random() < 0.5 ? 1 : -1;
			return {
				x: size.w * (dir > 0 ? Math.random() * 0.6 : 0.4 + Math.random() * 0.6),
				y: Math.random() * size.h * 0.4,
				vx: Math.cos(angle) * speed * dir,
				vy: Math.sin(angle) * speed,
				length: 80 + Math.random() * 80,
				life: 0,
				maxLife: 50 + Math.random() * 25,
			};
		};

		const render = (time: number) => {
			ctx.clearRect(0, 0, size.w, size.h);
			for (const star of stars) {
				if (!reduceMotion) {
					star.x += star.dx;
					star.y += star.dy;
					// Wrap around the edges instead of popping in new stars.
					if (star.x < -10) star.x = size.w + 10;
					if (star.x > size.w + 10) star.x = -10;
					if (star.y < -10) star.y = size.h + 10;
					if (star.y > size.h + 10) star.y = -10;
					// Parallax: near stars follow the mouse more than far ones.
					const pull = (0.1 + star.z * 2) / staticity;
					star.translateX += (mouse.x * pull - star.translateX) / ease;
					star.translateY += (mouse.y * pull - star.translateY) / ease;
				}
				const twinkle = reduceMotion
					? 1
					: 0.75 + 0.25 * Math.sin(time * star.twinkleSpeed + star.twinklePhase);
				drawStar(star, star.alpha * twinkle);
			}

			if (shootingStars && !reduceMotion) {
				if (!shooting && time > nextShootingAt) {
					shooting = spawnShootingStar();
				}
				if (shooting) {
					shooting.x += shooting.vx;
					shooting.y += shooting.vy;
					shooting.life += 1;
					drawShootingStar(shooting);
					if (shooting.life >= shooting.maxLife) {
						shooting = null;
						nextShootingAt = time + 8000 + Math.random() * 10000;
					}
				}
			}
		};

		const loop = (time: number) => {
			render(time);
			frame = window.requestAnimationFrame(loop);
		};

		const start = () => {
			if (reduceMotion || frame !== undefined || !visible || document.hidden)
				return;
			frame = window.requestAnimationFrame(loop);
		};

		const stop = () => {
			if (frame !== undefined) window.cancelAnimationFrame(frame);
			frame = undefined;
		};

		const onMouseMove = (event: MouseEvent) => {
			const rect = canvas.getBoundingClientRect();
			const x = event.clientX - rect.left - size.w / 2;
			const y = event.clientY - rect.top - size.h / 2;
			if (Math.abs(x) < size.w / 2 && Math.abs(y) < size.h / 2) {
				mouse.x = x;
				mouse.y = y;
			}
		};

		let resizeTimer: ReturnType<typeof setTimeout> | undefined;
		const onResize = () => {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(() => {
				resize();
				if (reduceMotion) render(0);
			}, 150);
		};

		const onVisibility = () => (document.hidden ? stop() : start());

		// Pause while the canvas is scrolled out of view.
		const observer = new IntersectionObserver(([entry]) => {
			visible = entry.isIntersecting;
			visible ? start() : stop();
		});

		resize();
		if (reduceMotion) {
			render(0);
		} else {
			start();
		}
		observer.observe(container);
		window.addEventListener("resize", onResize);
		window.addEventListener("mousemove", onMouseMove, { passive: true });
		document.addEventListener("visibilitychange", onVisibility);

		return () => {
			stop();
			clearTimeout(resizeTimer);
			observer.disconnect();
			window.removeEventListener("resize", onResize);
			window.removeEventListener("mousemove", onMouseMove);
			document.removeEventListener("visibilitychange", onVisibility);
		};
	}, [density, staticity, ease, shootingStars]);

	return (
		<div className={className} ref={containerRef} aria-hidden="true">
			<canvas ref={canvasRef} />
		</div>
	);
}
