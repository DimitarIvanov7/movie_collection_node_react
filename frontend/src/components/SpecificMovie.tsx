import React from "react";
import { Link } from "react-router-dom";
import { addFavourite, deleteFavourite } from "../fetchData/Auth";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state/index";
import { useState, useEffect } from "react";

const SpecificMovie = ({ movie }) => {
	const route = movie && `/movies/${movie.data.id}`;

	const userState = useSelector((state) => state.user);

	const [isFavourite, setIsFavourite] = useState(false);

	useEffect(() => {
		const favList = userState && userState.favourite.map((fav) => fav.id);

		userState && setIsFavourite(favList.includes(parseInt(movie.data.id)));
	}, [userState]);

	const dispatch = useDispatch();
	const { setUser } = bindActionCreators(actionCreators, dispatch);

	const handleFavourite = async (type: string) => {
		if (!userState) {
			alert("You need to login first!");
			return;
		}

		const id = movie.data.id;

		const res =
			type === "add"
				? await addFavourite(id, userState.accessToken, userState.username)
				: await deleteFavourite(id, userState.accessToken, userState.username);

		let updatedUser = { ...userState };

		updatedUser.favourite = res;

		setUser(updatedUser);
	};

	return (
		<div className="container">
			<Link to={route}>
				<img src={movie.img} alt="" />
			</Link>

			<div className="second-part">
				<h3>{movie.data.title}</h3>

				<div className="category-container">
					<p>
						{movie.genre} | {movie.data.release_date} |{" "}
						{movie.data.vote_average}/10
					</p>

					<p>{movie.data.overview}</p>
					{!isFavourite ? (
						<button
							style={{ backgroundColor: "green" }}
							onClick={() => handleFavourite("add")}
						>
							Add To Favourites
						</button>
					) : (
						<button
							style={{ backgroundColor: "red" }}
							onClick={() => handleFavourite("remove")}
						>
							Remove from Favourites
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default SpecificMovie;
