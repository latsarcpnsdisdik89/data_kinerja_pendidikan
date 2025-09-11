import Image from 'next/image';
import Link from 'next/link';
import facebook from '@/assets/facebook.svg';
import instagram from '@/assets/instagram.svg';

export default function Footer() {
  return (
    <footer className="p-4 mb-8">
      <div className="flex flex-col justify-center items-center">
        <p className="font-bold">Copyright © 2025</p>
        <p>Dinas Pendidikan Kabupaten Grobogan</p>
      </div>
      <div className="flex justify-center gap-4 mt-4">
        <Link href="https://www.facebook.com/profile.php?id=100057139972975">
          <Image src={facebook} alt="Facebook" height={17} width={17} />
        </Link>
        <Link href="https://www.instagram.com/disdikgrobogan">
          <Image src={instagram} alt="Instagram" height={17} width={17} />
        </Link>
      </div>
    </footer>
  );
}
