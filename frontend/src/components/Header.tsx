import React from "react";
import classes from "../tailwindClasses";
import { useLocation, useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state/index";

import { logoutUser } from "../fetchData/Auth";

const Header = () => {
	const location = useLocation();

	const navigate = useNavigate();

	const handleSearch = (e) => {
		e.preventDefault();
		console.log(e.target.movie.value);

		const path = `/search?q=${e.target.movie.value}`;
		navigate(path);
	};

	const dispatch = useDispatch();
	const { LoginOpen, setUser } = bindActionCreators(actionCreators, dispatch);

	const userState = useSelector((state) => state.user);

	const handeLogout = async (e) => {
		e.preventDefault();

		const res = await logoutUser(userState.accessToken, userState.refreshToken);

		if (res === "You logged out successfully.") setUser(false);
		else alert("Error");
	};

	const background = location.pathname === "/" ? "bg-transparent" : "bg-dark";
	return (
		<header className={`p-4 flex justify-between ${background}`}>
			<Link to="/">
				<h1 className={classes.heading}>My Movie Collection</h1>
			</Link>
			<div className="form-container flex gap-x-1.5">
				<form onSubmit={(e) => handleSearch(e)} className="flex gap-x-1.5">
					<input
						type="text"
						name="movie"
						className="bg-gray appearance-none border-2 border-gray rounded w-full py-2 px-4 text-gray leading-tight focus:outline-none focus:bg-white focus:border-gray"
						placeholder="Search by movie title... "
					/>
					<button type="submit" className={classes.button}>
						Search
					</button>
				</form>
				{!userState ? (
					<button onClick={() => LoginOpen(true)} className={classes.button}>
						Login
					</button>
				) : (
					<button onClick={handeLogout} className={classes.button}>
						Logout
					</button>
				)}
			</div>
		</header>
	);
};

export default Header;
