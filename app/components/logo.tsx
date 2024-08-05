import Image, { ImageProps } from 'next/image';
import logo from '@/public/logo.png';

export default function Logo(props: Omit<ImageProps, 'src' | 'alt'>) {
  return <Image src={logo} alt='logo' {...props} priority />;
}
