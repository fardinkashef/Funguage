import Link from "next/link";
import { SidebarTrigger } from "../ui/sidebar";
import UserDropdown from "../UserDropDown";
import LearningMenuSheet from "./LearningMenuSheet";
import { sessionUser } from "@/lib/types";

export default function LearningNavbar({ user }: { user: sessionUser }) {
  return (
    <div className="flex justify-between bg-yellow-400 p-4">
      <LearningMenuSheet />
      <SidebarTrigger className="hidden md:flex" />
      <Link href="/" className="bg-black text-white p-2 rounded-md">
        Back to home
      </Link>
      <div>search</div>
      <UserDropdown user={user} />
    </div>
  );
}
