import { Heart } from "lucide-react";
import { useState } from "react";
import type { CSSProperties } from "react";

interface HeartIconProps {
  size?: number;
  stroke?: string;
  fillColor?: string;
  style?: CSSProperties;
  className?: string;
}

export const HeartIcon = ({
  size = 24,
  stroke = "red",
  fillColor = "red",
  style,
  className,
}: HeartIconProps) => {
  const [liked, setLiked] = useState(false);

  return (
    <Heart
      onClick={() => setLiked(!liked)}
      className={className}
      size={size}
      style={{
        fill: liked ? fillColor : "none",
        stroke,
        strokeWidth: 1.5,
        cursor: "pointer",
        transition: "fill 0.2s ease",
        ...style,
      }}
    />
  );
};
