import { auth } from "@/auth";
import Features from "@/components/home/Features";
import Footer from "@/components/home/Footer";
import GreetingSection from "@/components/home/GreetingSection";
import Header from "@/components/home/Header";
import Navbar from "@/components/home/navbar/NavBar";
import SignUpSection from "@/components/home/SignUpSection";
import Steps from "@/components/home/Steps";
import Wave from "@/components/home/Wave";
import { LogoutForm } from "@/components/logout/LogoutForm";
import { sessionUser } from "@/lib/types";
// import VideoPlayer from "@/components/video-player/VideoPlayer";
import Link from "next/link";

export default async function HomePage() {
  const session = await auth();
  const user = session?.user;

  return (
    <div>
      <Navbar user={user as sessionUser} />
      <Header />
      <Steps />
      <Wave topColor="snow" bottomColor="lightgrey" />
      <Features />
      <Wave topColor="lightgrey" bottomColor="darkslategrey" />

      {user ? (
        <GreetingSection username={user.username as string} />
      ) : (
        <SignUpSection />
      )}
      {/* <Wave topColor="darkslategrey" bottomColor="black" /> */}
      <Footer />
    </div>
  );
}

// export default function HomePage() {
//   return (
//     <div className="">
//       Home page
//       <nav className="flex justify-around">
//         <Link href="/learning">learning</Link>
//         <Link href="/teaching">teaching</Link>
//         <Link href="/login">login</Link>
//       </nav>
//       <LogoutForm />
//       {/* <VideoPlayer
//         videoSrc="https://funguage.arvanvod.ir/MaqPbZPWlo/WG31Vk0p78/h_,144_200,240_400,360_800,480_1471,720_1471,1080_1471,k.mp4.list/master.m3u8#t=10,25"
//         subtitleSrc="https://utfs.io/f/IoZH1CEZ0CxREDKHootG7dJRNkSoyTivBcHmXug8Vr3Un65C"
//         wordsPairList={[]}
//       /> */}
//     </div>
//   );
// }
