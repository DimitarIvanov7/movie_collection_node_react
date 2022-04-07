import React from "react";
import Hero from "../components/Hero";
import classes from "../tailwindClasses";

const Home = () => {
	return (
		<div>
			<Hero />
			<div className="w-full bg-dark-max h-12 cursor-pointer">
				<h2 className={classes.heading}>Check your favourite movies</h2>
			</div>
		</div>
	);
};

export default Home;
