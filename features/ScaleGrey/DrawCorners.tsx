import React from "react";
import { Circle } from "@shopify/react-native-skia";

export const DrawCorners = ({ width, height, circleRadius = 5, debug = false }: {
  width: number;
  height: number;
  circleRadius?: number;
  debug?: boolean;
}) => {
  if (!debug) return null;
  return (
    <>
      <Circle cx={0} cy={0} r={circleRadius} color={"#FF0033"} />
      <Circle cx={width} cy={0} r={circleRadius} color={"#FF00FF"} />
      <Circle cx={0} cy={height} r={circleRadius} color={"blue"} />
      <Circle cx={width} cy={height} r={circleRadius} color={"green"} />
    </>
  );
}; 