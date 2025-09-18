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
    'Situs resmi informasi data kinerja pendidikan dari Dinas Pendidikan Kabupaten Grobogan. Menyediakan data kinerja pendidikan secara lengkap.',
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

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'GovernmentOrganization',
    name: 'Dinas Pendidikan Kabupaten Grobogan',
    url: 'https://disdik.grobogan.go.id',
    logo: 'https://disdik.grobogan.go.id/images/logo_disdik2.png',
    sameAs: [
      'https://id.wikipedia.org/wiki/Kabupaten_Grobogan',
      'https://id.wikipedia.org/wiki/Purwodadi,_Grobogan',
      'https://www.wikidata.org/wiki/Q10614',
      'https://www.facebook.com/disdik.grobogan',
      'https://www.instagram.com/disdikgrobogan',
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+62-292-421034',
        contactType: 'customer service',
        areaServed: 'ID',
        availableLanguage: ['Indonesian'],
      },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress:
        'Jl. Pemuda No.35, Jetis Timur, Purwodadi, Kec. Purwodadi, Kabupaten Grobogan, Jawa Tengah',
      addressLocality: 'Purwodadi',
      addressRegion: 'Jawa Tengah',
      postalCode: '58111',
      addressCountry: 'ID',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Data Kinerja Pendidikan',
    url: 'https://data-kinerja-pendidikan.vercel.app',
    description:
      'Situs resmi informasi data kinerja pendidikan dari Dinas Pendidikan Kabupaten Grobogan. Menyediakan data kinerja pendidikan secara lengkap.',
    applicationCategory: 'Education',
    operatingSystem: 'All',
    provider: {
      '@type': 'GovernmentOrganization',
      name: 'Dinas Pendidikan Kabupaten Grobogan',
      url: 'https://disdik.grobogan.go.id',
    },
    author: {
      '@type': 'Person',
      name: 'Yugma Dewangga',
      url: 'https://www.linkedin.com/in/yugma-dewangga-a895b9354',
      sameAs: [
        'https://www.linkedin.com/in/yugma-dewangga-a895b9354',
        'https://www.instagram.com/yugmadev',
        'https://medium.com/@yugmadev',
        'https://github.com/yugmade13',
      ],
    },
  },
];

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
      </body>
    </html>
  );
}
