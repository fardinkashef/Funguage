import { SidebarTrigger } from "../ui/sidebar";
import UserDropdown from "../UserDropDown";
import LearningMenuSheet from "./LearningMenuSheet";
import { sessionUser } from "@/lib/types";
import LearningBreadCrumb from "./LearningBreadCrumb";

export default function LearningNavbar({ user }: { user: sessionUser }) {
  return (
    <div className="flex justify-between items-center p-4 border-b-2">
      <LearningMenuSheet />
      <SidebarTrigger className="hidden md:flex" />
      <LearningBreadCrumb />
      <UserDropdown user={user} />
    </div>
  );
}
