export interface User {
	username: string;
	favourite: number[];
	interested: [
		{
			id: number;
			rating: number;
			comment: string;
		}
	];
	accessToken: string;
}

export interface Search {
	data: {
		genre_ids: number[];
		id: number;
		overview: string;
		title: string;
		vote_average: number;
		release_date: string;
	};
	genre: string;
	img: string;
}

export interface genreInterface {
	id: number;
	name: string;
}

export interface MovieInterface {
	data: {
		title: string;
		id: number;
		genres: Array<{
			id: number;
			name: string;
		}>;
		overview: string;
		homepage: string;
		release_date: string;
		vote_average: number;
	};
	genre: string;
	img: string;
}

export interface MovieSearch {
	data: {
		title: string;
		id: number;
		genre_ids: number[];
		overview: string;
		homepage?: string;
		release_date: string;
		vote_average: number;
	};
	genre: string;
	img: string;
}

export interface State {
	loginOpen?: boolean;
	user?: User;
	search?: Search[];
	movie: MovieInterface | MovieSearch;
	type: string | null;
}
