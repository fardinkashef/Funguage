// import React from "react";
import pic from "./assets/hero.jpg";
import { Link } from "react-router-dom";
import "./Header.scss";
function Header() {
  return (
    <section className="Header">
      <div className="welcome">
        <h2>
          When
          <span className="highlight highlight1"> learning </span>
          gets
          {/* <br /> */}
          <span className="highlight highlight2">fun!</span>
        </h2>
        <h3>
          A simpler<span> learning experience</span> for a
          <span> simpler life</span>
        </h3>
        {/* <Link to="/course/friends">Take a tour for free</Link> */}
      </div>
      <img src={pic} alt="" />
    </section>
  );
}

export default Header;
