import { getBlogPosts, getSiteSettings } from '@/lib/sanity';
import { buildMetadataFromSeo } from '@/lib/seo/mappers';
import { mapLocalizedString } from '@/lib/sanity/mappers';
import { BlogCard } from '@/components/blog/BlogCard';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const siteSettings = await getSiteSettings(locale);
  return buildMetadataFromSeo(siteSettings?.seo, locale, `/${locale}/blog`, {
    title: mapLocalizedString(siteSettings?.siteName, locale) || 'Domlivo',
    description: '',
  });
}

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params;
  const posts = await getBlogPosts(locale);

  return (
    <main className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-12">Blog</h1>
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard
                key={post._id}
                post={post}
                locale={locale}
                href={`/${locale}/blog/${typeof post.slug === 'string' ? post.slug : (post.slug?.current ?? post._id)}`}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-default-500 py-16">No blog posts yet.</p>
        )}
      </div>
    </main>
  );
}
