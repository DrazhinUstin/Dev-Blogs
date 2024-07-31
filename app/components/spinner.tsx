import Image, { ImageProps } from 'next/image';
import spinner from '@/public/spinner.svg';

export default function Spinner({ style, ...props }: Omit<ImageProps, 'src' | 'alt'>) {
  return (
    <Image
      {...props}
      src={spinner}
      alt='spinner'
      style={{ margin: 'auto', ...style }}
      unoptimized
    />
  );
}
