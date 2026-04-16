import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import type { SanityImageField } from '@/types';

interface SanityImageProps {
  image: SanityImageField | null | undefined;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fallbackUrl?: string | null;
}

export default function SanityImage({
  image,
  alt,
  width = 800,
  height,
  className,
  sizes,
  priority,
  fallbackUrl,
}: SanityImageProps) {
  if (!image?.asset && fallbackUrl) {
    // Use plain img to allow any remote URL without Next.js remotePattern friction
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={fallbackUrl} alt={alt} className={className} loading={priority ? 'eager' : 'lazy'} />;
  }

  if (!image?.asset) {
    return (
      <div
        className={`${className ?? ''} bg-esti-beige/30 flex items-center justify-center text-esti-taupe text-xs`}
        style={{ aspectRatio: width && height ? `${width}/${height}` : undefined }}
      >
        EstiTalk
      </div>
    );
  }

  const builder = urlFor(image).width(width).auto('format').fit('max');
  const src = (height ? builder.height(height) : builder).url();

  return (
    <Image
      src={src}
      alt={image.alt || alt}
      width={width}
      height={height ?? Math.round((width * 9) / 16)}
      className={className}
      sizes={sizes}
      priority={priority}
    />
  );
}
