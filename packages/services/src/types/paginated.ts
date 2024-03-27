export type Paginated<Data = any> = {
	data: Data[];

	page: number;
	limit: number;
	pages: number;
	total: number;
}