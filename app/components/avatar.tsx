import Image, { ImageProps } from 'next/image';
import clsx from 'clsx';
import default_avatar from '@/public/default_avatar.png';

type Props = Omit<ImageProps, 'src' | 'alt'> & {
  src?: ImageProps['src'] | null;
  alt?: ImageProps['alt'];
};

export default function Avatar({
  src,
  alt = 'avatar',
  width = 50,
  height = 50,
  className,
  ...props
}: Props) {
  return (
    <Image
      src={src || default_avatar}
      alt={alt}
      width={width}
      height={height}
      className={clsx('avatar', className)}
      {...props}
    />
  );
}
