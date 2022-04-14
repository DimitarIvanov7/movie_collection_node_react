import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Movie from "./pages/Movie";
import Login from "./components/Login";
import { useSelector } from "react-redux";
import { State } from "./interfaces/main.interface";

function App() {
	// gets the redux state to determine if it's going to display the login component
	const loginState = useSelector((state: State) => state.loginOpen);

	return (
		<div className="App">
			{loginState && <Login />}
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/search" element={<Search />} />
				<Route path="/movies/:id" element={<Movie />} />
			</Routes>
		</div>
	);
}

export default App;
