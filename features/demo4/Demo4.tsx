import { Canvas, Group, ImageSVG, fitbox, rect, Skia, Circle } from "@shopify/react-native-skia";
import { scaleRed } from "./scale-red";
import { orange } from "./orange";
import { useWindowDimensions, View, StyleSheet } from "react-native";

const orangeGrid = [
  { id: 1, row: 0, col: 0 },
  { id: 2, row: 0, col: 1 },
  { id: 3, row: 0, col: 2 },
  { id: 4, row: 1, col: 0 },
  { id: 5, row: 1, col: 1 },
  { id: 6, row: 1, col: 2 },
];

const [width, height] = [350, 350];
export const Demo4 = () => {

  // Make canvas size responsive with separate dimensions for x and y
  const canvasSizeX = width;
  const canvasSizeY = height;

  // Parse the SVG
  const [scaleRedSvg, orangeSvg] = [Skia.SVG.MakeFromString(scaleRed), Skia.SVG.MakeFromString(orange)];
  const [scaleWidth, scaleHeight] = [scaleRedSvg?.width() || 0, scaleRedSvg?.height() || 0];
  const [orangeWidth, orangeHeight] = [orangeSvg?.width() || 0, orangeSvg?.height() || 0];

  // Make grid spacing proportional to canvas width
  const gridItemsPerRow = 3;
  const gridSpacing = canvasSizeX / (gridItemsPerRow + 1); // Proportional spacing

  // Center grid horizontally with proportional calculations
  const gridOffsetX = (canvasSizeX - (gridSpacing * gridItemsPerRow)) / 2;

  // Top padding as proportion of canvas height
  const gridOffsetY = canvasSizeY * 0.05; // 5% of canvas height

  // Define circle properties relative to canvas size
  const circleRadius = Math.min(canvasSizeX, canvasSizeY) * 0.02; // 2% of smallest dimension

  console.log({ scaleWidth, scaleHeight });

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

          <ImageSVG
            svg={scaleRedSvg}
            x={-(canvasSizeX / 2) + 10}
            y={1}
          />

          {/* Grid of oranges positioned above the scale */}
          {orangeGrid.map((item) => (
            <Group key={item.id}>
              <ImageSVG
                svg={orangeSvg}
                x={gridOffsetX + (item.col * gridSpacing) - (orangeWidth / 2)}
                y={gridOffsetY + (item.row * gridSpacing) - (orangeHeight / 2)}
              />
            </Group>
          ))}
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