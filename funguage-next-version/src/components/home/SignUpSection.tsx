import Link from "next/link";
import "./SignUpSection.scss";

function SignUpSection() {
  return (
    <section className="SignUpSection">
      <h3>Join the funguage club and start learning right away</h3>

      <Link href="/register">Open your free account</Link>
    </section>
  );
}

export default SignUpSection;
