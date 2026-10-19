import React from "react";
import { allBlogs } from "contentlayer/generated";
import { ContentIndex } from "../components/content-index";
import { pageMetadata } from "../components/seo";

export const revalidate = 60;
export const metadata = pageMetadata({
	title: "Blog",
	description:
		"Writing on AI, RAG pipelines, open source, Linux internals and the craft of software development by Manoj Chapagain.",
	path: "/blog",
});

export default function BlogPage() {
	return (
		<ContentIndex
			title="Blog"
			description="Most of the time I am super lazy, sometimes I get super motivated. That's when I write about my journey, learnings, and sometimes thoughts."
			moreLabel="More posts"
			basePath="/blog"
			entries={allBlogs}
			pinned={["say-hi-to-amigo", "rag-example", "tainted-kernel"]}
		/>
	);
}
