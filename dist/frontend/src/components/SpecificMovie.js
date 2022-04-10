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
        const favList = userState && userState.favourite.map((fav) => fav);
        userState
            ? setIsFavourite(favList.includes(parseInt(movie.data.id)))
            : setIsFavourite(false);
    }, [userState]);
    const dispatch = useDispatch();
    const { setUser } = bindActionCreators(actionCreators, dispatch);
    const handleFavourite = (type) => __awaiter(void 0, void 0, void 0, function* () {
        if (!userState) {
            alert("You need to login first!");
            return;
        }
        const id = movie.data.id;
        const res = type === "add"
            ? yield addFavourite(id, userState.accessToken, userState.username)
            : yield deleteFavourite(id, userState.accessToken, userState.username);
        if (res === "Token is not valid!") {
            window.location.reload();
            alert("Your token has expired");
            return;
        }
        const updatedUser = Object.assign({}, userState);
        updatedUser.favourite = res;
        setUser(updatedUser);
    });
    return (<div className="container">
			<Link to={route}>
				<img src={movie.img} alt=""/>
			</Link>

			<div className="second-part">
				<h3>{movie.data.title}</h3>

				<div className="category-container">
					<p>
						{movie.genre} | {movie.data.release_date} |{" "}
						{movie.data.vote_average}/10
					</p>

					<p>{movie.data.overview}</p>
					{!isFavourite ? (<button style={{ backgroundColor: "green" }} onClick={() => handleFavourite("add")}>
							Add To Favourites
						</button>) : (<button style={{ backgroundColor: "red" }} onClick={() => handleFavourite("remove")}>
							Remove from Favourites
						</button>)}
				</div>
			</div>
		</div>);
};
export default SpecificMovie;
//# sourceMappingURL=SpecificMovie.js.map