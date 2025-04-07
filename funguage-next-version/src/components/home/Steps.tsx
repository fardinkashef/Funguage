import Image from "next/image";

export default function Steps() {
  return (
    <section className="flex flex-col gap-32 py-16">
      {/* Step 1 */}
      <div className="flex flex-col gap-8 p-8 justify-center items-center md:flex-row-reverse md:gap-32">
        <div className="w-full max-w-96 md:max-w-lg">
          <h2 className="text-3xl font-bold mb-6 text-slate-800">
            Pick your Favorite Show
          </h2>
          <p className="text-xl text-slate-700">
            1,000s of hours of compelling and original TV shows, movies, music
            videos, Netflix and Disney+ originals.
          </p>
        </div>
        <div className="relative w-full max-w-96 aspect-video md:max-w-lg">
          <Image
            src="/home-page-assets/steps-images/step-1.png"
            fill
            alt="step1"
          />
        </div>
      </div>

      {/* Step 2 */}
      <div className="flex flex-col gap-8 p-8 justify-center items-center md:flex-row md:gap-32">
        <div className="w-full max-w-96  md:max-w-lg">
          <h2 className="text-3xl font-bold mb-6 text-slate-800">
            Watch & Click
          </h2>
          <p className="text-xl text-slate-700">
            All shows come with 2 sets of subtitles. Click any word to get an
            instant translation. The more you watch, the more you learn.
          </p>
        </div>
        <div className="relative w-full max-w-96 aspect-video md:max-w-lg">
          <Image
            src="/home-page-assets/steps-images/step-2.png"
            fill
            alt="step1"
          />
        </div>
      </div>

      {/* Step 3 */}
      <div className="flex flex-col gap-8 p-8 justify-center items-center md:flex-row-reverse md:gap-32">
        <div className="w-full max-w-96  md:max-w-lg">
          <h2 className="text-3xl font-bold mb-6 text-slate-800">
            Review and Learn
          </h2>
          <p className="text-xl text-slate-700">
            Develop, review and track your language skills using our unique and
            immersive methods.
          </p>
        </div>
        <div className="relative w-full max-w-96 aspect-video md:max-w-lg">
          <Image
            src="/home-page-assets/steps-images/step-3.webp"
            fill
            alt="step1"
          />
        </div>
      </div>
    </section>
  );
}
