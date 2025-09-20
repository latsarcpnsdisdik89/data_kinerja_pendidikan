import type { Metadata } from 'next';
import { Roboto, Roboto_Mono } from 'next/font/google';
import Providers from './provider';
import { GoogleAnalytics } from '@next/third-parties/google';

import './globals.css';

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
    'Situs resmi informasi data kinerja pendidikan dari Dinas Pendidikan Kabupaten Grobogan. Menyediakan data kinerja pendidikan secara lengkap.',
  authors: [
    {
      name: 'Yugma Dewangga',
      url: 'https://www.linkedin.com/in/yugma-dewangga-a895b9354',
    },
  ],
  openGraph: {
    title: 'Dinas Pendidikan Kabupaten Grobogan',
    description:
      'Situs resmi informasi data kinerja pendidikan dari Dinas Pendidikan Kabupaten Grobogan',
    url: 'https://data-kinerja-pendidikan.vercel.app',
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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'uIqdWdOixikD1Q_jHzod_sqJQfCsdV7Dh_Cp8pp4UJ8',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Dinas Pendidikan Kabupaten Grobogan',
  url: 'https://data-kinerja-pendidikan.vercel.app',
  address: {
    '@type': 'PostalAddress',
    streetAddress:
      'Jl. Pemuda No.35',
    addressLocality: 'Purwodadi',
    addressRegion: 'Jawa Tengah',
    postalCode: '58111',
    addressCountry: 'ID',
  },
  provider: {
    '@type': 'GovernmentOrganization',
    name: 'Disdik Grobogan',
    url: 'https://disdik.grobogan.go.id',
  },
  sameAs: [
    'https://id.wikipedia.org/wiki/Kabupaten_Grobogan',
    'https://id.wikipedia.org/wiki/Purwodadi,_Grobogan',
    'https://www.wikidata.org/wiki/Q10614',
    'https://www.facebook.com/disdik.grobogan',
    'https://www.instagram.com/disdikgrobogan',
  ],
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'IDR',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    ratingCount: '1',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
          }}
        />
      </head>
      <body
        className={`${robotoSans.variable} ${robotoMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
        <GoogleAnalytics gaId="G-0E8F8GX07C" />
      </body>
    </html>
  );
}
