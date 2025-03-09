import { Canvas, Group, ImageSVG, Skia } from "@shopify/react-native-skia";
import { scaleRed } from "./scale-red";
import { orange } from "./orange";
import { View, StyleSheet } from "react-native";

// Define array of oranges for grid
const orangeGrid = [
  { id: 1, row: 0, col: 0 },
  { id: 2, row: 0, col: 1 },
  { id: 3, row: 0, col: 2 },
  { id: 4, row: 1, col: 0 },
  { id: 5, row: 1, col: 1 },
  { id: 6, row: 1, col: 2 },
];

export const Demo4 = () => {
  // Fixed canvas size
  const canvasWidth = 375;
  const canvasHeight = 375;

  // Parse the SVG
  const [scaleRedSvg, orangeSvg] = [Skia.SVG.MakeFromString(scaleRed), Skia.SVG.MakeFromString(orange)];

  // Grid calculations with absolute distances
  const orangeSize = 50; // Natural size for positioning calculation only
  const gridSpacing = 80; // Absolute spacing in pixels
  const gridOffsetX = (canvasWidth - (gridSpacing * 3)) / 2; // Center grid horizontally
  const gridOffsetY = 40; // Absolute padding from top in pixels

  return (
    <View style={styles.container}>
      <Canvas style={{ width: canvasWidth, height: canvasHeight }}>
        {/* Scale positioned at the bottom */}
        <Group>
          <ImageSVG
            svg={scaleRedSvg}
            x={0}
            y={canvasHeight - 175} // Positioned at bottom with some margin
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
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'red',
  },
});