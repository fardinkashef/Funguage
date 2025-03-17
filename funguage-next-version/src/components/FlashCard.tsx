"use client";
import { useState } from "react";

export default function FlashCard() {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="w-[300px] h-[300px] relative">
      <div className="front rotate-y- bg-red-400">front</div>
      <div className="back bg-blue-400 absolute rotate-90">back</div>
    </div>
  );
}
