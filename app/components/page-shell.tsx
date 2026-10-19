export default function PageShell({ children }: { children: React.ReactNode }) {
	return (
		<div className="relative min-h-screen overflow-hidden bg-black">
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[480px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(252,183,77,0.08),transparent_70%)]"
			/>
			<div className="relative">{children}</div>
		</div>
	);
}
