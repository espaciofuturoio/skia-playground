import { DemoLayout } from "@/components/DemoLayout";
import { Demo4 } from "@/features/demo4/Demo4";
import { ScaleGrey } from "@/features/ScaleGrey/ScaleGrey";
import { ScaleRed } from "@/features/ScaleGrey/ScaleRed";
import type { GridItem } from "@/features/ScaleGrey/types";
import { Text } from "react-native";

const greyScaleLeftGrid: GridItem[] = [
  { id: 1, row: 0, col: 0, type: "orange" },
];

const greyScaleRightGrid: GridItem[] = [
  { id: 1, row: 0, col: 0, type: "lemon" },
  { id: 2, row: 0, col: 1, type: "lemon" },
  { id: 3, row: 0, col: 2, type: "lemon" },
  { id: 4, row: 1, col: 0, type: "lemon" },
];
const redScaleGrid: GridItem[] = [
  { id: 1, row: 0, col: 0, type: "orange" },
  { id: 2, row: 0, col: 1, type: "orange" },
  { id: 3, row: 0, col: 2, type: "lemon" },
  { id: 4, row: 1, col: 0, type: "lemon" },
  { id: 5, row: 1, col: 1, type: "lemon" },
];

export default function Demo6Page() {
  return (
    <DemoLayout title="Demo 6">
      <Text style={{ fontSize: 20, textAlign: "justify" }}>
        Cuanto pesa una naranja?
      </Text>
      <ScaleGrey leftGrid={greyScaleLeftGrid} rightGrid={greyScaleRightGrid} debug={false} />
      <ScaleRed grid={redScaleGrid} displayValue="88" debug={false} />
    </DemoLayout>
  );
}