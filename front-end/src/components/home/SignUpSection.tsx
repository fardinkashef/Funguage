import "./SignUpSection.scss";
import { Link } from "react-router-dom";

function SignUpSection() {
  return (
    <section className="SignUpSection">
      <h3>Join the funguage club and start learning right away</h3>

      <Link to="/signup">Open your free account</Link>
    </section>
  );
}

export default SignUpSection;
