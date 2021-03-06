var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fetch from "node-fetch";
//filter out the inappropriate movies
const removeAdultFilms = (movie) => {
    if (!movie.adult &&
        !movie.title.includes("Porn") &&
        !movie.title.includes("porn") &&
        !movie.title.includes("Sex"))
        return movie;
};
//get all the genres
export const getAllGenres = (key) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=en-US`);
    const resJSON = (yield res.json());
    return resJSON.genres;
});
//single genre. I need this function because the movie returns genre ids and you need to make a request to the API to
//get the genre for each id
const getGenre = (id, key) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=en-US`);
    const resJSON = (yield res.json());
    const data = resJSON.genres.filter((genre) => genre.id === id)[0];
    return data && data.name;
});
//this fucntion is used to get the poster url for each movie
const configurationMovieDB = (key) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch(`https://api.themoviedb.org/3/configuration?api_key=${key}`);
    const resJSON = (yield res.json());
    const url = resJSON.images.secure_base_url + "w500";
    return url;
});
//get and array of movies for the "search" page
export const searchMovies = (query, key) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${query}`;
    const res = yield fetch(url);
    const resJson = (yield res.json());
    const imgURL = yield configurationMovieDB(key);
    const data = resJson.results
        .filter((movie) => removeAdultFilms(movie))
        .map((movie) => __awaiter(void 0, void 0, void 0, function* () {
        const genre = yield getGenre(movie.genre_ids[0], key);
        return {
            data: movie,
            img: imgURL + movie.poster_path,
            genre: genre,
        };
    }));
    return Promise.all(data).then((values) => values);
});
//get single movie
export const getMovie = (id, key) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${key}`;
    const res = yield fetch(url);
    const resJson = (yield res.json());
    const imgURL = yield configurationMovieDB(key);
    return {
        data: resJson,
        img: imgURL + resJson.poster_path,
    };
});
//# sourceMappingURL=searchMovies.js.map