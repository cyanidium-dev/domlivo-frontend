import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';
import { getBlogPost } from '@/lib/sanity';
import { buildMetadataFromSeo } from '@/lib/seo/mappers';
import { mapBlogPost } from '@/lib/sanity/mappers';
import { AppImage } from '@/components/shared';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getBlogPost(slug, locale);
  if (!post) return { title: 'Not Found' };
  const mapped = mapBlogPost(post, locale);
  return buildMetadataFromSeo(post.seo, locale, `/${locale}/blog/${slug}`, {
    title: mapped.title,
    description: mapped.excerpt,
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const post = await getBlogPost(slug, locale);
  if (!post) notFound();

  const mapped = mapBlogPost(post, locale);

  return (
    <main className="py-16 px-4">
      <article className="max-w-3xl mx-auto">
        {mapped.coverImage && (
          <div className="aspect-video relative rounded-lg overflow-hidden mb-8">
            <AppImage
              image={mapped.coverImage}
              alt={mapped.title}
              fill
              fallbackType="blog"
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
              sanityWidth={900}
              sanityHeight={506}
            />
          </div>
        )}
        <h1 className="text-4xl font-bold mb-4">{mapped.title}</h1>
        {(mapped.publishedAt || mapped.author) && (
          <p className="text-default-500 text-sm mb-6">
            {mapped.publishedAt && new Date(mapped.publishedAt).toLocaleDateString(locale)}
            {mapped.author && mapped.author.name && <span> · {mapped.author.name}</span>}
          </p>
        )}
        {mapped.excerpt && <p className="text-xl text-default-600 mb-8">{mapped.excerpt}</p>}
        {mapped.body && mapped.body.length > 0 && (
          <div className="prose prose-lg max-w-none">
            <PortableText value={mapped.body} />
          </div>
        )}
      </article>
    </main>
  );
}
