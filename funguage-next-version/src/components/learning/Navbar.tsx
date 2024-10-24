import { SidebarTrigger } from "../ui/sidebar";
import { MenuSheet } from "./MenuSheet";

export default function Navbar() {
  return (
    <div className="flex justify-between bg-yellow-400 p-4">
      <MenuSheet />
      <SidebarTrigger className="hidden md:flex" />
      <div>search</div>
      <div>exit</div>
    </div>
  );
}
