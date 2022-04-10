import fetch from "node-fetch";

const removeAdultFilms = (movie: object) => {
	if (
		!movie.adult &&
		!movie.title.includes("Porn") &&
		!movie.title.includes("porn") &&
		!movie.title.includes("Sex")
	)
		return movie;
};

export const getAllGenres = async (key: string) => {
	const res = await fetch(
		`https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=en-US`
	);
	const resJSON = await res.json();

	return resJSON.genres;
};

const getGenre = async (id: number, key: string) => {
	const res = await fetch(
		`https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=en-US`
	);

	const resJSON = await res.json();

	const data = await resJSON.genres.filter((genre) => genre.id === id)[0];

	return data && data.name;
};

const configurationMovieDB = async (key: string) => {
	const res = await fetch(
		`https://api.themoviedb.org/3/configuration?api_key=${key}`
	);
	const resJSON = await res.json();

	const url = resJSON.images.secure_base_url + "w500";

	return url;
};

export const searchMovies = async (query: string, key: string) => {
	const url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${query}`;

	const res = await fetch(url);
	const resJson = await res.json();

	const imgURL = await configurationMovieDB(key);

	const data = resJson.results
		.filter((movie) => removeAdultFilms(movie))
		.map(async (movie) => {
			const genre = await getGenre(movie.genre_ids[0], key);
			return {
				data: movie,
				img: imgURL + movie.poster_path,
				genre: genre,
			};
		});

	return Promise.all(data).then((values) => values);
};

export const getMovie = async (id: string, key: string) => {
	const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${key}`;

	const res = await fetch(url);
	const resJson = await res.json();

	const imgURL = await configurationMovieDB(key);

	return {
		data: resJson,
		img: imgURL + resJson.poster_path,
	};
};