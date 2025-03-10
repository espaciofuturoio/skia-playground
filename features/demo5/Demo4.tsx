import { Canvas, Group, ImageSVG, fitbox, rect, Skia, Circle, Rect } from "@shopify/react-native-skia";
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

const [width, height] = [380, 380];
export const Demo4 = () => {

  // Make canvas size responsive with separate dimensions for x and y
  const canvasSizeX = width;
  const canvasSizeY = height;

  // Parse the SVG
  const [scaleRedSvg, orangeSvg] = [Skia.SVG.MakeFromString(scaleRed), Skia.SVG.MakeFromString(orange)];
  const [scaleWidth, scaleHeight] = [scaleRedSvg?.width() || 0, scaleRedSvg?.height() || 0];
  const [orangeWidth, orangeHeight] = [orangeSvg?.width() || 0, orangeSvg?.height() || 0];

  // Center points of the canvas
  const centerX = canvasSizeX / 2;
  const centerY = canvasSizeY / 2;

  // Grid configuration for oranges
  const gridItemsPerRow = 3;
  // Use original orange size without scaling
  const gridSpacingX = orangeWidth * 1.2; // 20% padding between oranges
  const gridSpacingY = orangeHeight * 1.2;

  // Calculate total grid width and height
  const gridWidth = gridItemsPerRow * gridSpacingX;

  // Position the entire grid above the scale
  // Calculate how far above the scale to position the grid
  const scaleTopY = centerY - (scaleHeight / 2);
  const gridBottomY = scaleTopY - 20; // 20px gap between grid and scale

  // Top padding
  const gridOffsetY = 10;

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

        {/* Scale centered in the canvas */}
        <Group>
          <ImageSVG
            svg={scaleRedSvg}
            x={centerX - (scaleWidth / 2)}
            y={centerY - (scaleHeight / 2)}
          />
          <Rect x={centerX - 5} y={centerY} width={10} height={10} color={"red"} />
        </Group>

        {/* Grid of oranges positioned above the scale */}
        <Group>
          {orangeGrid.map((item) => {
            // Calculate position for each orange
            const startX = centerX - (gridWidth / 2) + (orangeWidth / 2);
            const x = startX + (item.col * gridSpacingX);

            // Position rows from bottom to top, starting above the scale
            const y = gridBottomY - ((orangeGrid.length / gridItemsPerRow - item.row) * gridSpacingY);

            return (
              <Group key={item.id}>
                <ImageSVG
                  svg={orangeSvg}
                  x={x - (orangeWidth / 2)}
                  y={y - (orangeHeight / 2)}
                />
              </Group>
            );
          })}
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