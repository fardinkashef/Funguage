import { SidebarTrigger } from "../ui/sidebar";
import LearningMenuSheet from "./LearningMenuSheet";

export default function LearningNavbar() {
  return (
    <div className="flex justify-between bg-yellow-400 p-4">
      <LearningMenuSheet />
      <SidebarTrigger className="hidden md:flex" />
      <div>search</div>
      <div>exit</div>
    </div>
  );
}
