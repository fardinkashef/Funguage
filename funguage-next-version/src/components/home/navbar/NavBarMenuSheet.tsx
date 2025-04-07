import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { Home, Library, LogIn, Menu } from "lucide-react";
import { sessionUser } from "@/lib/types";

export default function NavBarMenuSheet({ user }: { user: sessionUser }) {
  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden cursor-pointer">
        <Menu color="black" />
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-[400px] flex flex-col">
        <SheetClose asChild>
          <Link href="/" className="flex items-center gap-2">
            <Home size={22} />
            <span>Home</span>
          </Link>
        </SheetClose>
        <SheetClose asChild>
          <Link href="/learning" className="flex items-center gap-2">
            <Library size={22} />
            <span>Learn</span>
          </Link>
        </SheetClose>
        {user ? (
          <SheetClose asChild>
            <Link href="/learning" className="flex items-center gap-2">
              <Library size={22} />
              <span>Logout</span>
            </Link>
          </SheetClose>
        ) : (
          <SheetClose asChild>
            <Link href="/login" className="flex items-center gap-2">
              <LogIn size={22} />
              <span>Login</span>
            </Link>
          </SheetClose>
        )}
      </SheetContent>
    </Sheet>
  );
}
