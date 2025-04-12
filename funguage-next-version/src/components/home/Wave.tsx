import React from "react";
import "./Wave.scss";

type WaveProps = {
  topColor: string;
  bottomColor: string;
};

export default function Wave({ topColor, bottomColor }: WaveProps) {
  return (
    <div
      className="Wave"
      style={
        {
          "--top-color": topColor,
          "--bottom-color": bottomColor,
        } as React.CSSProperties
      }
    >
      <div className="top" style={{ color: topColor }}></div>
      <div className="bottom"></div>
    </div>
  );
}
