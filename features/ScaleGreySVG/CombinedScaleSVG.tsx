import React from "react";
import { View } from "react-native";
import Svg, { G, SvgXml, Text as SvgText } from "react-native-svg";
import { scaleGreyWithDisplay } from "./scale-grey-with-display";
import { scaleGrey } from "./scale-grey";
import { scaleRed } from "./scale-red";
import { orange } from "./orange";
import { useLedSledSkiaFonts, useNotoMathSkiaFonts } from "@/components/skia-fonts/skia-fonts";
import { lemon } from "./lemon";
import type { GridItem } from "./types";
import { DrawCorners } from "./DrawCorners";

// Define a FontData interface
interface FontData {
  family: string;
  size: number;
}

// Add a type for Skia font objects
type SkiaFont = {
  getTypeface?: () => unknown;
  // Add other properties as needed
} | null;

const yRedOffset = 0
const yGreyOffset = 40

const canvasSizeX = 380;
const canvasSizeY = 420;
const gridColumns = 3;
const yFruitTextOffset = 11;
const yRedDisplayTextOffset = 74;
const xRedDisplayTextOffset = 75;


const RedGridItem = ({ item,
  gridSpacing,
  fruitFont,
  scalesFontSize,
  x,
  y,
  textSize,
  orangeSvg,
  lemonSvg }:
  {
    item: GridItem,
    gridSpacing: number,
    fruitFont: FontData,
    scalesFontSize: number,
    orangeSvg: string,
    lemonSvg: string,
    x: number,
    y: number,
    textSize: number
  }) => {
  return (
    <G key={`red-${item.id}`}>
      <SvgXml
        xml={item.type === "orange" ? orangeSvg : lemonSvg}
        x={x}
        y={y}
        width={30}
        height={35}
        origin={`${x + 15}, ${y + 17.5}`}
        // Align with the original sizing
        preserveAspectRatio="xMidYMid meet"
      />
      {item.text && (
        <SvgText
          x={x + gridSpacing / 2 - 2 - textSize * 0.16}
          y={y + gridSpacing / 2 + 11}
          fontFamily={fruitFont.family}
          fontSize={fruitFont.size}
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          {item.text}
        </SvgText>
      )}
    </G>)
}

// Create a utility function to convert Skia font objects to our FontData format
const convertSkiaFontToFontData = (skiaFont: SkiaFont, size: number): FontData | null => {
  if (!skiaFont) return null;

  return {
    family: skiaFont.getTypeface ? "NotoMath" : "LEDSled", // Simplified - in real code should extract the real font family
    size: size
  };
};

