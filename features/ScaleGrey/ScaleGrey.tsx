import { Canvas, Group, ImageSVG, Skia, Text } from "@shopify/react-native-skia";
import { scaleGrey } from "./scale-grey-with-display";
import { orange } from "./orange";
import { View, StyleSheet } from "react-native";
import { useNotoMathSkiaFonts } from "@/components/skia-fonts/skia-fonts";
import { lemon } from "./lemon";
import type { ScaleGreyProps } from "./types";

const fontSize = 25;

export const ScaleGrey = ({ leftGrid, rightGrid, rightOffset = 230, width = 380, height = 300, }: ScaleGreyProps) => {

  const font = useNotoMathSkiaFonts(fontSize);
  // Make canvas size responsive with separate dimensions for x and y
  const canvasSizeX = width;
  const canvasSizeY = height;

  // Parse the SVG
  const [scaleRedSvg, orangeSvg, lemonSvg] = [Skia.SVG.MakeFromString(scaleGrey), Skia.SVG.MakeFromString(orange), Skia.SVG.MakeFromString(lemon)];
  const [scaleWidth, scaleHeight] = [scaleRedSvg?.width() || 0, scaleRedSvg?.height() || 0];
  const [orangeWidth, orangeHeight] = [orangeSvg?.width() || 0, orangeSvg?.height() || 0];
  const [lemonWidth, lemonHeight] = [lemonSvg?.width() || 0, lemonSvg?.height() || 0];

  // Make gridLeft spacing proportional to canvas width
  const gridItemsPerRow = 3;
  const gridSpacing = (scaleWidth / 2) / (gridItemsPerRow + 2); // Proportional spacing

  console.log({ scaleWidth, scaleHeight });

  const xOriginScale = Math.round(-scaleWidth / 2);
  const yOriginScale = Math.round(scaleHeight / 2);

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
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
});