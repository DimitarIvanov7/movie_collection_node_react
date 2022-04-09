var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React from "react";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";
import { searchMovies, getAllGenres } from "../fetchData/fetchData";
import { useEffect, useState } from "react";
import SpecificMovie from "../components/SpecificMovie";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state/index";
const Search = () => {
    const { search } = useLocation();
    const q = search.substring(3);
    const [results, setResults] = useState([]);
    const [genres, setGenres] = useState([]);
    //redux
    const dispatch = useDispatch();
    const { initialState } = bindActionCreators(actionCreators, dispatch);
    const searchState = useSelector((state) => state.search);
    useEffect(() => {
        getSearchResults();
        getGenres();
    }, [q]);
    useEffect(() => {
        setResults(searchState.length > 0 && searchState);
    }, [searchState]);
    const getSearchResults = () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield searchMovies(q);
        initialState(res);
    });
    const getGenres = () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield getAllGenres();
        setGenres(res);
    });
    const handleGenreFilter = (genre) => {
        const selected = genre.target.value;
        if (selected === "all") {
            setResults(searchState);
            return;
        }
        setResults(searchState.filter((result) => result.genre === selected));
    };
    const [isPopularitySortUp, setIsPopularitySortUp] = useState(false);
    const handlePopularitySort = () => {
        if (isPopularitySortUp) {
            setResults(searchState.sort(function (a, b) {
                return a.data.vote_average - b.data.vote_average;
            }));
        }
        else {
            setResults(searchState.sort(function (a, b) {
                return b.data.vote_average - a.data.vote_average;
            }));
        }
    };
    const [isDateReleasedUp, setIsDateReleasedUp] = useState(false);
    const handleDateSort = () => {
        if (isDateReleasedUp) {
            setResults(searchState.sort((a, b) => new Date(a.data.release_date) - new Date(b.data.release_date)));
        }
        else {
            setResults(searchState.sort((a, b) => new Date(b.data.release_date) - new Date(a.data.release_date)));
        }
    };
    return (<div>
			<Header />

			<section className="main">
				<div className="filtes">
					<h2>Filter movies</h2>

					<h3>Genres</h3>
					<select onChange={handleGenreFilter} name="genre" id="genre-select">
						<option value="all">All genres</option>
						{genres &&
            genres.map((genre) => (<option key={genre.id} value={genre.name}>
									{genre.name}
								</option>))}
					</select>

					<h3>Sort by rating</h3>
					<button onClick={() => {
            setIsPopularitySortUp(!isPopularitySortUp);
            handlePopularitySort();
        }}>
						{!isPopularitySortUp ? "Most popular" : "Least popular"}
					</button>

					<h3>Sort by date released</h3>
					<button onClick={() => {
            setIsDateReleasedUp(!isDateReleasedUp);
            handleDateSort();
        }}>
						{!isDateReleasedUp ? "Newest" : "Oldest"}
					</button>
				</div>
				<div className="results">
					<h2>Results</h2>
					<div className="results-wrapper">
						{results &&
            results.map((result) => <SpecificMovie movie={result}/>)}
					</div>
				</div>
			</section>
		</div>);
};
export default Search;
//# sourceMappingURL=Search.js.map