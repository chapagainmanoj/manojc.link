"use client";
import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
	value: string;
	label: string;
	className?: string;
};

export const CopyButton: React.FC<Props> = ({ value, label, className = "" }) => {
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		if (!copied) return;
		const timer = setTimeout(() => setCopied(false), 1800);
		return () => clearTimeout(timer);
	}, [copied]);

	const copy = async () => {
		try {
			await navigator.clipboard.writeText(value);
			setCopied(true);
		} catch {
			// Clipboard can be blocked (e.g. insecure context); fall back to a prompt.
			window.prompt("Copy to clipboard:", value);
		}
	};

	return (
		<button
			type="button"
			onClick={copy}
			aria-label={copied ? "Copied" : label}
			title={copied ? "Copied!" : label}
			className={`relative flex items-center justify-center w-9 h-9 rounded-lg border duration-200 ${
				copied
					? "text-emerald-300 border-emerald-400/40 bg-emerald-400/10"
					: "text-zinc-400 border-zinc-700 bg-zinc-900 hover:text-accent-200 hover:border-accent-300/50"
			} ${className}`}
		>
			{copied ? <Check size={16} /> : <Copy size={16} />}
			<span
				aria-live="polite"
				className={`pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-800 px-2 py-1 text-xs text-zinc-100 duration-200 ${
					copied ? "opacity-100" : "opacity-0"
				}`}
			>
				{copied ? "Copied!" : ""}
			</span>
		</button>
	);
};
