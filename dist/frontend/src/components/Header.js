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
import classes from "../tailwindClasses";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state/index";
import { logoutUser } from "../fetchData/Auth";
import { useState } from "react";
const Header = ({ searchRef }) => {
    const [isSearchFocus, setIsSearchFocus] = useState(false);
    const onFocus = () => setIsSearchFocus(true);
    const onBlur = () => setIsSearchFocus(false);
    const location = useLocation();
    const navigate = useNavigate();
    const handleSearch = (e) => {
        e.preventDefault();
        console.log(e.target.movie.value);
        const path = `/search?q=${e.target.movie.value}`;
        navigate(path);
    };
    const dispatch = useDispatch();
    const { LoginOpen, setUser } = bindActionCreators(actionCreators, dispatch);
    const userState = useSelector((state) => state.user);
    const handeLogout = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const res = userState && (yield logoutUser(userState.accessToken));
        if (res === "You logged out successfully.")
            setUser(false);
        else {
            window.location.reload();
            alert("Your token has expired");
            return;
        }
    });
    const background = location.pathname === "/" ? "bg-transparent" : "bg-dark";
    return (<header className={`p-4 flex flex-col gap-4 justify-between ${background} md:flex-row`}>
			<Link to="/">
				<h1 className={classes.heading}>My Movie Collection</h1>
			</Link>
			<div className="form-container flex gap-x-1.5">
				<form onSubmit={(e) => handleSearch(e)} className="flex gap-x-1.5 ml-auto">
					<input ref={searchRef} onFocus={onFocus} onBlur={onBlur} style={{
            boxShadow: isSearchFocus ? "0 0 0 9999px #000000b0" : "none",
            zIndex: 99,
        }} type="text" name="movie" className="bg-gray appearance-none border-2 border-gray rounded w-full py-2 px-4 text-gray leading-tight focus:outline-none focus:bg-white focus:border-gray" placeholder="Search by movie title... " required/>
					<button style={{ zIndex: 100 }} type="submit" className={classes.button}>
						Search
					</button>
				</form>
				{!userState ? (<button onClick={() => LoginOpen(true)} className={classes.button}>
						Login
					</button>) : (<button onClick={handeLogout} className={classes.button}>
						Logout
					</button>)}
			</div>
		</header>);
};
export default Header;
//# sourceMappingURL=Header.js.map