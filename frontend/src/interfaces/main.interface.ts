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
	};
	img: string;
}

export interface State {
	loginOpen: boolean;
	user: User;
	search: Array<{
		overview: string;
		id: number;
		poster_path: string;
		genre_ids: number[];
		release_date: string;
		vote_average: number;
	}>;
}
