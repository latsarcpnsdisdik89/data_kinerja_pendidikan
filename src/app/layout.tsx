import type { Metadata } from 'next';
import { Roboto, Roboto_Mono } from 'next/font/google';
import './globals.css';
import Providers from './provider';

const robotoSans = Roboto({
  variable: '--font-roboto-sans',
  subsets: ['latin'],
});

const robotoMono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin'],
});

import type { Viewport } from 'next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: 'Dinas Pendidikan Kabupaten Grobogan',
  description:
    'Situs resmi informasi data pendidikan dari Dinas Pendidikan Kabupaten Grobogan. Menyediakan data, layanan terkait pendidikan secara lengkap.',
  openGraph: {
    title: 'Dinas Pendidikan Kabupaten Grobogan',
    description:
      'Situs resmi informasi data pendidikan dari Dinas Pendidikan Kabupaten Grobogan',
    url: 'https://data-pendidikan.vercel.app',
    siteName: 'Dinas Pendidikan Kabupaten Grobogan',
    images: [
      {
        url: '/og-image.png',
        width: 1080,
        height: 1080,
        alt: 'Preview My Website',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body
        className={`${robotoSans.variable} ${robotoMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
