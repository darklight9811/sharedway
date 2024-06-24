interface Metadata {
	user?: {
		id: string;
		name: string | null;
		email?: string | null;
		emailVerified: Date | null;
	} | null;
}

export default Metadata;
