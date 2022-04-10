export const searchMovies = async (query: string) => {
	const res = await fetch(`/search/${query}`);

	const resJSON = await res.json();

	return resJSON;
};

export const getSingleMovie = async (id: number) => {
	const res = await fetch(`/movies/${id}`);
	const resJSON = await res.json();

	return resJSON;
};

export const getAllGenres = async () => {
	const res = await fetch(`/genres/`);

	const resJSON = await res.json();

	return resJSON;
};
