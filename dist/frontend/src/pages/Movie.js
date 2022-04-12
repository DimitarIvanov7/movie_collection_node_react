var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getSingleMovie } from "../fetchData/fetchData";
import StarRatings from "react-star-ratings";
import { addFavourite, deleteFavourite, addComment, addRating, deleteComment, } from "../fetchData/Auth";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state/index";
import { v4 as uuidv4 } from "uuid";
import { movieStyleClasses } from "../tailwindClasses";
const Movie = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState();
    const [rating, setRating] = useState(0);
    const getMovieData = () => __awaiter(void 0, void 0, void 0, function* () {
        const res = id && (yield getSingleMovie(parseInt(id)));
        setMovie(res);
    });
    const userState = useSelector((state) => state.user);
    const [isFavourite, setIsFavourite] = useState(false);
    const interest = userState &&
        id &&
        userState.interested.filter((movie) => movie.id === parseInt(id))[0];
    useEffect(() => {
        getMovieData();
        !userState && setIsFavourite(false);
        const favList = userState && userState.favourite.map((fav) => fav);
        userState
            ? id && favList && setIsFavourite(favList.includes(parseInt(id)))
            : id && setIsFavourite(false);
        userState ? setRating(interest ? interest.rating : 0) : setRating(0);
    }, [id, userState]);
    const dispatch = useDispatch();
    const { setUser } = bindActionCreators(actionCreators, dispatch);
    const handleFavourite = (type) => __awaiter(void 0, void 0, void 0, function* () {
        if (!userState) {
            alert("You need to login first!");
            return;
        }
        const movieId = movie && movie.data.id;
        const res = type === "add"
            ? movieId &&
                (yield addFavourite(movieId, userState.accessToken, userState.username))
            : movieId &&
                (yield deleteFavourite(movieId, userState.accessToken, userState.username));
        if (res === "Token is not valid!") {
            window.location.reload();
            alert("Your token has expired");
            return;
        }
        const updatedUser = Object.assign({}, userState);
        updatedUser.favourite = res;
        setUser(updatedUser);
    });
    const handleAddComments = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        if (!userState) {
            alert("You need to login first!");
            return;
        }
        const text = e.target.comment.value;
        const res = id &&
            (yield addComment(parseInt(id), userState.accessToken, userState.username, text));
        if (res === "Token is not valid!") {
            window.location.reload();
            alert("Your token has expired");
            return;
        }
        const updatedUser = Object.assign({}, userState);
        updatedUser.interested = res;
        e.target.comment.value = "";
        setUser(updatedUser);
    });
    const handeDeleteComment = () => __awaiter(void 0, void 0, void 0, function* () {
        const res = id &&
            userState &&
            (yield deleteComment(parseInt(id), userState.accessToken, userState.username));
        if (res === "Token is not valid!") {
            window.location.reload();
            alert("Your token has expired");
            return;
        }
        const updatedUser = Object.assign({}, userState);
        updatedUser.interested = res;
        setUser(updatedUser);
    });
    const displayComments = () => {
        const comment = interest ? interest.comment : "";
        return comment;
    };
    const handleRating = (rate) => __awaiter(void 0, void 0, void 0, function* () {
        if (!userState) {
            alert("You need to login first!");
            return;
        }
        const res = id &&
            (yield addRating(parseInt(id), userState.accessToken, userState.username, rate));
        if (res === "Token is not valid!") {
            window.location.reload();
            alert("Your token has expired");
            return;
        }
        const updatedUser = Object.assign({}, userState);
        updatedUser.interested = res;
        setUser(updatedUser);
    });
    return (<div>
			<Header searchRef={null}/>
			{movie && (<div className="my-6 mx-10">
					<div className="main-info flex gap-10">
						<img className="w-1/5" src={movie.img !== "https://image.tmdb.org/t/p/w500null"
                ? movie.img
                : "/images/no_img.png"} alt=""/>
						<div className="movie-data">
							<h2 className="text-5xl mb-4">
								{movie.data.title} ({movie.data.release_date.substring(0, 4)})
							</h2>
							<div className="flex font-bold">
								{movie.data.genres.length !== 0
                ? movie.data.genres.map((genre, i) => {
                    if (i === 0)
                        return <p key={uuidv4()}>{genre.name}, </p>;
                    else if (i === movie.data.genres.length - 1)
                        return <p key={uuidv4()}>&nbsp; {genre.name}</p>;
                    else
                        return <p key={uuidv4()}>&nbsp; {genre.name}, </p>;
                })
                : "no genre info"}
								&nbsp; | {movie.data.vote_average}/10
							</div>

							<p className="my-4 w-4/5">
								{movie.data.overview || "no overwiev info"}
							</p>
							{movie.data.homepage ? (<a className="block mb-8 text-blue hover:text-blue-light w-fit" href={movie.data.homepage}>
									Official site
								</a>) : (<p className="mb-8">No official site provided</p>)}

							{!isFavourite ? (<button onClick={() => handleFavourite("add")} className={movieStyleClasses.buttonAdd}>
									Add to Favourites
								</button>) : (<button onClick={() => handleFavourite("remove")} className={movieStyleClasses.buttonRemove}>
									Remove from Favourites
								</button>)}
						</div>
					</div>

					<div className="review-container mt-8">
						<h2 className="text-2rem font-bold mb-4">Your Review</h2>
						<StarRatings rating={rating} changeRating={handleRating} starRatedColor="#FFB133
                            "/>

						<section className="comment-section">
							{userState && (<>
									<h3 className="text-lg font-bold mt-4">Your Notes:</h3>
									<p>{displayComments()}</p>
								</>)}
							<form action="/" onSubmit={(e) => handleAddComments(e)}>
								<textarea className="px-2 border border-grey mt-4 block" name="comment" id="textarea-input" rows={6} cols={70} placeholder="Your private notes and comments about the movie..." required></textarea>

								<button className=" my-4 bg-transparent hover:bg-grey text-grey font-semibold hover:text-white py-2 px-4 border border-grey hover:border-transparent rounded" type="submit">
									Submit note
								</button>
							</form>
							<button className="bg-transparent hover:bg-red text-grey font-semibold hover:text-white py-2 px-4 border border-grey hover:border-transparent cursor-pointer rounded" onClick={handeDeleteComment} disabled={interest && interest.comment.length !== 0 ? false : true}>
								Delete notes
							</button>
						</section>
					</div>
				</div>)}
		</div>);
};
export default Movie;
//# sourceMappingURL=Movie.js.map