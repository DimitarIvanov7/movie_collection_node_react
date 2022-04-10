import React from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getSingleMovie } from "../fetchData/fetchData";
import StarRatings from "react-star-ratings";
import {
	addFavourite,
	deleteFavourite,
	addComment,
	addRating,
	deleteComment,
} from "../fetchData/Auth";

import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state/index";

import {
	MovieInterface,
	State,
	genreInterface,
} from "../interfaces/main.interface";

const Movie = () => {
	const { id } = useParams();

	const [movie, setMovie] = useState<MovieInterface>();

	const [rating, setRating] = useState<number>(0);

	const getMovieData = async () => {
		const res = id && (await getSingleMovie(parseInt(id)));
		setMovie(res);
	};

	const getGenres = (genre: genreInterface) => {
		return <p>{genre.name}</p>;
	};

	const userState = useSelector((state: State) => state.user);

	const [isFavourite, setIsFavourite] = useState(false);

	const interest =
		userState.interested &&
		userState.interested.filter((movie) => movie.id === parseInt(id))[0];

	useEffect(() => {
		getMovieData();

		!userState && setIsFavourite(false);

		const favList = userState && userState.favourite.map((fav: number) => fav);

		userState
			? id && setIsFavourite(favList.includes(parseInt(id)))
			: id && setIsFavourite(false);

		userState ? setRating(interest ? interest.rating : 0) : setRating(0);
	}, [id, userState]);

	const dispatch = useDispatch();
	const { setUser } = bindActionCreators(actionCreators, dispatch);

	const handleFavourite = async (type: string) => {
		if (!userState) {
			alert("You need to login first!");
			return;
		}

		const movieId = movie && movie.data.id;
		const res =
			type === "add"
				? await addFavourite(movieId, userState.accessToken, userState.username)
				: await deleteFavourite(
						movieId,
						userState.accessToken,
						userState.username
				  );

		if (res === "Token is not valid!") {
			window.location.reload();
			alert("Your token has expired");
			return;
		}

		const updatedUser = { ...userState };

		updatedUser.favourite = res;

		setUser(updatedUser);
	};

	const handleAddComments = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!userState) {
			alert("You need to login first!");
			return;
		}
		const text = e.target.comment.value;

		const res =
			id &&
			(await addComment(
				parseInt(id),
				userState.accessToken,
				userState.username,
				text
			));

		if (res === "Token is not valid!") {
			window.location.reload();
			alert("Your token has expired");
			return;
		}

		const updatedUser = { ...userState };

		updatedUser.interested = res;

		setUser(updatedUser);

		Array.from(document.querySelectorAll("input")).forEach(
			(input) => (input.value = "")
		);
	};

	const handeDeleteComment = async () => {
		const res =
			id &&
			(await deleteComment(
				parseInt(id),
				userState.accessToken,
				userState.username
			));

		if (res === "Token is not valid!") {
			window.location.reload();
			alert("Your token has expired");
			return;
		}

		const updatedUser = { ...userState };

		updatedUser.interested = res;

		setUser(updatedUser);
	};

	const displayComments = () => {
		const comment = interest ? interest.comment : "";

		return comment;
	};

	const handleRating = async (rate: number) => {
		if (!userState) {
			alert("You need to login first!");
			return;
		}

		const res =
			id &&
			(await addRating(
				parseInt(id),
				userState.accessToken,
				userState.username,
				rate
			));

		if (res === "Token is not valid!") {
			window.location.reload();
			alert("Your token has expired");
			return;
		}

		const updatedUser = { ...userState };

		updatedUser.interested = res;

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
							{userState && <p>{displayComments()}</p>}
							<form action="/" onSubmit={(e) => handleAddComments(e)}>
								<input
									name="comment"
									type="text"
									placeholder="Add comment"
									required
								/>

								<button type="submit">Submit comment</button>
							</form>
							<button
								onClick={handeDeleteComment}
								disabled={interest && interest.comment.length === 0}
							>
								Delete comment
							</button>
						</section>
					</div>
				</div>
			)}
		</div>
	);
};

export default Movie;
