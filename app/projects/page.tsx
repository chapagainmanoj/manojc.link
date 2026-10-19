import React from "react";
import { allProjects } from "contentlayer/generated";
import { ContentIndex } from "../components/content-index";
import { pageMetadata } from "../components/seo";

export const revalidate = 60;
export const metadata = pageMetadata({
	title: "Projects",
	description:
		"Open-source tools, AI agents, SDKs and side projects built by Manoj Chapagain.",
	path: "/projects",
});

export default function ProjectsPage() {
	return (
		<ContentIndex
			title="Projects"
			description="This is where I showcase the projects and things I learn along the way. Might not be updated regularly but I try to keep it fresh."
			moreLabel="More projects"
			basePath="/projects"
			entries={allProjects}
			pinned={["job-copilot", "dcode-shapes", "no-not-again"]}
		/>
	);
}
