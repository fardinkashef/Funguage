import Image from "next/image";
import "./Header.scss";
import Link from "next/link";

export default function Header() {
  return (
    <section className="Header">
      <div className="welcome">
        <h2 className="text-5xl font-bold text-slate-800">
          To have <span className="text-orange-500 inline">Fun</span> while
          learning a lan<span className="text-orange-500 inline">guage</span>
        </h2>
        <h3 className="text-xl">
          A simpler<span> learning experience</span> for a
          <span> simpler life</span>
        </h3>
        <Link
          href="/"
          className="bg-orange-500 rounded-full w-fit font-bold px-16 py-4 text-white hover:bg-orange-700"
        >
          Take a tour
        </Link>
      </div>

      <div className="video-container aspect-video">
        <div className="relative w-full aspect-[10/1]">
          <Image
            src="/home-page-assets/top-of-browser.png"
            alt="top of browser"
            fill
          />
        </div>
        <video src="/home-page-assets/home-page-video.mp4" muted />
      </div>
    </section>
  );
}
