import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Movie from "./pages/Movie";
import Login from "./components/Login";
import { useSelector } from "react-redux";
function App() {
    const loginState = useSelector((state) => state.loginOpen);
    return (<div className="App">
			{loginState && <Login />}
			<Routes>
				<Route path="/" element={<Home />}/>
				<Route path="/search" element={<Search />}/>
				<Route path="/movies/:id" element={<Movie />}/>
			</Routes>
		</div>);
}
export default App;
//# sourceMappingURL=App.js.map