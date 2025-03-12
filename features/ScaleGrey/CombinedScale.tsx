import React from "react";
import { Canvas, Group, ImageSVG, Skia, Text } from "@shopify/react-native-skia";
import { scaleGreyWithDisplay } from "./scale-grey-with-display";
import { scaleGrey } from "./scale-grey";
import { scaleRed } from "./scale-red";
import { orange } from "./orange";
import { useLedSledSkiaFonts, useNotoMathSkiaFonts } from "@/components/skia-fonts/skia-fonts";
import { lemon } from "./lemon";
import type { GridItem } from "./types";
import { useMemo } from "react";
import { DrawCorners } from "./DrawCorners";

const yRedOffset = 0
const yGreyOffset = 49

const canvasSizeX = 380;
const canvasSizeY = 400;
const gridColumns = 3;

export const CombinedScale = ({
  leftGrid = [],
  rightGrid = [],
  redGrid = [],
  showGreyScale = true,
  showRedScale = true,
  rightOffset = 230,
  fontSize = 25,
  greyDisplayValue = "",
  redDisplayValue = "",
  debug = false,
}: {
  leftGrid?: GridItem[];
  rightGrid?: GridItem[];
  redGrid?: GridItem[];
  showGreyScale?: boolean;
  showRedScale?: boolean;
  rightOffset?: number;
  fontSize?: number;
  greyDisplayValue?: string;
  redDisplayValue?: string;
  debug?: boolean;
  scale?: number;
}) => {
  const font = useNotoMathSkiaFonts(fontSize);
  const scaleFont = useLedSledSkiaFonts(fontSize);

  // Parse the SVG with useMemo to prevent unnecessary re-parsing
  const svgElements = useMemo(() => {
    const [scaleGreySvg, scaleRedSvg, orangeSvg, lemonSvg] = [
      Skia.SVG.MakeFromString(greyDisplayValue ? scaleGreyWithDisplay : scaleGrey),
      Skia.SVG.MakeFromString(scaleRed),
      Skia.SVG.MakeFromString(orange),
      Skia.SVG.MakeFromString(lemon)
    ];

    const [greyScaleWidth, greyScaleHeight] = [scaleGreySvg?.width() || 0, scaleGreySvg?.height() || 0];
    const [redScaleWidth, redScaleHeight] = [scaleRedSvg?.width() || 0, scaleRedSvg?.height() || 0];
    const [orangeWidth, orangeHeight] = [orangeSvg?.width() || 0, orangeSvg?.height() || 0];
    const [lemonWidth, lemonHeight] = [lemonSvg?.width() || 0, lemonSvg?.height() || 0];

    // Make grid spacing proportional to canvas width
    const gridSpacing = (greyScaleWidth / 2) / (gridColumns + 2); // Proportional spacing

    const greyXOriginScale = Math.round(-greyScaleWidth / 2);
    const greyYOriginScale = Math.round(redScaleHeight / 2) - yGreyOffset;

    const redXOriginScale = Math.round(-redScaleWidth / 2);
    const redYOriginScale = Math.round(canvasSizeY / 2) - yRedOffset;

    return {
      scaleGreySvg,
      scaleRedSvg,
      orangeSvg,
      lemonSvg,
      greyScaleWidth,
      greyScaleHeight,
      redScaleWidth,
      redScaleHeight,
      orangeWidth,
      orangeHeight,
      lemonWidth,
      lemonHeight,
      gridSpacing,
      greyXOriginScale,
      greyYOriginScale,
      redXOriginScale,
      redYOriginScale
    };
  }, [greyDisplayValue]);

  const {
    scaleGreySvg,
    scaleRedSvg,
    orangeSvg,
    lemonSvg,
    orangeHeight,
    gridSpacing,
    greyXOriginScale,
    greyYOriginScale,
    redXOriginScale,
    redYOriginScale
  } = svgElements;

  if (!font) return null;

  return (
    <Canvas style={{ width: canvasSizeX, height: canvasSizeY }}>
      <Group transform={[
        { translateX: canvasSizeX / 2 },
        { translateY: canvasSizeY / 4 },
      ]}>
        {/* Grey Scale */}
        {showGreyScale && (
          <>
            <ImageSVG
              svg={scaleGreySvg}
              x={greyXOriginScale}
              y={greyYOriginScale}
            />

            {greyDisplayValue && (
              <Text
                text={greyDisplayValue}
                x={greyXOriginScale + 50}
                y={greyYOriginScale + 73}
                font={scaleFont}
              />
            )}

            <Group transform={[
              { translateX: greyXOriginScale },
              { translateY: Math.round(greyYOriginScale - orangeHeight) },
            ]}>
              {/* Grid of items positioned above the scale - left side */}
              {leftGrid.map((item) => {
                const x = Math.round(item.row * gridSpacing) + (item.offset?.x || 1);
                const y = -Math.round(item.col * gridSpacing) + (item.offset?.y || 4);
                const textSize = item.text?.length ? item.text?.length * fontSize : 0;
                return (
                  <Group key={`grey-left-${item.id}`}>
                    <ImageSVG
                      svg={item.type === "orange" ? orangeSvg : lemonSvg}
                      x={x}
                      y={y}
                    />
                    {item.text && (
                      <Text
                        text={item.text}
                        x={x + gridSpacing / 2 - 2 - textSize * 0.16}
                        y={y + gridSpacing / 2 + 16}
                        font={font}
                      />
                    )}
                  </Group>
                );
              })}

              {/* Grid of items positioned above the scale - right side */}
              {rightGrid.map((item) => {
                const x = Math.round(item.row * gridSpacing + rightOffset) + (item.offset?.x || 1);
                const y = -Math.round(item.col * gridSpacing) + (item.offset?.y || 4);
                const textSize = item.text?.length ? item.text?.length * fontSize : 0;
                return (
                  <Group key={`grey-right-${item.id}`}>
                    <ImageSVG
                      svg={item.type === "orange" ? orangeSvg : lemonSvg}
                      x={x}
                      y={y}
                    />
                    {item.text && (
                      <Text
                        text={item.text}
                        x={x + gridSpacing / 2 - 2 - textSize * 0.16}
                        y={y + gridSpacing / 2 + 16}
                        font={font}
                      />
                    )}
                  </Group>
                );
              })}
            </Group>
          </>
        )}

        {/* Red Scale */}
        {showRedScale && (
          <>
            <ImageSVG
              svg={scaleRedSvg}
              x={redXOriginScale}
              y={redYOriginScale}
            />

            {redDisplayValue && (
              <Text
                text={redDisplayValue}
                x={redXOriginScale + 50}
                y={redYOriginScale + 73}
                font={scaleFont}
              />
            )}

            <Group transform={[
              { translateX: redXOriginScale },
              { translateY: Math.round(redYOriginScale - orangeHeight) },
            ]}>
              {/* Grid of items positioned above the red scale */}
              {redGrid.map((item) => {
                const x = Math.round(item.row * gridSpacing) + (item.offset?.x || 1);
                const y = -Math.round(item.col * gridSpacing) + (item.offset?.y || 1);
                const textSize = item.text?.length ? item.text.length * fontSize : 0;
                return (
                  <Group key={`red-${item.id}`}>
                    <ImageSVG
                      svg={item.type === "orange" ? orangeSvg : lemonSvg}
                      x={x}
                      y={y}
                    />
                    {item.text && (
                      <Text
                        text={item.text}
                        x={x + gridSpacing / 2 - 2 - textSize * 0.16}
                        y={y + gridSpacing / 2 + 16}
                        font={font}
                      />
                    )}
                  </Group>
                );
              })}
            </Group>
          </>
        )}
      </Group>

      {/* Corner circles to demonstrate positioning */}
      <DrawCorners
        debug={debug}
        width={canvasSizeX}
        height={canvasSizeY}
      />
    </Canvas>
  );
}; 