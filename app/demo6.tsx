// import { Demo6 } from "@/features/demo6/Demo6";
// import { DemoLayout } from "@/components/DemoLayout";
// import { scaleRed } from "@/features/demo6/scale-red";
// import { scaleGrey } from "@/features/demo6/scale-grey";
// import { orange as orangeSmall } from "@/features/demo6/orange-small";
// import { orange } from "@/features/demo6/orange";
// import { lemon } from "@/features/demo6/lemon";

// export default function Demo6Page() {
//   // Demo 4 configuration
//   const demo4Config = {
//     scale: {
//       svgString: scaleRed,
//       displayText: "600",
//       textPosition: { x: 50, y: 74 }
//     },
//     fruits: {
//       orangeSvgString: orangeSmall,
//       lemonSvgString: lemon,
//       leftItems: [
//         { id: 1, row: 0, col: 0, type: "orange" },
//         { id: 2, row: 0, col: 1, type: "orange" },
//         { id: 3, row: 0, col: 2, type: "lemon" },
//         { id: 4, row: 1, col: 0, type: "lemon" },
//         { id: 5, row: 1, col: 1, type: "lemon" },
//       ]
//     }
//   };

//   // Demo 5 configuration
//   const demo5Config = {
//     scale: {
//       svgString: scaleGrey
//     },
//     fruits: {
//       orangeSvgString: orange,
//       lemonSvgString: lemon,
//       leftItems: [
//         { id: 1, row: 0, col: 0, type: "orange", offset: { x: 1, y: 4 } }
//       ],
//       rightItems: [
//         { id: 1, row: 0, col: 0, type: "lemon", offset: { x: 1, y: 4 } },
//         { id: 2, row: 0, col: 1, type: "lemon", offset: { x: 1, y: 4 } },
//         { id: 3, row: 0, col: 2, type: "lemon", offset: { x: 1, y: 4 } },
//         { id: 4, row: 1, col: 0, type: "lemon", offset: { x: 1, y: 4 } }
//       ],
//       rightOffset: 230
//     }
//   };

//   // Custom configuration example
//   const customConfig = {
//     scale: {
//       svgString: scaleRed,
//       displayText: "800",
//       textPosition: { x: 50, y: 74 }
//     },
//     fruits: {
//       orangeSvgString: orangeSmall,
//       lemonSvgString: lemon,
//       leftItems: [
//         { id: 1, row: 0, col: 0, type: "orange", text: "1" },
//         { id: 2, row: 0, col: 1, type: "orange", text: "2" },
//         { id: 3, row: 1, col: 0, type: "lemon", text: "3" },
//       ],
//       rightItems: [
//         { id: 4, row: 0, col: 0, type: "lemon", text: "4" },
//         { id: 5, row: 0, col: 1, type: "lemon", text: "5" },
//       ],
//       rightOffset: 200
//     }
//   };

//   return (
//     <DemoLayout title="Demo 6 - Unified Component">
//       <h2 className="text-xl mt-4 mb-2">Demo 4 Style</h2>
//       <Demo6 {...demo4Config} />

//       <h2 className="text-xl mt-8 mb-2">Demo 5 Style</h2>
//       <Demo6 {...demo5Config} />

//       <h2 className="text-xl mt-8 mb-2">Custom Configuration</h2>
//       <Demo6 {...customConfig} />
//     </DemoLayout>
//   );
// } 