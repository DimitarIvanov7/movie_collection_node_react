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
import { addFavourite, deleteFavourite } from "../fetchData/Auth";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state/index";
const Movie = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState();
    const getMovieData = () => __awaiter(void 0, void 0, void 0, function* () {
        const res = id && (yield getSingleMovie(id));
        setMovie(res);
    });
    const getGenres = (genre) => {
        return <p>{genre.name}</p>;
    };
    const [rating, setRating] = useState(0);
    const handleRating = (rate) => {
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
    const handleFavourite = (type) => __awaiter(void 0, void 0, void 0, function* () {
        if (!userState) {
            alert("You need to login first!");
            return;
        }
        const movieId = movie.data.id;
        const res = type === "add"
            ? yield addFavourite(movieId, userState.accessToken, userState.username)
            : yield deleteFavourite(movieId, userState.accessToken, userState.username);
        let updatedUser = Object.assign({}, userState);
        updatedUser.favourite = res;
        setUser(updatedUser);
    });
    return (<div>
			<Header />
			{movie && (<div className="container">
					<div className="main-info">
						<img src={movie.img} alt=""/>
						<div className="movie-data">
							<h2>{movie.data.title}</h2>
							<div>
								{movie.data.genres.map((genre) => {
                return getGenres(genre);
            })}
							</div>

							<p>{movie.data.overview}</p>
							<a href={movie.data.homepage}>Official site</a>

							{!isFavourite ? (<button onClick={() => handleFavourite("add")} style={{ backgroundColor: "green" }}>
									Add to Favourites
								</button>) : (<button onClick={() => handleFavourite("remove")} style={{ backgroundColor: "red" }}>
									Remove from Favourites
								</button>)}
						</div>
					</div>

					<div className="review-container">
						<h2>Your Review</h2>
						<StarRatings rating={rating} changeRating={handleRating} starRatedColor="#FFB133
                            "/>

						<section className="comment-section">
							<p className="coments">comment</p>
						</section>
					</div>
				</div>)}
		</div>);
};
export default Movie;
//# sourceMappingURL=Movie.js.map