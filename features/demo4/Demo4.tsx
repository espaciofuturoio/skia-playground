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

export const Demo4 = () => {
  const { width, height } = useWindowDimensions();
  console.log({ width, height });
  // Calculate size based on screen width but with a reasonable maximum
  const canvasSize = Math.min(width * 0.8, height * 0.8);

  // Parse the SVG
  const [scaleRedSvg, orangeSvg] = [Skia.SVG.MakeFromString(scaleRed), Skia.SVG.MakeFromString(orange)];
  const [scaleWidth, scaleHeight] = [scaleRedSvg?.width() || 0, scaleRedSvg?.height() || 0];
  const [orangeWidth, orangeHeight] = [orangeSvg?.width() || 0, orangeSvg?.height() || 0];

  const gridSpacing = 80; // Absolute spacing in pixels
  const gridOffsetX = (canvasSize - (gridSpacing * 3)) / 2; // Center grid horizontally
  const gridOffsetY = 40; // Absolute padding from top in pixels

  // Define circle properties for corners
  const circleRadius = 15; // Size of corner circles
  const circleColor = "#FF00FF"; // Magenta color for visibility

  return (
    <View style={styles.container}>
      <Canvas style={{ width: canvasSize, height: canvasSize }}>
        {/* Corner circles to demonstrate positioning */}
        <Circle cx={0} cy={0} r={circleRadius} color={circleColor} />
        <Circle cx={canvasSize} cy={0} r={circleRadius} color={circleColor} />
        <Circle cx={0} cy={canvasSize} r={circleRadius} color={circleColor} />
        <Circle cx={canvasSize} cy={canvasSize} r={circleRadius} color={circleColor} />

        <Group>
          <ImageSVG
            svg={scaleRedSvg}
          />
        </Group>
        {/* Grid of oranges positioned above the scale */}
        {orangeGrid.map((item) => (
          <Group key={item.id}>
            <ImageSVG
              svg={orangeSvg}
              x={gridOffsetX + (item.col * gridSpacing)}
              y={gridOffsetY + (item.row * gridSpacing)}
            />
          </Group>
        ))}
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'red',
  },
});