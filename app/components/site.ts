export const siteUrl = "https://manojc.link";
export const siteDescription =
	"Manoj Chapagain is a software engineer who builds full-stack products with Python and TypeScript. Writing about AI, open source and developer life.";

export const author = {
	name: "Manoj Chapagain",
	jobTitle: "Software Engineer",
	twitter: "@__man0j",
	sameAs: [
		"https://github.com/chapagainmanoj",
		"https://www.linkedin.com/in/chapagainmanoj/",
		"https://x.com/__man0j",
		"https://lichess.org/@/imsober",
	],
};

export const navigation = [
	{ name: "Blog", href: "/blog" },
	{ name: "Projects", href: "/projects" },
	{ name: "Contact", href: "/contact" },
];

export const socials = [
	{ label: "GitHub", href: "https://github.com/chapagainmanoj" },
	{ label: "LinkedIn", href: "https://www.linkedin.com/in/chapagainmanoj/" },
	{ label: "X", href: "https://x.com/__man0j" },
	{ label: "Email", href: "mailto:chapagainmanoj35@gmail.com" },
];

export function formatDate(date?: string) {
	if (!date) return null;
	return Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
		new Date(date),
	);
}
