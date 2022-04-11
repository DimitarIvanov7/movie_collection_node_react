import React from "react";
import classes from "../tailwindClasses";
import Header from "./Header";
import { useRef } from "react";
export const Hero = () => {
    const searchRef = useRef(null);
    return (<section className="hero w-full h-[calc(100vh-3rem)] bg-cover flex flex-col gap-y-64 shadow" style={{ backgroundImage: 'url("/images/header-2.jpg")' }}>
			<Header searchRef={searchRef}/>
			<div className="hero-cta mx-4 mb-64">
				<h2 className={classes.heading} style={{ marginBottom: ".5rem" }}>
					Find, rate and store your favourite movies
				</h2>
				<button onClick={() => { var _a; return (_a = searchRef.current) === null || _a === void 0 ? void 0 : _a.focus(); }} type="submit" className={classes.button}>
					Browse movies
				</button>
			</div>
		</section>);
};
export default Hero;
//# sourceMappingURL=Hero.js.map