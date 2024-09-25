import "./NavBar.scss";
import NavBarSmallScreen from "./NavBarSmallScreen";
import NavBarWideScreen from "./NavBarWideScreen";
function NavBar() {
  return (
    <div className="NavBar">
      <NavBarSmallScreen />
      <NavBarWideScreen />
    </div>
  );
}

export default NavBar;
