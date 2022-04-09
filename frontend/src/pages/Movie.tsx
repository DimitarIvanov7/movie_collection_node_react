import React from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getSingleMovie } from "../fetchData/fetchData";
import StarRatings from "react-star-ratings";
import { addFavourite, deleteFavourite } from "../fetchData/Auth";

import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state/index";

const Movie = () => {
	const { id } = useParams();

	const [movie, setMovie] = useState();

	const getMovieData = async () => {
		const res = id && (await getSingleMovie(id));
		setMovie(res);
	};

	const getGenres = (genre) => {
		return <p>{genre.name}</p>;
	};

	const [rating, setRating] = useState(0);

	const handleRating = (rate: number) => {
		setRating(rate);
	};

	const userState = useSelector((state) => state.user);

	const [isFavourite, setIsFavourite] = useState(false);
	useEffect(() => {
		getMovieData();

		!userState && setIsFavourite(false);

		const favList = userState && userState.favourite.map((fav) => fav.id);

		userState && setIsFavourite(favList.includes(parseInt(id)));
	}, [id, userState]);

	const dispatch = useDispatch();
	const { setUser } = bindActionCreators(actionCreators, dispatch);

	const handleFavourite = async (type: string) => {
		if (!userState) {
			alert("You need to login first!");
			return;
		}

		const movieId = movie.data.id;
		const res =
			type === "add"
				? await addFavourite(movieId, userState.accessToken, userState.username)
				: await deleteFavourite(
						movieId,
						userState.accessToken,
						userState.username
				  );

		let updatedUser = { ...userState };

		updatedUser.favourite = res;

		setUser(updatedUser);
	};

	return (
		<div>
			<Header />
			{movie && (
				<div className="container">
					<div className="main-info">
						<img src={movie.img} alt="" />
						<div className="movie-data">
							<h2>{movie.data.title}</h2>
							<div>
								{movie.data.genres.map((genre) => {
									return getGenres(genre);
								})}
							</div>

							<p>{movie.data.overview}</p>
							<a href={movie.data.homepage}>Official site</a>

							{!isFavourite ? (
								<button
									onClick={() => handleFavourite("add")}
									style={{ backgroundColor: "green" }}
								>
									Add to Favourites
								</button>
							) : (
								<button
									onClick={() => handleFavourite("remove")}
									style={{ backgroundColor: "red" }}
								>
									Remove from Favourites
								</button>
							)}
						</div>
					</div>

					<div className="review-container">
						<h2>Your Review</h2>
						<StarRatings
							rating={rating}
							changeRating={handleRating}
							starRatedColor="#FFB133
                            "
						/>

						<section className="comment-section">
							<p className="coments">comment</p>
						</section>
					</div>
				</div>
			)}
		</div>
	);
};

export default Movie;
