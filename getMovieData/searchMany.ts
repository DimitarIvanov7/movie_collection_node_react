export const searchMovies = async (query: string, key: string) => {
	const url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${query}`;

	const res = await fetch(url);
	const resJson = await res.json();

	return resJson;
};
