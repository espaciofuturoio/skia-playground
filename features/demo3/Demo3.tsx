import { Canvas, Group, ImageSVG, fitbox, rect, Skia } from "@shopify/react-native-skia";
import { scaleRed } from "./scale-red";
import { orange } from "./orange";
import { useWindowDimensions, View, StyleSheet } from "react-native";

export const Demo3 = () => {
  const { width, height } = useWindowDimensions();
  console.log({ width, height });
  // Calculate size based on screen width but with a reasonable maximum
  const canvasSize = Math.min(width * 0.8, height * 0.8);

  // Parse the SVG
  const [scaleRedSvg, orangeSvg] = [Skia.SVG.MakeFromString(scaleRed), Skia.SVG.MakeFromString(orange)];

  const [scaleRedSvgWidth, scaleRedSvgHeight] = [scaleRedSvg?.width() ?? 0, scaleRedSvg?.height() ?? 0];
  const [orangeSvgWidth, orangeSvgHeight] = [orangeSvg?.width() ?? 0, orangeSvg?.height() ?? 0];

  const srcScaleRed = rect(0, 0, scaleRedSvgWidth, scaleRedSvgHeight);
  const dstScaleRed = rect(0, 0, canvasSize, canvasSize);

  const srcOrange = rect(0, 0, orangeSvgWidth, orangeSvgHeight);
  const dstOrange = rect(0, 0, orangeSvgWidth, orangeSvgWidth);
  return (
    <View style={styles.container}>
      <Canvas style={{ width: canvasSize, height: canvasSize }}>
        <Group transform={fitbox("scaleDown", srcScaleRed, dstScaleRed)}>
          <ImageSVG
            svg={scaleRedSvg}
            x={0}
            y={0}
            width={scaleRedSvgWidth}
            height={scaleRedSvgHeight}
          />
        </Group>
        <Group transform={fitbox("scaleDown", srcOrange, dstOrange)}>
          <ImageSVG
            svg={orangeSvg}
            x={0}
            y={0}
            width={orangeSvgWidth}
            height={orangeSvgHeight}
          />
        </Group>
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