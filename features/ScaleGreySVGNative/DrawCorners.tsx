import React from "react";
import { Circle } from "react-native-svg";

export const DrawCorners = ({ width, height, circleRadius = 5, debug = false }: {
  width: number;
  height: number;
  circleRadius?: number;
  debug?: boolean;
}) => {
  if (!debug) return null;
  return (
    <>
      {/* Top-left corner */}
      <Circle cx={0} cy={0} r={circleRadius} fill="#FF0033" />

      {/* Top-right corner */}
      <Circle cx={width} cy={0} r={circleRadius} fill="#FF00FF" />

      {/* Bottom-left corner */}
      <Circle cx={0} cy={height} r={circleRadius} fill="blue" />

      {/* Bottom-right corner */}
      <Circle cx={width} cy={height} r={circleRadius} fill="green" />

      {/* Center point for reference */}
      <Circle cx={width / 2} cy={height / 2} r={circleRadius} fill="yellow" />
    </>
  );
}; 