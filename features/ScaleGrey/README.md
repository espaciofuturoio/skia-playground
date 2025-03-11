# ScaleGrey Component

This component displays a scale with grid items on the left and right sides. It now supports customizable grid dimensions, including 5x3 grids.

## Basic Usage

```tsx
import { ScaleGrey } from './ScaleGrey';
import { createScaleGrids } from './gridUtils';

// Create default 3x3 grids
const { leftGrid, rightGrid } = createScaleGrids();

// Render the ScaleGrey component
<ScaleGrey 
  leftGrid={leftGrid} 
  rightGrid={rightGrid} 
  displayValue="Example Scale"
/>
```

## Using 5x3 Grids

The ScaleGrey component now supports 5x3 grids with the addition of new `gridColumns` and `gridRows` props:

```tsx
import { ScaleGrey } from './ScaleGrey';
import { create5x3Grids } from './gridUtils';

// Create 5x3 grids with numbers
const { leftGrid, rightGrid } = create5x3Grids(true);

// Render the ScaleGrey component with 5x3 grid configuration
<ScaleGrey 
  leftGrid={leftGrid} 
  rightGrid={rightGrid} 
  displayValue="5x3 Grid Example"
  gridColumns={5}
  gridRows={3}
  width={480}  // Slightly wider canvas to accommodate the 5 columns
  rightOffset={280}  // Adjusted right offset for better spacing
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| leftGrid | GridItem[] | - | Array of grid items for the left side |
| rightGrid | GridItem[] | - | Array of grid items for the right side |
| rightOffset | number | 230 | Horizontal offset for the right grid |
| width | number | 380 | Width of the canvas |
| height | number | 250 | Height of the canvas |
| fontSize | number | 25 | Font size for text |
| displayValue | string | "" | Text to display on the scale |
| debug | boolean | false | Show debug corners |
| gridColumns | number | 3 | Number of columns in the grid |
| gridRows | number | 3 | Number of rows in the grid |

## Grid Utilities

The `gridUtils.ts` file provides utility functions for creating grids:

### `createGrid(columns, rows, idStart, defaultType, alternateTypes, showNumbers)`

Creates a grid of items with specified dimensions.

### `createScaleGrids(columns, rows, showNumbers)`

Creates a pair of grids (left and right) for the ScaleGrey component.

### `create5x3Grids(showNumbers)`

Creates grid items specifically for a 5x3 grid.

## GridItem Type

```tsx
type GridItem = {
  id: number;
  row: number;
  col: number;
  type: "orange" | "lemon";
  text?: string;
  offset?: { x: number; y: number };
};
```

## Example

See `ScaleGreyExample.tsx` for a complete example showing both 3x3 and 5x3 grids. 