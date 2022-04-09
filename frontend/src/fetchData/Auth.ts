import axios from "axios";
import jwt_decode from "jwt-decode";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state/index";

// const dispatch = useDispatch();
// const { setUser } = bindActionCreators(actionCreators, dispatch);

// const userState = useSelector((state) => state.user);

export const createUser = async (username: string, password: string) => {
	const res = await fetch("/user", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ name: username, password: password }),
	});

	const resJSON = await res.text();

	return resJSON;
};

export const getUser = async (username: string, accesToken: string) => {
	const res = await fetch(`/users/${username}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			authorization: "Bearer " + accesToken,
		},
	});

	const resJSON = await res.json();

	return resJSON;
};

export const loginUser = async (username: string, password: string) => {
	const res = await fetch("/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ username: username, password: password }),
	});

	const resJSON = await res.json();

	return resJSON;
};

export const logoutUser = async (accesToken: string, refreshToken: string) => {
	const res = await fetch("/logout", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			authorization: "Bearer " + accesToken,
		},
		body: JSON.stringify({ token: refreshToken }),
	});

	const resJSON = await res.json();

	return resJSON;
};

// export const autoRefreshToken = (user, setUser) => {
// 	const refreshToken = async () => {
// 		try {
// 			const res = await axios.post("/refresh", { token: user.refreshToken });
// 			setUser({
// 				...user,
// 				accessToken: res.data.accessToken,
// 				refreshToken: res.data.refreshToken,
// 			});
// 			return res.data;
// 		} catch (err) {
// 			console.log(err);
// 		}
// 	};

// 	const axiosJWT = axios.create();

// 	return axiosJWT.interceptors.request.use(
// 		async (config) => {
// 			let currentDate = new Date();
// 			const decodedToken = jwt_decode(user.accessToken);
// 			if (decodedToken.exp * 1000 < currentDate.getTime()) {
// 				const data = await refreshToken();
// 				config.headers["authorization"] = "Bearer " + data.accessToken;
// 			}
// 			return config;
// 		},
// 		(error) => {
// 			return Promise.reject(error);
// 		}
// 	);
// };

// const refreshToken = async () => {
// 	try {
// 		const res = await axios.post("/refresh", { token: user.refreshToken });
// 		setUser({
// 			...user,
// 			accessToken: res.data.accessToken,
// 			refreshToken: res.data.refreshToken,
// 		});
// 		return res.data;
// 	} catch (err) {
// 		console.log(err);
// 	}
// };

// const refreshToken = async () => {
// 	try {
// 		const res = await axios.post("/refresh", { token: userState.refreshToken });
// 		setUser({
// 			...userState,
// 			accessToken: res.data.accessToken,
// 			refreshToken: res.data.refreshToken,
// 		});
// 		return res.data;
// 	} catch (err) {
// 		console.log(err);
// 	}
// };

// const axiosJWT = axios.create();

// axiosJWT.interceptors.request.use(
// 	async (config) => {
// 		let currentDate = new Date();
// 		const decodedToken = jwt_decode(userState.accessToken);
// 		if (decodedToken.exp * 1000 < currentDate.getTime()) {
// 			const data = await refreshToken();
// 			config.headers["authorization"] = "Bearer " + data.accessToken;
// 		}
// 		return config;
// 	},
// 	(error) => {
// 		return Promise.reject(error);
// 	}
// );

// export const addFavourite2 = async (
// 	id: number,
// 	accesToken: string,
// 	username: string
// ) => {
// 	const res = await axiosJWT.post("/favourite" + id, {
// 		headers: { authorization: "Bearer " + accesToken },
// 	});

// 	return res;
// };

export const addFavourite = async (
	id: number,
	accesToken: string,
	username: string
) => {
	const res = await fetch(`/favourite`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			authorization: "Bearer " + accesToken,
		},
		body: JSON.stringify({ username: username, id: id }),
	});

	const resJSON = await res.json();

	// const res = await autoRefreshToken(user, setUser).delte

	return resJSON;
};

export const deleteFavourite = async (
	id: number,
	accesToken: string,
	username: string
) => {
	const res = await fetch(`/favourite/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			authorization: "Bearer " + accesToken,
		},
		body: JSON.stringify({ username: username }),
	});

	const resJSON = await res.json();

	return resJSON;
};
