import type { Metadata } from 'next';
import { inter } from '@/app/lib/fonts';
import Navbar from '@/app/components/navbar';
import Footer from '@/app/components/footer';
import '@/app/scss/globals.scss';

export const metadata: Metadata = {
  title: {
    template: '%s | Dev Blogs',
    default: 'Dev Blogs',
  },
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
