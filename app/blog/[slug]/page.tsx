import { notFound } from "next/navigation";
import { Metadata } from "next";
import { allBlogs } from "contentlayer/generated";
import { PostPage } from "@/app/components/post-page";
import { pageMetadata } from "@/app/components/seo";

export const revalidate = 60;

type Props = {
	params: {
		slug: string;
	};
};

export async function generateStaticParams(): Promise<Props["params"][]> {
	return allBlogs
		.filter((p) => p.published)
		.map((p) => ({
			slug: p.slug,
		}));
}

export function generateMetadata({ params }: Props): Metadata {
	const post = allBlogs.find((p) => p.slug === params.slug);
	if (!post) return {};
	return pageMetadata({
		title: post.title,
		description: post.description,
		path: `/blog/${post.slug}`,
		type: "article",
		publishedTime: post.date,
	});
}

export default async function BlogPostPage({ params }: Props) {
	const post = allBlogs.find((p) => p.slug === params?.slug);

	if (!post) {
		notFound();
	}

	return <PostPage doc={post} all={allBlogs} basePath="/blog" />;
}
