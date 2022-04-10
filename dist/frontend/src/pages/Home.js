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
import Hero from "../components/Hero";
import classes from "../tailwindClasses";
import { getSingleMovie } from "../fetchData/fetchData";
import SpecificMovie from "../components/SpecificMovie";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
const Home = () => {
    const userState = useSelector((state) => state.user);
    const [favourite, setFavourite] = useState([]);
    useEffect(() => {
        userState && GetFavourites();
    }, [userState]);
    const favList = userState && userState.favourite.map((fav) => fav);
    const GetFavourites = () => __awaiter(void 0, void 0, void 0, function* () {
        const multipleRes = favList &&
            favList.map((fav) => __awaiter(void 0, void 0, void 0, function* () {
                const res = yield getSingleMovie(fav);
                return res;
            }));
        const awaitAll = yield Promise.all(multipleRes).then((values) => values);
        setFavourite(awaitAll);
    });
    return (<div>
			<Hero />
			<div className="w-full bg-dark-max h-12 cursor-pointer">
				<h2 className={classes.heading}>Check your favourite movies</h2>
				{userState ? (<section>
						{favourite.length > 0 ? (favourite.map((fav) => (<SpecificMovie key={uuidv4()} movie={fav}/>))) : (<p>Your favourite list is empty</p>)}
					</section>) : (<p>You need to login to see your favourites</p>)}
			</div>
		</div>);
};
export default Home;
//# sourceMappingURL=Home.js.map