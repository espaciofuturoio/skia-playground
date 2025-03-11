import { Canvas, Group, ImageSVG, Skia, Text } from "@shopify/react-native-skia";
import { scaleGreyWithDisplay } from "./scale-grey-with-display";
import { scaleGrey } from "./scale-grey";

import { orange } from "./orange";
import { View } from "react-native";
import { useLedSledSkiaFonts, useNotoMathSkiaFonts } from "@/components/skia-fonts/skia-fonts";
import { lemon } from "./lemon";
import type { GridItem } from "./types";
import { useMemo } from "react";
import { DrawCorners } from "./DrawCorners";

const yOffset = 40;
export const ScaleGrey = ({
  leftGrid,
  rightGrid,
  rightOffset = 230,
  width = 380,
  height = 250,
  fontSize = 25,
  displayValue = "",
  debug = false,
  gridColumns = 3,
  gridRows = 3
}: {
  leftGrid: GridItem[];
  rightGrid: GridItem[];
  rightOffset?: number;
  width?: number;
  height?: number;
  fontSize?: number;
  displayValue?: string;
  debug?: boolean;
  gridColumns?: number;
  gridRows?: number;
}) => {
  const font = useNotoMathSkiaFonts(fontSize);
  const scaleFont = useLedSledSkiaFonts(fontSize);

  // Make canvas size responsive with separate dimensions for x and y
  const canvasSizeX = width;
  const canvasSizeY = height;

  // Parse the SVG with useMemo to prevent unnecessary re-parsing
  const svgElements = useMemo(() => {
    const [scaleGreySvg, orangeSvg, lemonSvg] = [
      Skia.SVG.MakeFromString(displayValue ? scaleGreyWithDisplay : scaleGrey),
      Skia.SVG.MakeFromString(orange),
      Skia.SVG.MakeFromString(lemon)
    ];

    const [scaleWidth, scaleHeight] = [scaleGreySvg?.width() || 0, scaleGreySvg?.height() || 0];
    const orangeHeight = orangeSvg?.height() || 0;

    // Make gridLeft spacing proportional to canvas width
    // Adjusting for the max number of columns in the grid
    const gridSpacing = (scaleWidth / 2) / (gridColumns + 2); // Proportional spacing

    const xOriginScale = Math.round(-scaleWidth / 2);
    const yOriginScale = Math.round(scaleHeight / 2) - yOffset;

    return {
      scaleGreySvg,
      orangeSvg,
      lemonSvg,
      scaleWidth,
      scaleHeight,
      orangeHeight,
      gridSpacing,
      xOriginScale,
      yOriginScale
    };
  }, [displayValue, gridColumns]);

  const {
    scaleGreySvg,
    orangeSvg,
    lemonSvg,
    scaleWidth,
    scaleHeight,
    orangeHeight,
    gridSpacing,
    xOriginScale,
    yOriginScale
  } = svgElements;

  console.log({ scaleWidth, scaleHeight });

  if (!font) return null;

  return (

    <Canvas style={{ width: canvasSizeX, height: canvasSizeY }}>
      <Group transform={[
        { translateX: canvasSizeX / 2 },
        { translateY: canvasSizeY / 2 },
      ]}>
        <ImageSVG
          svg={scaleGreySvg}
          x={xOriginScale}
          y={yOriginScale}
        />

        {displayValue && <Text text={displayValue} x={xOriginScale + 50} y={yOriginScale + 73} font={scaleFont} />}

        <Group transform={[
          { translateX: xOriginScale },
          { translateY: Math.round(yOriginScale - orangeHeight) },
        ]}>

          {/* Grid of items positioned above the scale - left side */}
          {leftGrid.map((item) => {
            const x = Math.round(item.row * gridSpacing) + (item.offset?.x || 1);
            const y = -Math.round(item.col * gridSpacing) + (item.offset?.y || 4);
            const textSize = item.text?.length ? item.text?.length * fontSize : 0;
            return (
              <Group key={item.id} >
                <ImageSVG
                  svg={item.type === "orange" ? orangeSvg : lemonSvg}
                  x={x}
                  y={y}
                />
                {item.text && <Text text={item.text} x={x + gridSpacing / 2 - 2 - textSize * 0.16} y={y + gridSpacing / 2 + 16} font={font} />}
              </Group>
            )
          }
          )}

          {/* Grid of items positioned above the scale - right side */}
          {rightGrid.map((item) => {
            const x = Math.round(item.row * gridSpacing + rightOffset) + (item.offset?.x || 1);
            const y = -Math.round(item.col * gridSpacing) + (item.offset?.y || 4);
            const textSize = item.text?.length ? item.text?.length * fontSize : 0;
            return (
              <Group key={item.id} >
                <ImageSVG
                  svg={item.type === "orange" ? orangeSvg : lemonSvg}
                  x={x}
                  y={y}
                />
                {item.text && <Text text={item.text} x={x + gridSpacing / 2 - 2 - textSize * 0.16} y={y + gridSpacing / 2 + 16} font={font} />}
              </Group>
            )
          }
          )}
        </Group>
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