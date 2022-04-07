import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginUser from "./pages/Login";
import Home from "./pages/Home";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<LoginUser />} />
			</Routes>
		</div>
	);
}

export default App;
