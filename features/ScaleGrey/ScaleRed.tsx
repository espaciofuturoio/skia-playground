import React from "react";
import { Canvas, Group, ImageSVG, Skia, Text } from "@shopify/react-native-skia";
import { scaleRed } from "./scale-red";
import { orange } from "./orange";
import { View } from "react-native";
import { useLedSledSkiaFonts, useNotoMathSkiaFonts } from "@/components/skia-fonts/skia-fonts";
import { lemon } from "./lemon";
import type { GridItem } from "./types";
import { useMemo } from "react";
import { DrawCorners } from "./DrawCorners";

const yOffset = 40;
export const ScaleRed = ({
  grid,
  width = 380,
  height = 300,
  fontSize = 25,
  displayValue = "",
  debug = false,
  scale = 1
}: {
  grid: GridItem[];
  width?: number;
  height?: number;
  fontSize?: number;
  displayValue?: string;
  debug?: boolean;
  scale?: number;
}) => {
  const font = useNotoMathSkiaFonts(fontSize);
  const scaleFont = useLedSledSkiaFonts(fontSize);

  // Make canvas size responsive with separate dimensions for x and y
  const canvasSizeX = width;
  const canvasSizeY = height;

  // Parse the SVG with useMemo to prevent unnecessary re-parsing
  const svgElements = useMemo(() => {
    const [scaleRedSvg, orangeSvg, lemonSvg] = [
      Skia.SVG.MakeFromString(scaleRed),
      Skia.SVG.MakeFromString(orange),
      Skia.SVG.MakeFromString(lemon)
    ];

    const [scaleWidth, scaleHeight] = [scaleRedSvg?.width() || 0, scaleRedSvg?.height() || 0];
    const [orangeWidth, orangeHeight] = [orangeSvg?.width() || 0, orangeSvg?.height() || 0];
    const [lemonWidth, lemonHeight] = [lemonSvg?.width() || 0, lemonSvg?.height() || 0];

    // Make grid spacing proportional to canvas width
    const gridItemsPerRow = 3;
    const gridSpacing = scaleWidth / (gridItemsPerRow + 2); // Proportional spacing

    const xOriginScale = Math.round(-scaleWidth / 2);
    const yOriginScale = Math.round(scaleHeight / 2) - yOffset;

    return {
      scaleRedSvg,
      orangeSvg,
      lemonSvg,
      scaleWidth,
      scaleHeight,
      orangeWidth,
      orangeHeight,
      lemonWidth,
      lemonHeight,
      gridSpacing,
      xOriginScale,
      yOriginScale
    };
  }, []);

  const {
    scaleRedSvg,
    orangeSvg,
    lemonSvg,
    orangeHeight,
    gridSpacing,
    xOriginScale,
    yOriginScale
  } = svgElements;

  if (!font) return null;

  return (
    <View>
      <Canvas style={{ width: canvasSizeX, height: canvasSizeY }}>

        <Group transform={[
          { translateX: canvasSizeX / 2 },
          { translateY: canvasSizeY / 2 },
        ]}>
          <ImageSVG
            svg={scaleRedSvg}
            x={xOriginScale}
            y={yOriginScale}
          />

          {displayValue && <Text text={displayValue} x={xOriginScale + 50} y={yOriginScale + 73} font={scaleFont} />}

          <Group transform={[
            { translateX: xOriginScale },
            { translateY: Math.round(yOriginScale - orangeHeight) },
          ]}>

            {/* Grid of items positioned above the scale */}
            {grid.map((item) => {
              const x = Math.round(item.row * gridSpacing) + (item.offset?.x || 1);
              const y = -Math.round(item.col * gridSpacing) + (item.offset?.y || 1);
              const textSize = item.text?.length ? item.text.length * fontSize : 0;
              return (
                <Group key={item.id}>
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
        </Group>
        {/* Corner circles to demonstrate positioning */}
        <DrawCorners
          debug={debug}
          width={canvasSizeX}
          height={canvasSizeY}
        />
      </Canvas>
    </View>
  );
};
