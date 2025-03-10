import { useFonts, matchFont, useFont } from "@shopify/react-native-skia";

// export const useSkiaFonts = () => {
//   const fonts = useFonts({
//     KgTraditionalFractions: [
//       require("./KgTraditionalFractions-dqJX.ttf"),
//       require("./KgTraditionalFractions2-Pl5m.ttf"),
//     ]
//   });
//   if (!fonts) return null;
//   const fontStyle = {
//     fontFamily: "KgTraditionalFractions",
//     fontWeight: "bold",
//     fontSize: 16
//   } as const;
//   const font = matchFont(fontStyle, fonts);
//   return font;
// };

// https://www.fontspace.com/kg-traditional-fractions-font-f17086
export const useFractionSkiaFonts = (fontSize: number) => {
  const font = useFont(require("./KgTraditionalFractions2-Pl5m.ttf"), fontSize);
  if (!font) return null;
  return font;
};

// https://www.fontspace.com/latin-modern-math-font-f86521
export const useLatinModernMathSkiaFonts = (fontSize: number) => {
  const font = useFont(require("./LatinmodernmathRegular-z8EBa.otf"), fontSize);
  if (!font) return null;
  return font;
};

// https://fonts.google.com/noto/specimen/Noto+Sans+Math?preview.text=12345%3F
export const useNotoMathSkiaFonts = (fontSize: number) => {
  const font = useFont(require("./NotoSansMath-Regular.ttf"), fontSize);
  if (!font) return null;
  return font;
};

// https://www.fontspace.com/led-sled-font-f33581
export const useLedSledSkiaFonts = (fontSize: number) => {
  const font = useFont(require("./LedSled-2x2X.otf"), fontSize);
  if (!font) return null;
  return font;
};
