import { Canvas, ImageSVG, Skia } from "@shopify/react-native-skia";
import { svgString } from "./assets";
import { useWindowDimensions, View, StyleSheet } from "react-native";

export const Demo1 = () => {
  const { width } = useWindowDimensions();
  // Calculate size based on screen width but with a reasonable maximum
  const canvasSize = Math.min(width * 0.9, 500);

  const svg = Skia.SVG.MakeFromString(svgString);

  return (
    <View style={styles.container}>
      <Canvas style={{ width: canvasSize, height: canvasSize }}>
        {svg && (
          <ImageSVG
            svg={svg}
            x={0}
            y={0}
            width={canvasSize}
            height={canvasSize}
          />
        )}
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 8,
  },
});