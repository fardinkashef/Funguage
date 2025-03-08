import { LogoutForm } from "@/components/logout/LogoutForm";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="">
      Home page
      <nav className="flex justify-around">
        <Link href="/learning">learing</Link>
        <Link href="/teaching">teaching</Link>
        <Link href="/login">login</Link>
      </nav>
      <LogoutForm />
    </div>
  );
}
