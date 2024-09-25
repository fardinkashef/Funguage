import Header from "@/components/home/Header.tsx";
import Wave from "@/components/home/Wave.tsx";
import Features from "@/components/home/Features.tsx";
import SignUpSection from "@/components/home/SignUpSection.tsx";
import Footer from "@/components/home/Footer.tsx";
import { useContext } from "react";
import AuthContext from "@/shared/context/AuthContext";
import GreetingSection from "../../components/home/GreetingSection";

function Home() {
  const { loggedIn } = useContext(AuthContext);

  return (
    <div className="body ">
      <Header />
      <Wave topColor="snow" bottomColor="lightgrey" />
      <Features />
      <Wave topColor="lightgrey" bottomColor="darkslategrey" />

      {loggedIn ? <GreetingSection /> : <SignUpSection />}
      {/* <Wave topColor="darkslategrey" bottomColor="black" /> */}
      <Footer />
    </div>
  );
}

export default Home;
