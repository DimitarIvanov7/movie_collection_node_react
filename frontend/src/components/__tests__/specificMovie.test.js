import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../state/store";
import SpecificMovie from "../SpecificMovie";
import React from "react";

const testMovieData = {
	data: {
		adult: false,
		backdrop_path: "/loFmABw8rEpXk8jZnpRKh9gEHDB.jpg",
		genre_ids: [27, 53, 9648],
		id: 321258,
		original_language: "en",
		original_title: "The Boy",
		overview:
			"An American nanny is shocked that her new English family's boy is actually a life-sized doll. After she violates a list of strict rules, disturbing events make her believe that the doll is really alive.",
		popularity: 70.068,
		poster_path: "/W4cdvWRHX1cKpod2KeK8WuHAHG.jpg",
		release_date: "2016-01-22",
		title: "The Boy",
		video: false,
		vote_average: 5.9,
		vote_count: 3209,
	},
	img: "https://image.tmdb.org/t/p/w500/W4cdvWRHX1cKpod2KeK8WuHAHG.jpg",
	genre: "Horror",
};

beforeEach(() => {
	render(
		<Provider store={store}>
			<Router>
				<SpecificMovie movie={testMovieData} />
			</Router>
		</Provider>
	);
});

test("should render movie overview", () => {
	const overview = screen.getByText(
		/an american nanny is shocked that her new english family's boy is actually a life\-sized doll\. after she violates a list of strict rules, disturbing events make her believe that the doll is really alive\./i
	);
	expect(overview).toBeInTheDocument();
});
