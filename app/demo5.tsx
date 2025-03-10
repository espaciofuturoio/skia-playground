import { Demo5 } from "@/features/demo5/Demo5";
import { DemoLayout } from "@/components/DemoLayout";
import { Demo4 } from "@/features/demo4/Demo4";

export default function Demo5Page() {
  return (
    <DemoLayout title="Demo 5">
      <Demo4 />
      <Demo5 />
    </DemoLayout>
  );
}