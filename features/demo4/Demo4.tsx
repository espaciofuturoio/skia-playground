import { Canvas, Group, ImageSVG, fitbox, rect, Skia, Circle, Rect, matchFont, Text } from "@shopify/react-native-skia";
import { scaleRed } from "./scale-red";
import { orange } from "./orange";
import { useWindowDimensions, View, StyleSheet, Platform } from "react-native";
import { useLedSledSkiaFonts, useNotoMathSkiaFonts } from "@/components/skia-fonts/skia-fonts";

const orangeGrid = [
  { id: 1, row: 0, col: 0, text: "1" },
  { id: 2, row: 0, col: 1, text: "2" },
  { id: 3, row: 0, col: 2, text: "3" },
  { id: 4, row: 1, col: 0, text: "4" },
  { id: 5, row: 1, col: 1, text: "?" },
  { id: 6, row: 1, col: 2, text: "26" },
];



const [width, height] = [380, 300];
export const Demo4 = () => {
  const fontSize = 25;
  const font = useNotoMathSkiaFonts(fontSize);
  const scaleFont = useLedSledSkiaFonts(fontSize);

  // Make canvas size responsive with separate dimensions for x and y
  const canvasSizeX = width;
  const canvasSizeY = height;

  // Parse the SVG
  const [scaleRedSvg, orangeSvg] = [Skia.SVG.MakeFromString(scaleRed), Skia.SVG.MakeFromString(orange)];
  const [scaleWidth, scaleHeight] = [scaleRedSvg?.width() || 0, scaleRedSvg?.height() || 0];
  const [orangeWidth, orangeHeight] = [orangeSvg?.width() || 0, orangeSvg?.height() || 0];

  // Make grid spacing proportional to canvas width
  const gridItemsPerRow = 3;
  const gridSpacing = scaleWidth / (gridItemsPerRow + 1); // Proportional spacing

  // Define circle properties relative to canvas size
  const circleRadius = Math.min(canvasSizeX, canvasSizeY) * 0.02; // 2% of smallest dimension

  console.log({ scaleWidth, scaleHeight });

  const xOriginScale = Math.round(-scaleWidth / 2);
  const yOriginScale = Math.round(scaleHeight / 2);


  console.log({ xOriginScale, yOriginScale, orangeWidth, orangeHeight, scaleWidth, scaleHeight, gridSpacing });

  const src = rect(0, 0, scaleRedSvg?.width() || 0, scaleRedSvg?.height() || 0);
  const dst = rect(0, 0, canvasSizeX, canvasSizeY);

  if (!font) return null;

  return (
    <View style={styles.container}>
      <Canvas style={{ width: canvasSizeX, height: canvasSizeY }}>
        {/* Corner circles to demonstrate positioning */}
        <Circle cx={0} cy={0} r={circleRadius} color={"#FF0033"} />
        <Circle cx={canvasSizeX} cy={0} r={circleRadius} color={"#FF00FF"} />
        <Circle cx={0} cy={canvasSizeY} r={circleRadius} color={"blue"} />
        <Circle cx={canvasSizeX} cy={canvasSizeY} r={circleRadius} color={"green"} />

        <Group transform={[
          { translateX: canvasSizeX / 2 },
          { translateY: canvasSizeY / 2 },
        ]}>

          {/* <Rect x={-5} y={5} width={10} height={10} color={"red"} /> */}
          <ImageSVG
            svg={scaleRedSvg}
            x={xOriginScale}
            y={yOriginScale}
          />

          <Text text="600" x={xOriginScale + 50} y={yOriginScale + 74} font={scaleFont} />
          {/* <Text text="600" x={xOriginScale + 50} y={yOriginScale + 74} font={font} /> */}
          <Group transform={[
            { translateX: xOriginScale },
            { translateY: Math.round(yOriginScale - orangeHeight) },
          ]}>

            {/* Grid of oranges positioned above the scale */}
            {orangeGrid.map((item) => {
              const x = Math.round(item.row * gridSpacing) + 1;
              const y = -Math.round(item.col * gridSpacing) + 1;
              const textSize = item.text?.length ? item.text?.length * fontSize : 0;
              return (<Group key={item.id} >

                <ImageSVG
                  svg={orangeSvg}
                  x={x}
                  y={y}
                />
                {item.text && <Text text={item.text} x={x + gridSpacing / 2 - 2 - textSize * 0.16} y={y + gridSpacing / 2 + 16} font={font} />}
              </Group>)
            }

            )}


          </Group>



        </Group>
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    // borderColor: 'red',
  },
});