import Footer from '@/components/footer';
import Header from '@/components/hader';
import Table from '@/components/table';

export default function Home() {
  return (
    <main className="w-full max-w-[1440px] m-auto">
      <section className="relative min-h-screen overflow-x-hidden">
        <Header />
        <Table />
        <Footer />
      </section>
    </main>
  );
}
