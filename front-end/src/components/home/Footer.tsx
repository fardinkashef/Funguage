import "./Footer.scss";

function Footer() {
  return (
    <footer className="Footer">
      <div className="logo"></div>
      <ul>
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#">Pricing</a>
        </li>
        <li>
          <a href="#">Terms of Use</a>
        </li>
        <li>
          <a href="#">Privacy Policy</a>
        </li>
        <li>
          <a href="#">Careers</a>
        </li>
        <li>
          <a href="#">Blog</a>
        </li>
        <li>
          <a href="#">Contact Us</a>
        </li>
      </ul>
      <p>
        &copy; Copyright by
        <a target="_blank" href="https://fardinkashef.github.io/">
          {` Fardin Kashef`}
        </a>
      </p>
    </footer>
  );
}

export default Footer;
