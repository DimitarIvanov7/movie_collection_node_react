import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../state/store";
import Header from "../Header";
import React from "react";

beforeEach(() => {
	render(
		<Provider store={store}>
			<Router>
				<Header />
			</Router>
		</Provider>
	);
});

test("should render header", () => {
	const headerElement = screen.getByRole("banner");
	expect(headerElement).toBeInTheDocument();
});

test("user should be logged out", () => {
	const loginButton = screen.getByRole("button", {
		name: /login/i,
	});
	expect(loginButton).toBeInTheDocument();
});
