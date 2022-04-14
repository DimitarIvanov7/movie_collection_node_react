import React from "react";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";
import { searchMovies, getAllGenres } from "../fetchData/fetchData";
import { useEffect, useState } from "react";
import SpecificMovie from "../components/SpecificMovie";

import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state/index";
import { State, genreInterface } from "../interfaces/main.interface";
import { v4 as uuidv4 } from "uuid";

const Search = () => {
	//search query is passed to the express endpoint to find a movie by title
	const { search } = useLocation();

	//query
	const q = search.substring(3);

	const [results, setResults] = useState<State["search"]>([]);

	//gets the genres for the html select element that filters movies by genre
	const [genres, setGenres] = useState<genreInterface[]>([]);

	//redux for changing the search state
	const dispatch = useDispatch();
	const { initialState } = bindActionCreators(actionCreators, dispatch);

	const searchState = useSelector((state: State) => state.search);

	//gets serach results and enres on query change
	useEffect(() => {
		getSearchResults();
		getGenres();
	}, [q]);

	//sets the results state on redux state change
	useEffect(() => {
		searchState && searchState.length > 0
			? setResults(searchState)
			: setResults([]);
	}, [searchState]);

	const getSearchResults = async (): Promise<void> => {
		const res = await searchMovies(q);
		initialState(res);
	};

	const getGenres = async (): Promise<void> => {
		const res = await getAllGenres();
		setGenres(res);
	};

	//filter movies by genre using html select element
	const handleGenreFilter = (
		genre: React.FormEvent<HTMLSelectElement>
	): void => {
		const selected = genre.target as HTMLSelectElement;

		if (selected.value === "all") {
			setResults(searchState);
			return;
		}
		searchState &&
			setResults(
				searchState.filter((result) => result.genre === selected.value)
			);
	};

	//state for the popularity sort
	const [isPopularitySortUp, setIsPopularitySortUp] = useState(false);

	//check the way movies are sorted and sorts them accordingly
	const handlePopularitySort = (): void => {
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

	//checks the date release sort
	const [isDateReleasedUp, setIsDateReleasedUp] = useState<boolean>(false);

	const handleDateSort = () => {
		if (isDateReleasedUp) {
			searchState &&
				setResults(
					searchState.sort(
						(a, b) =>
							+new Date(a.data.release_date) - +new Date(b.data.release_date)
					)
				);
		} else {
			searchState &&
				setResults(
					searchState.sort(
						(a, b) =>
							+new Date(b.data.release_date) - +new Date(a.data.release_date)
					)
				);
		}
	};

	//tailwind styling for the filters
	const searchStyling = {
		label: "text-lg mt-3 font-bold",
		sortButton: "text-lg text-white cursor-pointer rounded px-2  bg-mainBg ",
	};

	return (
		<div>
			<Header searchRef={null} />

			<section className="main md:flex mt-4 mb-12">
				<div className="filtes w-fit sm:w-2/6 sm:ml-4 lg:w-1/6 mx-auto">
					<h2 className="text-2rem">Filter movies</h2>

					<h3 className={searchStyling.label}>By Genre</h3>
					<select
						className={searchStyling.sortButton}
						onChange={handleGenreFilter}
						name="genre"
						id="genre-select"
					>
						<option value="all">All genres</option>
						{genres &&
							genres.map((genre) => (
								<option key={genre.id} value={genre.name}>
									{genre.name}
								</option>
							))}
					</select>

					<h3 className={searchStyling.label}>Sort by rating</h3>
					<button
						className={searchStyling.sortButton}
						onClick={() => {
							setIsPopularitySortUp(!isPopularitySortUp);
							handlePopularitySort();
						}}
					>
						{!isPopularitySortUp ? "Most popular ↑" : "Least popular ↓"}
					</button>

					<h3 className={searchStyling.label}>Sort by date released</h3>
					<button
						className={searchStyling.sortButton}
						onClick={() => {
							setIsDateReleasedUp(!isDateReleasedUp);
							handleDateSort();
						}}
					>
						{!isDateReleasedUp ? "Newest ↑" : "Oldest ↓"}
					</button>
				</div>
				<div className="results md:w-5/6 w-full">
					<h2 className="mt-4 lg:mt-0 sm:text-left text-center text-2rem mb-6 ml-2 lg:ml-2">
						Results
					</h2>
					<div className="results-wrapper flex flex-col gap-6">
						{results && results.length > 0 ? (
							results.map((result) => (
								<SpecificMovie key={uuidv4()} movie={result} type={null} />
							))
						) : (
							<p>No data by this criteria</p>
						)}
					</div>
				</div>
			</section>
		</div>
	);
};

export default Search;
