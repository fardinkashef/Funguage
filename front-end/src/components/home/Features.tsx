import React from "react";
import "./Features.scss";

import pic1 from "./assets/features-images/fun-lazy.jpg";
import pic2 from "./assets/features-images/easy_to_use-lazy.jpg";
import pic3 from "./assets/features-images/effective-lazy.jpg";

function Features() {
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
          <div className="image">
            <img src={pic1} data-src="img/digital.jpg" alt="Computer" />
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
            <h4>It's easy to use.</h4>
            <p>
              When you see a word you want to learn , Just press "Enter" on PC
              or make a tab on phone , we'll take care of the rest!
            </p>
          </div>
          <div className="image">
            <img src={pic2} data-src="img/grow.jpg" alt="Computer" />
          </div>
        </div>
        <div className="feature">
          <div className="image">
            <img
              src={pic3}
              data-src="img/digital.jpg"
              alt="Computer"
              // className="features__img lazy-img"
            />
          </div>

          <div className="description">
            <h4>It's effective.</h4>
            <p>
              Here you will learn English with "real English material" and
              immerse your self in the language. It's based on the most
              effective methods of language learning.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