export const CombinedScaleSVG = ({
  greyLeftGrid = [],
  greyRightGrid = [],
  redGrid = [],
  showGreyScale = true,
  showRedScale = true,
  rightOffset = 230,
  scalesFontSize = 25,
  fruitFontSize = 20,
  greyDisplayValue = "",
  redDisplayValue = "",
  debug = false,
}: {
  greyLeftGrid?: GridItem[];
  greyRightGrid?: GridItem[];
  redGrid?: GridItem[];
  showGreyScale?: boolean;
  showRedScale?: boolean;
  rightOffset?: number;
  scalesFontSize?: number;
  fruitFontSize?: number;
  greyDisplayValue?: string;
  redDisplayValue?: string;
  debug?: boolean;
  scale?: number;
}) => {
  const fruitSkiaFont = useNotoMathSkiaFonts(fruitFontSize);
  const scaleSkiaFont = useLedSledSkiaFonts(scalesFontSize);

  // Convert Skia fonts to our FontData format
  const fruitFont = convertSkiaFontToFontData(fruitSkiaFont, fruitFontSize);
  const scaleFont = convertSkiaFontToFontData(scaleSkiaFont, scalesFontSize);

  // Prepare SVG data for use with SvgXml - no need for useMemo with React compiler
  const scaleGreySvgData = greyDisplayValue ? scaleGreyWithDisplay : scaleGrey;
  const scaleRedSvgData = scaleRed;
  const orangeSvgData = orange;
  const lemonSvgData = lemon;

  // Since we don't have access to Skia's measurement functions, 
  // we'll need to hardcode or extract dimensions from the SVG
  const greyScaleWidth = 215.449; // From viewBox in SVG
  const greyScaleHeight = 57.848;
  const redScaleWidth = 230; // Estimated from the original scale
  const redScaleHeight = 60;
  const orangeWidth = 16.859; // From viewBox in SVG
  const orangeHeight = 19.606;
  const lemonWidth = 20; // Estimated size
  const lemonHeight = 20;

  // Make grid spacing proportional to canvas width
  const gridSpacing = 35; // Proportional spacing

  // Adjusted origin scales to match Skia positioning
  const greyXOriginScale = Math.round(-canvasSizeX / 2) + 20;
  const greyYOriginScale = Math.round(redScaleHeight / 2) - yGreyOffset;

  const redXOriginScale = Math.round(-canvasSizeX / 4) + 15;
  const redYOriginScale = Math.round(canvasSizeY / 2) - yRedOffset;

  if (!fruitFont || !scaleFont) return null;

  return (
    <View style={{ width: canvasSizeX, height: canvasSizeY }}>
      <View style={{ width: canvasSizeX, height: canvasSizeY, ...debug ? { borderWidth: 1, borderColor: "red" } : {} }}>
        <Svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${canvasSizeX} ${canvasSizeY}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <G transform={`translate(${canvasSizeX / 2}, ${canvasSizeY / 4})`}>
            {/* Grey Scale */}
            {showGreyScale && (
              <>
                <SvgXml
                  xml={scaleGreySvgData}
                  x={greyXOriginScale}
                  y={greyYOriginScale}
                  preserveAspectRatio="xMidYMid meet"
                />

                {greyDisplayValue && (
                  <SvgText
                    x={greyXOriginScale + 50}
                    y={greyYOriginScale + 73}
                    fontFamily={scaleFont.family}
                    fontSize={scaleFont.size}
                    textAnchor="middle"
                  >
                    {greyDisplayValue}
                  </SvgText>
                )}

                <G transform={`translate(${greyXOriginScale}, ${Math.round(greyYOriginScale - 35)})`}>
                  {/* Grid of items positioned above the scale - left side */}
                  {greyLeftGrid.map((item) => {
                    const x = Math.round(item.col * gridSpacing) + (item.offset?.x || 1);
                    const y = -Math.round(item.row * gridSpacing) + (item.offset?.y || 4);
                    const textSize = item.text?.length ? item.text?.length * scalesFontSize : 0;
                    return (
                      <G key={`grey-left-${item.id}`}>
                        <SvgXml
                          xml={item.type === "orange" ? orangeSvgData : lemonSvgData}
                          x={x}
                          y={y}
                          width={30}
                          height={35}
                          preserveAspectRatio="xMidYMid meet"
                          origin={`${x + 15}, ${y + 17.5}`}
                        />
                        {item.text && (
                          <SvgText
                            x={x + gridSpacing / 2}
                            y={y + gridSpacing / 2 + yFruitTextOffset}
                            fontFamily={fruitFont.family}
                            fontSize={fruitFont.size}
                            textAnchor="middle"
                            alignmentBaseline="middle"
                          >
                            {item.text}
                          </SvgText>
                        )}
                      </G>
                    );
                  })}

                  {/* Grid of items positioned above the scale - right side */}
                  {greyRightGrid.map((item) => {
                    const x = Math.round(item.col * gridSpacing + rightOffset) + (item.offset?.x || 1);
                    const y = -Math.round(item.row * gridSpacing) + (item.offset?.y || 4);
                    const textSize = item.text?.length ? item.text?.length * scalesFontSize : 0;
                    return (
                      <G key={`grey-right-${item.id}`}>
                        <SvgXml
                          xml={item.type === "orange" ? orangeSvgData : lemonSvgData}
                          x={x}
                          y={y}
                          width={30}
                          height={35}
                          preserveAspectRatio="xMidYMid meet"
                          origin={`${x + 15}, ${y + 17.5}`}
                        />
                        {item.text && (
                          <SvgText
                            x={x + gridSpacing / 2}
                            y={y + gridSpacing / 2 + yFruitTextOffset}
                            fontFamily={fruitFont.family}
                            fontSize={fruitFont.size}
                            textAnchor="middle"
                            alignmentBaseline="middle"
                          >
                            {item.text}
                          </SvgText>
                        )}
                      </G>
                    );
                  })}
                </G>
              </>
            )}

            {/* Red Scale */}
            {showRedScale && (
              <>
                <SvgXml
                  xml={scaleRedSvgData}
                  x={redXOriginScale}
                  y={redYOriginScale}
                  preserveAspectRatio="xMidYMid meet"
                />

                {redDisplayValue && (
                  <SvgText
                    x={redXOriginScale + xRedDisplayTextOffset}
                    y={redYOriginScale + yRedDisplayTextOffset}
                    fontFamily={scaleFont.family}
                    fontSize={scaleFont.size}
                    textAnchor="middle"
                  >
                    {redDisplayValue}
                  </SvgText>
                )}

                <G transform={`translate(${redXOriginScale}, ${Math.round(redYOriginScale - 35)})`}>
                  {/* Grid of items positioned above the red scale */}
                  {redGrid.map((item) => {
                    const x = Math.round(item.col * gridSpacing) + (item.offset?.x || 1);
                    const y = -Math.round(item.row * gridSpacing) + (item.offset?.y || 1);
                    const textSize = item.text?.length ? item.text.length * scalesFontSize : 0;
                    return (
                      <RedGridItem
                        key={`red-${item.id}`}
                        item={item}
                        gridSpacing={gridSpacing}
                        fruitFont={fruitFont}
                        scalesFontSize={scalesFontSize}
                        x={x}
                        y={y}
                        textSize={textSize}
                        orangeSvg={orangeSvgData}
                        lemonSvg={lemonSvgData}
                      />
                    );
                  })}
                </G>
              </>
            )}
          </G>

          {/* Corner circles to demonstrate positioning */}
          {debug && <DrawCorners width={canvasSizeX} height={canvasSizeY} />}
        </Svg>
      </View>

    </View>
  );
}; 