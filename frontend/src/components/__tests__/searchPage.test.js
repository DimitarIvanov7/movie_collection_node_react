import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../state/store";
import Search from "../../pages/Search";
import React from "react";

beforeEach(() => {
	render(
		<Provider store={store}>
			<Router>
				<Search />
			</Router>
		</Provider>
	);
});

test("should render filter container", () => {
	const filterContainer = screen.getByRole("heading", {
		name: /filter movies/i,
	});
	expect(filterContainer).toBeInTheDocument();
});
