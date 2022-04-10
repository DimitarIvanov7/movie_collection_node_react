import React from "react";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";
import { searchMovies, getAllGenres } from "../fetchData/fetchData";
import { useEffect, useState } from "react";
import SpecificMovie from "../components/SpecificMovie";

import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state/index";
import {
	State,
	genreInterface,
	MovieInterface,
} from "../interfaces/main.interface";
import { v4 as uuidv4 } from "uuid";

const Search = () => {
	const { search } = useLocation();

	const q = search.substring(3);

	const [results, setResults] = useState<State["search"]>([]);
	const [genres, setGenres] = useState<genreInterface[]>([]);

	//redux
	const dispatch = useDispatch();
	const { initialState } = bindActionCreators(actionCreators, dispatch);

	const searchState = useSelector((state: State) => state.search);

	console.log(searchState);

	useEffect(() => {
		getSearchResults();
		getGenres();
	}, [q]);

	useEffect(() => {
		searchState && searchState.length > 0 && setResults(searchState);
	}, [searchState]);

	const getSearchResults = async () => {
		const res = await searchMovies(q);
		initialState(res);
	};

	const getGenres = async () => {
		const res = await getAllGenres();
		setGenres(res);
	};

	const handleGenreFilter = (genre) => {
		const selected = genre.target.value;

		if (selected === "all") {
			setResults(searchState);
			return;
		}
		searchState &&
			setResults(searchState.filter((result) => result.genre === selected));
	};

	const [isPopularitySortUp, setIsPopularitySortUp] = useState(false);

	const handlePopularitySort = () => {
		if (isPopularitySortUp) {
			searchState &&
				setResults(
					searchState.sort(function (a, b) {
						return a.data.vote_average - b.data.vote_average;
					})
				);
		} else {
			searchState &&
				setResults(
					searchState.sort(function (a, b) {
						return b.data.vote_average - a.data.vote_average;
					})
				);
		}
	};

	const [isDateReleasedUp, setIsDateReleasedUp] = useState(false);

	const handleDateSort = () => {
		if (isDateReleasedUp) {
			searchState &&
				setResults(
					searchState.sort(
						(a, b) =>
							new Date(a.data.release_date) - new Date(b.data.release_date)
					)
				);
		} else {
			searchState &&
				setResults(
					searchState.sort(
						(a, b) =>
							new Date(b.data.release_date) - new Date(a.data.release_date)
					)
				);
		}
	};

	return (
		<div>
			<Header />

			<section className="main">
				<div className="filtes">
					<h2>Filter movies</h2>

					<h3>Genres</h3>
					<select onChange={handleGenreFilter} name="genre" id="genre-select">
						<option value="all">All genres</option>
						{genres &&
							genres.map((genre) => (
								<option key={genre.id} value={genre.name}>
									{genre.name}
								</option>
							))}
					</select>

					<h3>Sort by rating</h3>
					<button
						onClick={() => {
							setIsPopularitySortUp(!isPopularitySortUp);
							handlePopularitySort();
						}}
					>
						{!isPopularitySortUp ? "Most popular" : "Least popular"}
					</button>

					<h3>Sort by date released</h3>
					<button
						onClick={() => {
							setIsDateReleasedUp(!isDateReleasedUp);
							handleDateSort();
						}}
					>
						{!isDateReleasedUp ? "Newest" : "Oldest"}
					</button>
				</div>
				<div className="results">
					<h2>Results</h2>
					<div className="results-wrapper">
						{results &&
							results.map((result) => (
								<SpecificMovie key={uuidv4()} movie={result} />
							))}
					</div>
				</div>
			</section>
		</div>
	);
};

export default Search;
