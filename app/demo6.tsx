import { DemoLayout } from "@/components/DemoLayout";
import { Demo4 } from "@/features/demo4/Demo4";
import { ScaleGrey } from "@/features/ScaleGrey/ScaleGrey";
import type { GridItem } from "@/features/ScaleGrey/types";

const greyScaleLeftGrid: GridItem[] = [
  { id: 1, row: 0, col: 0, type: "orange" },
];

const greyScaleRightGrid: GridItem[] = [
  { id: 1, row: 0, col: 0, type: "lemon" },
  { id: 2, row: 0, col: 1, type: "lemon" },
  { id: 3, row: 0, col: 2, type: "lemon" },
  { id: 4, row: 1, col: 0, type: "lemon" },
];

export default function Demo6Page() {
  return (
    <DemoLayout title="Demo 6">
      <Demo4 />
      <ScaleGrey leftGrid={greyScaleLeftGrid} rightGrid={greyScaleRightGrid} />
    </DemoLayout>
  );
}