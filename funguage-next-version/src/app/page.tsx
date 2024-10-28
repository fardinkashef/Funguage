import Link from "next/link";

export default function HomePage() {
  return (
    <div className="">
      Home page
      <nav className="flex justify-around">
        <Link href="/learning">learing</Link>
        <Link href="/teaching">teaching</Link>
      </nav>
    </div>
  );
}
