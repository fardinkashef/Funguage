import { SidebarTrigger } from "../ui/sidebar";
import MenuSheet from "./TeachingMenuSheet";

export default function TeachingNavbar() {
  return (
    <div className="flex justify-between bg-yellow-400 p-4">
      <MenuSheet />
      <SidebarTrigger className="hidden md:flex" />
      <div>search</div>
      <div>exit</div>
    </div>
  );
}
