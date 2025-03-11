export type GridItem = {
	id: number;
	row: number;
	col: number;
	type: "orange" | "lemon";
	text?: string;
	offset?: { x: number; y: number };
};

