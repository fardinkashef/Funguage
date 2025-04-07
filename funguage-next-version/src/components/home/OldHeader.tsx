import Image from "next/image";
import "./Header.scss";

export default function Header() {
  return (
    <section className="Header">
      <div className="welcome">
        <h2>
          When
          <span className="highlight highlight1"> learning </span>
          gets
          <span className="highlight highlight2">fun!</span>
        </h2>
        <h3>
          A simpler<span> learning experience</span> for a
          <span> simpler life</span>
        </h3>
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
