import { databaseWord } from "@/lib/types";
import "./Images.scss";

type ImagesProps = {
  currentWord: databaseWord;
  currentImageIndex: number;
  setCurrentImageIndex: React.Dispatch<React.SetStateAction<number>>;
};

export default function Images({
  currentWord,
  currentImageIndex,
  setCurrentImageIndex,
}: ImagesProps) {
  const {
    // word,
    images,
  } = currentWord;

  return (
    <div className="Images">
      <div className="images-nav">
        <button
          className="previous"
          onClick={() => setCurrentImageIndex(currentImageIndex - 1)}
          disabled={currentImageIndex === 0}
        ></button>
        <h5> images</h5>
        <button
          className="next"
          onClick={() => setCurrentImageIndex(currentImageIndex + 1)}
          disabled={currentImageIndex === images.length - 1}
        ></button>
      </div>
      {/* <img
        src={
          import.meta.env.VITE_BACKEND_URL +
          `/static-files/images/${word}_${images[currentImageIndex]}.jpg`
        }
      /> */}
    </div>
  );
}
