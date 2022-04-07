import React from "react";
import classes from "../tailwindClasses";
import Header from "./Header";
export const Hero = () => {
    return (<section className="hero w-full h-[calc(100vh-3rem)] bg-cover flex flex-col gap-y-64 shadow" style={{ backgroundImage: 'url("/images/header-2.jpg")' }}>
			<Header />
			<div className="hero-cta mx-4 mb-64">
				<h2 className={classes.heading}>
					Find rate and store your favourite movies
				</h2>
				<button type="submit" className={classes.button}>
					Browse movies
				</button>
			</div>
		</section>);
};
export default Hero;
//# sourceMappingURL=Hero.js.map