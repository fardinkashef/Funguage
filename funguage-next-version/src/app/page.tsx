import FlashCard from "@/components/FlashCard";
import { LogoutForm } from "@/components/logout/LogoutForm";
import VideoPlayer from "@/components/video-player/VideoPlayer";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="">
      Home page
      <nav className="flex justify-around">
        <Link href="/learning">learing</Link>
        <Link href="/teaching">teaching</Link>
        <Link href="/login">login</Link>
      </nav>
      <LogoutForm />
      {/* <VideoPlayer
        videoSrc="https://funguage.arvanvod.ir/MaqPbZPWlo/WG31Vk0p78/h_,144_200,240_400,360_800,480_1471,720_1471,1080_1471,k.mp4.list/master.m3u8#t=10,25"
        subtitleSrc="https://utfs.io/f/IoZH1CEZ0CxREDKHootG7dJRNkSoyTivBcHmXug8Vr3Un65C"
        wordsPairList={[]}
      /> */}
    </div>
  );
}
