var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// const dispatch = useDispatch();
// const { setUser } = bindActionCreators(actionCreators, dispatch);
// const userState = useSelector((state) => state.user);
export const createUser = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch("/user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: username, password: password }),
    });
    const resJSON = yield res.text();
    return resJSON;
});
export const getUser = (username, accesToken) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch(`/users/${username}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + accesToken,
        },
    });
    const resJSON = yield res.json();
    return resJSON;
});
export const loginUser = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
    });
    const resJSON = yield res.json();
    return resJSON;
});
export const logoutUser = (accesToken, refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch("/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + accesToken,
        },
        body: JSON.stringify({ token: refreshToken }),
    });
    const resJSON = yield res.json();
    return resJSON;
});
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
export const addFavourite = (id, accesToken, username) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch(`/favourite`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + accesToken,
        },
        body: JSON.stringify({ username: username, id: id }),
    });
    const resJSON = yield res.json();
    // const res = await autoRefreshToken(user, setUser).delte
    return resJSON;
});
export const deleteFavourite = (id, accesToken, username) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch(`/favourite/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + accesToken,
        },
        body: JSON.stringify({ username: username }),
    });
    const resJSON = yield res.json();
    return resJSON;
});
//# sourceMappingURL=Auth.js.map