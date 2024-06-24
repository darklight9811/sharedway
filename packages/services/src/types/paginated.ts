export type Paginated<Data = unknown> = {
	data: Data[];

	page: number;
	limit: number;
	pages: number;
	total: number;
};
