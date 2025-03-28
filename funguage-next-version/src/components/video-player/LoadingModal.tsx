"use client";
import ClipLoader from "react-spinners/ClipLoader";

export default function LoadingModal() {
  return (
    <div className="w-full h-full bg-black flex justify-center items-center absolute left-0 top-0 z-10">
      <ClipLoader color="#FFF" size={75} />
    </div>
  );
}
