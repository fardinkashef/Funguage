import "./Features.scss";

import Image from "next/image";

export default function Features() {
  return (
    <section className="Features">
      <div className="header">
        <h3>Features</h3>
        <h4>
          Great features you can use to learn English in a
          {/* I put the last two words in a span to prevent the last word from being alone 👇:*/}
          <span> modern way.</span>
        </h4>
      </div>

      <div className="main">
        <div className="feature">
          <div className="image flex justify-center items-center relative">
            <Image
              src="/home-page-assets/features-images/fun-lazy.jpg"
              data-src="img/digital.jpg"
              alt="Computer"
              width={300}
              height={300}
            />
          </div>

          <div className="description">
            <h4> Funguage is fun!</h4>
            <p>
              Here you can learn English while having fun because the content is
              fun! Choose any video you enjoy. No more boring text books!
            </p>
          </div>
        </div>
        <div className="feature">
          <div className="description">
            <h4>It&apos;s easy to use.</h4>
            <p>
              When you see a word you want to learn , Just press
              &quot;Enter&quot; on PC or make a tab on phone , we&apos;ll take
              care of the rest!
            </p>
          </div>
          <div className="image flex justify-center items-center relative">
            <Image
              src="/home-page-assets/features-images/easy_to_use-lazy.jpg"
              data-src="img/grow.jpg"
              alt="Computer"
              width={300}
              height={300}
            />
          </div>
        </div>
        <div className="feature">
          <div className="image flex justify-center items-center relative">
            <Image
              src="/home-page-assets/features-images/effective-lazy.jpg"
              data-src="img/digital.jpg"
              alt="Computer"
              width={300}
              height={300}
            />
          </div>

          <div className="description">
            <h4>It&apos;s effective.</h4>
            <p>
              Here you will learn English with &quot;real English material&quot;
              and immerse your self in the language. It&apos;s based on the most
              effective methods of language learning.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
