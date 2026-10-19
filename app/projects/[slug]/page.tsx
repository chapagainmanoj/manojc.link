import { notFound } from "next/navigation";
import { Metadata } from "next";
import { allProjects } from "contentlayer/generated";
import { PostPage } from "@/app/components/post-page";
import { pageMetadata } from "@/app/components/seo";

export const revalidate = 60;

type Props = {
	params: {
		slug: string;
	};
};

export async function generateStaticParams(): Promise<Props["params"][]> {
	return allProjects
		.filter((p) => p.published)
		.map((p) => ({
			slug: p.slug,
		}));
}

export function generateMetadata({ params }: Props): Metadata {
	const project = allProjects.find((p) => p.slug === params.slug);
	if (!project) return {};
	return pageMetadata({
		title: project.title,
		description: project.description,
		path: `/projects/${project.slug}`,
		type: "article",
		publishedTime: project.date,
	});
}

export default async function ProjectPage({ params }: Props) {
	const project = allProjects.find((p) => p.slug === params?.slug);

	if (!project) {
		notFound();
	}

	return <PostPage doc={project} all={allProjects} basePath="/projects" />;
}
