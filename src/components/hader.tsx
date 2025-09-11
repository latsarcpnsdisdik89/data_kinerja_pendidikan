import Image from 'next/image';
import logo_kab from '@/assets/grobogan.png';
import berakhlak from '@/assets/berakhlak.png';
import bmb from '@/assets/bmb.png';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="px-4">
      <div className="flex justify-between items-center gap-8">
        <Link href="https://disdik.grobogan.go.id/" >
          <div className="flex items-center gap-3">
            <Image
              src={logo_kab}
              alt="Logo Kabupaten Grobogan"
              height={50}
              width={50}
              priority
              className="h-[50px] md:h-[75px] lg:h-[85px] w-auto shrink-0"
            />
            <p className="hidden text-md font-bold md:block">
              Dinas Pendidikan <br /> Kabupaten <br /> Grobogan
            </p>
          </div>
        </Link>
        <div className="flex justify-center items-center gap-4">
          <div className="flex items-center gap-3">
            <Image
              src={berakhlak}
              alt="Berakhlak"
              height={100}
              width={100}
              priority
              className="h-[100px] md:h-[150px] lg:h-[175px] w-auto shrink-0"
            />
          </div>
          <div className="flex items-center gap-3">
            <Image
              src={bmb}
              alt="Bmb"
              height={100}
              width={100}
              priority
              className="h-[100px] md:h-[150px] lg:h-[175px] w-auto shrink-0"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
