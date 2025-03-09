import { Demo1 } from "@/features/demo1/Demo1";
import { DemoLayout } from "@/components/DemoLayout";

export default function Demo1Page() {
  return (
    <DemoLayout title="Demo 1">
      <Demo1 />
    </DemoLayout>
  );
}