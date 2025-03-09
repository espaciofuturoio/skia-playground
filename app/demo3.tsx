import { Demo2 } from "@/features/demo2/Demo2";
import { DemoLayout } from "@/components/DemoLayout";

export default function Demo3Page() {
  return (
    <DemoLayout title="Demo 3">
      <Demo2 />
    </DemoLayout>
  );
}