import Footer from '@/components/footer';
import Header from '@/components/hader';
import Table from '@/components/table';

export default function Home() {
  const orgJsonLd = {
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
  };

  const appJsonLd = {
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
  };

  return (
    <main className="w-full max-w-[1440px] m-auto">
      <section className="relative min-h-screen overflow-x-hidden">
        <Header />
        <Table />
        <Footer />
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(appJsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(orgJsonLd).replace(/</g, '\\u003c'),
        }}
      />
    </main>
  );
}
