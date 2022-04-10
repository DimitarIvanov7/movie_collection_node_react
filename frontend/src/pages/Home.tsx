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
	const userState = useSelector((state: State) => state.user);

	const [favourite, setFavourite] = useState<MovieInterface[]>([]);

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
			}) as Promise<MovieInterface>[]);

		const awaitAll = await Promise.all(multipleRes).then((values) => values);

		setFavourite(awaitAll);
	};

	return (
		<div>
			<Hero />
			<div className="w-full bg-dark-max h-12 cursor-pointer">
				<h2 className={classes.heading}>Check your favourite movies</h2>
				{userState ? (
					<section>
						{favourite.length > 0 ? (
							favourite.map((fav) => (
								<SpecificMovie key={uuidv4()} movie={fav} />
							))
						) : (
							<p>Your favourite list is empty</p>
						)}
					</section>
				) : (
					<p>You need to login to see your favourites</p>
				)}
			</div>
		</div>
	);
};

export default Home;
