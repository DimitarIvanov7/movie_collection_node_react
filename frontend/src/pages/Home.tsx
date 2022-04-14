import React from "react";
import Hero from "../components/Hero";
import classes from "../tailwindClasses";
import { getSingleMovie } from "../fetchData/fetchData";
import SpecificMovie from "../components/SpecificMovie";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { State, MovieInterface } from "../interfaces/main.interface";
import { v4 as uuidv4 } from "uuid";

const Home = () => {
	//gets the user state from redux. Returns false if user is not loged in
	const userState = useSelector((state: State) => state.user);

	// this state is used to display the favourite movies below the hero section
	const [favourite, setFavourite] = useState<MovieInterface[]>([]);

	// gets the favourite movies if user is logged in
	useEffect(() => {
		userState && GetFavourites();
	}, [userState]);

	const favList = userState && userState.favourite.map((fav: number) => fav);

	const GetFavourites = async () => {
		const multipleRes =
			favList &&
			(favList.map(async (fav: number) => {
				const res = await getSingleMovie(fav);
				return res;
			}) as Promise<MovieInterface>[] | undefined);

		const awaitAll = await Promise.all<any>(multipleRes).then(
			(values) => values
		);

		setFavourite(awaitAll);
	};

	return (
		<div>
			<Hero />
			<div className="w-full bg-dark-max">
				<h2 className={`${classes.heading} ml-3 text-center sm:text-left`}>
					Check your favourite movies
				</h2>
				<section
					className="bg-darkWhite w-full pb-20"
					style={{ minHeight: "10rem" }}
				>
					{userState ? (
						<div className="flex gap-4 flex-wrap mx-auto justify-center ">
							<h2 className="font-bold text-3xl py-4 w-full text-center">
								Your Favorites
							</h2>

							{favourite.length > 0 ? (
								favourite.map((fav) => (
									<SpecificMovie key={uuidv4()} movie={fav} type="homepage" />
								))
							) : (
								<p className={`text-2rem text-black pt-11 text-center`}>
									Your favourite list is empty
								</p>
							)}
						</div>
					) : (
						<div>
							<p className={`text-2rem text-black pt-11 text-center`}>
								You need to login to see your favourites
							</p>
						</div>
					)}
				</section>
			</div>
		</div>
	);
};

export default Home;
