import Link from 'next/link';
import { Card, CardBody } from '@heroui/react';
import { AppImage } from '@/components/shared';
import { mapBlogCard } from '@/lib/sanity/mappers';
import type { BlogPost } from '@/lib/sanity/types';

interface BlogCardProps {
  post: BlogPost;
  locale: string;
  href: string;
}

export function BlogCard({ post, locale, href }: BlogCardProps) {
  const mapped = mapBlogCard(post, locale);

  return (
    <Link href={href} className="block h-full">
      <Card className="h-full overflow-hidden border border-default-200 transition hover:border-default-400 hover:shadow-lg">
        <div className="aspect-video relative overflow-hidden">
          <AppImage
            image={mapped.coverImage}
            alt={mapped.title}
            fill
            fallbackType="blog"
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            sanityWidth={600}
            sanityHeight={340}
          />
        </div>
        <CardBody className="gap-2">
          {mapped.title && <h3 className="font-semibold text-lg line-clamp-2">{mapped.title}</h3>}
          {mapped.excerpt && (
            <p className="text-default-600 text-sm line-clamp-2">{mapped.excerpt}</p>
          )}
          {mapped.publishedAt && (
            <p className="text-xs text-default-400">
              {new Date(mapped.publishedAt).toLocaleDateString(locale)}
            </p>
          )}
        </CardBody>
      </Card>
    </Link>
  );
}
