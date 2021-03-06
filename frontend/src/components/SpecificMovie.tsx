// this component renders the movies in the search results and the favourite movies on the home page

import React from "react";
import { addFavourite, deleteFavourite } from "../fetchData/Auth";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state/index";
import { useState, useEffect, useRef } from "react";
import { State } from "../interfaces/main.interface";
import { Link } from "react-router-dom";
import { movieStyleClasses } from "../tailwindClasses";

const SpecificMovie = ({ movie, type }: State) => {
	//the route is created to navigate the user to the Movie page on click with the movie id as a parameter
	const route = movie && `/movies/${movie.data.id}`;

	// user state from redux
	const userState = useSelector((state: State) => state.user);

	const [isFavourite, setIsFavourite] = useState<boolean>(false);

	useEffect(() => {
		//get the array with favourite movies from the userSate from redux and check if the movie id is in the list
		const favList = userState
			? userState.favourite.map((fav: number) => fav)
			: false;

		userState && favList
			? setIsFavourite(favList.includes(movie.data.id))
			: setIsFavourite(false);
	}, [userState]);

	//add or move favourite movies
	const dispatch = useDispatch();
	const { setUser } = bindActionCreators(actionCreators, dispatch);

	const handleFavourite = async (type: string): Promise<void> => {
		if (!userState) {
			alert("You need to login first!");
			return;
		}

		const id = movie.data.id;

		const res =
			type === "add"
				? await addFavourite(id, userState.accessToken, userState.username)
				: await deleteFavourite(id, userState.accessToken, userState.username);

		if (res === "Token is not valid!") {
			window.location.reload();
			alert("Your token has expired");
			return;
		}

		const updatedUser = { ...userState };

		updatedUser.favourite = res;

		setUser(updatedUser);
	};

	const LinkElement = useRef<HTMLAnchorElement>(null);

	return (
		<div
			className={`${
				!type && `mx-auto md:w-full w-10/12 md:mx-0 lg:flex gap-4 lg:w-10/12`
			}`}
		>
			<Link ref={LinkElement} to={route}></Link>
			<img
				className={`${!type ? `lg:w-1/5` : ` m-0 w-48`} cursor-pointer`}
				src={
					movie.img !== "https://image.tmdb.org/t/p/w500null"
						? movie.img
						: "/images/no_img.png"
				}
				alt=""
				onClick={() => {
					LinkElement.current && LinkElement.current.click();
				}}
			/>

			{!type && (
				<div className="second-part flex flex-col">
					<h3
						className="text-2rem m-0 align-text-top cursor-pointer"
						onClick={() => (window.location.href = route)}
					>
						{movie.data.title} ({movie.data.release_date.substring(0, 4)})
					</h3>

					<p className="my-2 font-bold">
						{movie.genre || "no genre info"} | {movie.data.vote_average}/10
					</p>

					<p>{movie.data.overview || "No overview data"}</p>
					{!isFavourite ? (
						<button
							className={`${movieStyleClasses.buttonAdd} w-fit mt-4`}
							onClick={() => handleFavourite("add")}
						>
							Add To Favourites
						</button>
					) : (
						<button
							className={`${movieStyleClasses.buttonRemove} w-fit mt-4`}
							onClick={() => handleFavourite("remove")}
						>
							Remove from Favourites
						</button>
					)}
				</div>
			)}
		</div>
	);
};

export default SpecificMovie;
