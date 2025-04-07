import Link from "next/link";
import { sessionUser } from "@/lib/types";
import NavBarMenuSheet from "./NavBarMenuSheet";
import UserDropdown from "@/components/UserDropDown";

export default function Navbar({ user }: { user: sessionUser }) {
  return (
    <div className="flex justify-between items-center p-4 border-t-8 border-t-orange-500 border-b-2">
      <Link
        href="/"
        className="text-black text-2xl font-bold p-2 rounded-md grow max-w-fit"
      >
        <span className="text-orange-500">Fun</span>
        guage
      </Link>
      {/* // Weird behaviour: if I put the following NavBarMenuSheet element after the nav element, it won't show up!!! */}
      <NavBarMenuSheet user={user} />
      <nav className="hidden pr-12 md:flex items-center gap-8 ">
        <Link
          href="/learning"
          className="bg-orange-500 text-white p-2 rounded-md hover:bg-orange-700"
        >
          Learn
        </Link>
        {user ? <UserDropdown user={user} /> : <Link href="/login">Login</Link>}
      </nav>
    </div>
  );
}
