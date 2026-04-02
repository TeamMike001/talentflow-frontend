import Link from 'next/link';

export default function Footer() {
  return (
    <div className="flex justify-between w-full text-sm text-gray-500 font-medium max-md:text-xs max-sm:flex-col max-sm:items-center max-sm:gap-2">
      <p>© 2026 Team Mike - UI/UX. All rights reserved.</p>
      <div className="flex gap-8 pr-28 max-md:gap-4 max-md:pr-0">
        <Link href="#">FAQs</Link>
        <Link href="#">Privacy Policy</Link>
        <Link href="#">Terms & Conditions</Link>
      </div>
    </div>
  );
}