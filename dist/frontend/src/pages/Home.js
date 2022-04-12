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
			<div className="w-full bg-dark-max">
				<h2 className={`${classes.heading} ml-3 text-center sm:text-left`}>
					Check your favourite movies
				</h2>
				<section className="bg-darkWhite w-full pb-20" style={{ minHeight: "10rem" }}>
					{userState ? (<div className="flex gap-4 flex-wrap mx-auto justify-center ">
							<h2 className="font-bold text-3xl py-4 w-full text-center">
								Your Favorites
							</h2>

							{favourite.length > 0 ? (favourite.map((fav) => (<SpecificMovie key={uuidv4()} movie={fav} type="homepage"/>))) : (<p className={`text-2rem text-black pt-11 text-center`}>
									Your favourite list is empty
								</p>)}
						</div>) : (<div>
							<p className={`text-2rem text-black pt-11 text-center`}>
								You need to login to see your favourites
							</p>
						</div>)}
				</section>
			</div>
		</div>);
};
export default Home;
//# sourceMappingURL=Home.js.map