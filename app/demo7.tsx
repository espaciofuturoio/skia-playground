import { DemoLayout } from "@/components/DemoLayout";
import { DemoAtlas } from "@/features/atlas/Atlas";

export default function Demo1Page() {
  return (
    <DemoLayout title="Atlas">
      <DemoAtlas />
    </DemoLayout>
  );
}