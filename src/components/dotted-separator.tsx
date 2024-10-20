import React from "react";

import { cn } from "@/lib/utils";

export interface DottedSeparatorProps {
  className?: string;
  color?: string;
  height?: string;
  dotSize?: string;
  gapSize?: string;
  direction?: "horizontal" | "vertical";
}

const DottedSeparator = ({
  className,
  color = "#d4d4d8",
  height = "2px",
  dotSize = "2px",
  gapSize = "6px",
  direction = "horizontal",
}: DottedSeparatorProps) => {
  const isHorizontal = direction === "horizontal";
  return (
    <div
      className={cn(
        isHorizontal ? "w-full flex items-center" : "h-full flex flex-col",
        className
      )}
    >
      <div
        className={cn(isHorizontal ? "flex-grow" : "flex-grow-0")}
        style={{
          width: isHorizontal ? "100%" : height,
          height: isHorizontal ? height : "100%",
          backgroundImage: `radial-gradient(circle, ${color} 25%, transparent 25%)`,
          backgroundSize: isHorizontal
            ? `  ${parseInt(dotSize) + parseInt(gapSize)}px ${height}`
            : `${height} ${parseInt(dotSize) + parseInt(gapSize)}px`,
          backgroundRepeat: isHorizontal ? "repeat-x" : "repeat-y",
          backgroundPosition: "center",
        }}
      />
    </div>
  );
};

export default DottedSeparator;