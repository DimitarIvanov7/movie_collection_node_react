var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";
import { searchMovies } from "./getMovieData/searchMany";
const app = express();
const port = process.env.PORT;
const mongoURI = process.env.MONGODB_URI;
const movieAPI = process.env.MOVIEDB_KEY;
// http://image.tmdb.org/t/p/
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({
    origin: "http://localhost:3000",
}));
mongoURI &&
    mongoose
        .connect(mongoURI)
        .then(() => {
        app.listen(port);
    })
        .catch((err) => console.log(err));
const users = [
    {
        id: "1",
        username: "john",
        password: "John0908",
        isAdmin: true,
    },
    {
        id: "2",
        username: "jane",
        password: "Jane0908",
        isAdmin: false,
    },
];
// let refreshTokens: string[] = [];
// app.post("/api/refresh", (req, res) => {
// 	//take the refresh token from the user
// 	const refreshToken = req.body.token;
// 	//send error if there is no token or it's invalid
// 	if (!refreshToken) return res.status(401).json("You are not authenticated!");
// 	if (!refreshTokens.includes(refreshToken)) {
// 		return res.status(403).json("Refresh token is not valid!");
// 	}
// 	verify(refreshToken, "myRefreshSecretKey", (err: any, user: any) => {
// 		err && console.log(err);
// 		refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
// 		const newAccessToken = generateAccessToken(user);
// 		const newRefreshToken = generateRefreshToken(user);
// 		refreshTokens.push(newRefreshToken);
// 		res.status(200).json({
// 			accessToken: newAccessToken,
// 			refreshToken: newRefreshToken,
// 		});
// 	});
// 	//if everything is ok, create new access token, refresh token and send to user
// });
// const generateAccessToken = (user: any) => {
// 	return sign({ id: user.id, isAdmin: user.isAdmin }, "mySecretKey", {
// 		expiresIn: "5s",
// 	});
// };
// const generateRefreshToken = (user: any) => {
// 	return sign({ id: user.id, isAdmin: user.isAdmin }, "myRefreshSecretKey");
// };
// const verifyUser = (req: any, res: any, next: any) => {
// 	const authHeader = req.headers.authorization;
// 	if (authHeader) {
// 		const token = authHeader.split(" ")[1];
// 		verify(token, "mySecretKey", (err: any, user: any) => {
// 			if (err) {
// 				return res.status(403).json("Token is not valid!");
// 			}
// 			req.user = user;
// 			next();
// 		});
// 	} else {
// 		res.status(401).json("You are not authenticated!");
// 	}
// };
// app.delete("/api/users/:userId", verifyUser, (req: any, res) => {
// 	if (req.user.id === req.params.userId || req.user.isAdmin) {
// 		res.status(200).json("User has been deleted.");
// 	} else {
// 		res.status(403).json("You are not allowed to delete this user!");
// 	}
// });
// app.post("/api/logout", verifyUser, (req, res) => {
// 	const refreshToken = req.body.token;
// 	refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
// 	res.status(200).json("You logged out successfully.");
// });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
app.get("/api/search/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    res.send("test");
}));
app.get("/api/search/:title", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const param = req.params.title;
    const moviesJSON = movieAPI && (yield searchMovies(param, movieAPI));
    console.log(moviesJSON);
}));
app.get("/api/movies/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("return all movies");
}));
app.get("/api/movies/:title", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("test 2");
}));
app.get("/api/favorite/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("test 3 ");
}));
app.get("/api/rating/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("test 4");
}));
app.get("/api/notes/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("test 5");
}));
//# sourceMappingURL=app.js.map