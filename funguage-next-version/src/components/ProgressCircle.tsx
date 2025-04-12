"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type ProgressCircleProps = {
  percentage: number;
  size?: "sm" | "md" | "lg" | "xl";
  showPercentage?: boolean;
  color?: "default" | "success" | "warning" | "danger";
  className?: string;
};

export default function ProgressCircle({
  percentage: inputPercentage,
  size = "md",
  showPercentage = true,
  color = "default",
  className,
}: ProgressCircleProps) {
  // Ensure percentage is between 0 and 100
  const percentage = Math.min(Math.max(0, inputPercentage), 100);
  const [progress, setProgress] = useState(0);

  // Animation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(percentage);
    }, 100);

    return () => clearTimeout(timer);
  }, [percentage]);

  // Calculate circle properties
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Size variations
  const sizes = {
    sm: "w-16 h-16 text-sm",
    md: "w-24 h-24 text-base",
    lg: "w-32 h-32 text-lg",
    xl: "w-40 h-40 text-xl",
  };

  // Color variations
  const colors = {
    default: "text-blue-600 stroke-blue-600",
    success: "text-green-600 stroke-green-600",
    warning: "text-amber-500 stroke-amber-500",
    danger: "text-red-600 stroke-red-600",
  };

  return (
    <div
      className={cn(
        "relative flex items-center justify-center",
        sizes[size],
        className
      )}
    >
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="opacity-10"
        />

        {/* Progress circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className={cn("transition-all duration-1000 ease-out", colors[color])}
        />
      </svg>

      {showPercentage && (
        <div className="absolute inset-0 flex items-center justify-center font-medium">
          {Math.round(progress)}%
        </div>
      )}
    </div>
  );
}
