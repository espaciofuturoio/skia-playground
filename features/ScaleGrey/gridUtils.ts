import type { GridItem } from "./types";

/**
 * Creates a grid of items with specified dimensions
 * @param columns Number of columns in the grid
 * @param rows Number of rows in the grid
 * @param idStart Starting ID for the grid items
 * @param defaultType Default type for the grid items (orange or lemon)
 * @param alternateTypes Whether to alternate types in a checkerboard pattern
 * @param showNumbers Whether to add numbers as text to the grid items
 * @returns Array of GridItem objects
 */
export const createGrid = (
	columns: number,
	rows: number,
	idStart = 1,
	defaultType: "orange" | "lemon" = "orange",
	alternateTypes = true,
	showNumbers = false,
): GridItem[] => {
	const grid: GridItem[] = [];
	let currentId = idStart;

	for (let col = 0; col < rows; col++) {
		for (let row = 0; row < columns; row++) {
			// Determine item type (alternate in a checkerboard pattern if requested)
			let itemType = defaultType;
			if (alternateTypes) {
				const isEven = (row + col) % 2 === 0;
				itemType = isEven ? "orange" : "lemon";
			}

			// Create the grid item
			const item: GridItem = {
				id: currentId++,
				row,
				col,
				type: itemType,
			};

			// Add text number if requested
			if (showNumbers) {
				item.text = String(row + col * columns + 1);
			}

			grid.push(item);
		}
	}

	return grid;
};

/**
 * Creates a pair of grids for the ScaleGrey component
 * @param columns Number of columns in each grid
 * @param rows Number of rows in each grid
 * @param showNumbers Whether to add numbers as text to the grid items
 * @returns Object containing leftGrid and rightGrid arrays
 */
export const createScaleGrids = (
	columns = 3,
	rows = 3,
	showNumbers = false,
) => {
	// Create left grid starting with orange
	const leftGrid = createGrid(columns, rows, 1, "orange", true, showNumbers);

	// Create right grid starting with lemon (opposite of left)
	const rightGrid = createGrid(
		columns,
		rows,
		leftGrid.length + 1,
		"lemon",
		true,
		showNumbers,
	);

	return { leftGrid, rightGrid };
};

/**
 * Creates grid items specifically for a 5x3 grid
 * @param showNumbers Whether to add numbers as text to the grid items
 * @returns Object containing leftGrid and rightGrid arrays for a 5x3 grid
 */
export const create5x3Grids = (showNumbers = false) => {
	return createScaleGrids(5, 3, showNumbers);
};
