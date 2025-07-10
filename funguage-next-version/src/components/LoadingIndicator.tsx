"use client";
import ClipLoader from "react-spinners/ClipLoader";

export default function LoadingSpinner() {
  return (
    <div className="grow w-full h-full flex justify-center items-center">
      <ClipLoader color="#f97316" size={75} />
    </div>
  );
}
