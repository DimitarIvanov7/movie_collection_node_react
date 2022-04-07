import React from "react";
import classes from "../tailwindClasses";
import { useLocation } from "react-router-dom";

const Header = () => {
	const location = useLocation();

	const background = location.pathname === "/" ? "bg-transparent" : "bg-dark";
	return (
		<header className={`p-4 flex justify-between ${background}`}>
			<h1 className={classes.heading}>My Movie Collection</h1>
			<div className="form-container flex gap-x-1.5">
				<form action="/search" className="flex gap-x-1.5">
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
				<button type="submit" className={classes.button}>
					Login
				</button>
			</div>
		</header>
	);
};

export default Header;
