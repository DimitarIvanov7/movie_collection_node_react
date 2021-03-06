import React from "react";
import classes from "../tailwindClasses";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state/index";
import { logoutUser } from "../fetchData/Auth";
import { State } from "../interfaces/main.interface";
import { useState, forwardRef } from "react";

interface HeaderProps {
	searchRef: React.ForwardedRef<HTMLInputElement> | null;
}

const Header = ({ searchRef }: HeaderProps) => {
	//on "Browse" button click the search input is focused
	const [isSearchFocus, setIsSearchFocus] = useState(false);

	//changes the focus
	const onFocus = () => setIsSearchFocus(true);
	const onBlur = () => setIsSearchFocus(false);

	const location = useLocation();

	//used to navigate to search results page
	const navigate = useNavigate();

	const handleSearch = (e: React.SyntheticEvent): void => {
		e.preventDefault();

		const target = e.target as typeof e.target & {
			movie: { value: string };
		};

		//path is created to the search page with the user input as a query
		const path = `/search?q=${target.movie.value}`;
		navigate(path);

		//focus is removed from the search input
		onBlur();
	};

	//redux actions that check if login is open (to display the login component on all pages). And setuser
	const dispatch = useDispatch();
	const { LoginOpen, setUser } = bindActionCreators(actionCreators, dispatch);

	const userState = useSelector((state: State) => state.user);

	//on logout button click, user is set to false
	const handeLogout = async (): Promise<void> => {
		const res = userState && (await logoutUser(userState.accessToken));

		if (res === "You logged out successfully.") setUser(false);
		else {
			window.location.reload();
			alert("Your token has expired");
			return;
		}
	};

	const background = location.pathname === "/" ? "bg-transparent" : "bg-dark";
	return (
		<header
			className={`p-4 flex flex-col gap-4 justify-between ${background} md:flex-row`}
		>
			<Link to="/">
				<h1 className={classes.heading}>My Movie Collection</h1>
			</Link>
			<div className="form-container flex gap-x-1.5">
				<form
					onSubmit={(e) => handleSearch(e)}
					className="flex gap-x-1.5 ml-auto"
				>
					<input
						ref={searchRef}
						onFocus={onFocus}
						onBlur={onBlur}
						style={{
							boxShadow: isSearchFocus ? "0 0 0 9999px #000000b0" : "none",
							zIndex: 99,
						}}
						type="text"
						name="movie"
						className="bg-gray appearance-none border-2 border-gray rounded w-full py-2 px-4 text-gray leading-tight focus:outline-none focus:bg-white focus:border-gray"
						placeholder="Search by movie title... "
						required
					/>
					<button
						style={{ zIndex: 100 }}
						type="submit"
						className={classes.button}
					>
						Search
					</button>
				</form>
				{!userState ? (
					<button onClick={() => LoginOpen(true)} className={classes.button}>
						Login
					</button>
				) : (
					<button onClick={handeLogout} className={classes.button}>
						Logout
					</button>
				)}
			</div>
		</header>
	);
};

export default Header;
