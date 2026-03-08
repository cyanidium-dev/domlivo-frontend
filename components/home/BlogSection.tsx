import Link from 'next/link';
import { Button } from '@heroui/react';
import { BlogCard } from '@/components/blog/BlogCard';
import { mapLocalizedString, mapCtaLink } from '@/lib/sanity/mappers';
import type { HomePage, BlogPost } from '@/lib/sanity/types';

interface BlogSectionProps {
  homePage: Pick<HomePage, 'blogEnabled' | 'blogTitle' | 'blogSubtitle' | 'blogCta'>;
  posts: BlogPost[];
  locale: string;
}

function getPostSlug(post: BlogPost): string {
  return typeof post.slug === 'string' ? post.slug : (post.slug?.current ?? post._id);
}

export function BlogSection({ homePage, posts, locale }: BlogSectionProps) {
  if (homePage.blogEnabled === false) return null;

  const title = mapLocalizedString(homePage.blogTitle, locale);
  const subtitle = mapLocalizedString(homePage.blogSubtitle, locale);
  const cta = mapCtaLink(homePage.blogCta, locale);

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          {title && <h2 className="text-3xl font-bold mb-4">{title}</h2>}
          {subtitle && <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
        </div>
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {posts.slice(0, 6).map((p) => (
              <BlogCard
                key={p._id}
                post={p}
                locale={locale}
                href={`/${locale}/blog/${getPostSlug(p)}`}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-default-500 py-8">No blog posts</p>
        )}
        {cta.href !== '#' && (
          <div className="text-center">
            <Button
              as={Link}
              href={cta.href}
              target={cta.external ? '_blank' : undefined}
              variant="bordered"
              className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
            >
              {cta.label}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
