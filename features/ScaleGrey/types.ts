export type GridItem = {
	id: string;
	row: number;
	col: number;
	type: "orange" | "lemon";
	text?: string;
	offset?: { x: number; y: number };
};
