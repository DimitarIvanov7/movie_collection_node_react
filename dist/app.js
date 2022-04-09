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
import User from "./models/users_mod.js";
import bcrypt from "bcrypt";
import pkg from "jsonwebtoken";
const { Secret, decode, verify, sign } = pkg;
import { searchMovies, getMovie, getAllGenres, } from "./getMovieData/searchMovies.js";
const app = express();
const port = process.env.PORT;
const mongoURI = process.env.MONGODB_URI;
const movieAPI = process.env.MOVIEDB_KEY;
const secretRefreshKey = process.env.REFRESH_TOKEN_SECRET;
const secretAccessKey = process.env.ACCESS_TOKEN_SECRET;
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
    },
    {
        id: "2",
        username: "jane",
        password: "Jane0908",
    },
];
let refreshTokens = [];
app.post("/api/refresh", (req, res) => {
    //take the refresh token from the user
    const refreshToken = req.body.token;
    //send error if there is no token or it's invalid
    if (!refreshToken)
        return res.status(401).json("You are not authenticated!");
    if (!refreshTokens.includes(refreshToken)) {
        return res.status(403).json("Refresh token is not valid!");
    }
    verify(refreshToken, secretRefreshKey, (err, user) => {
        err && console.log(err);
        refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);
        refreshTokens.push(newRefreshToken);
        res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        });
    });
    //if everything is ok, create new access token, refresh token and send to user
});
const generateAccessToken = (user) => {
    return sign({ id: user.id }, secretAccessKey, {
        expiresIn: "15m",
    });
};
const generateRefreshToken = (user) => {
    return sign({ id: user.id }, secretRefreshKey);
};
app.post("/api/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const validName = yield User.findOne({ name: username });
    if (!validName) {
        res.json("Wrong username");
        return;
    }
    const validPass = yield bcrypt.compare(req.body.password, validName.password);
    if (validPass) {
        //Generate an access token
        const accessToken = generateAccessToken(validPass);
        const refreshToken = generateRefreshToken(validPass);
        refreshTokens.push(refreshToken);
        res.json({
            username: username,
            accessToken,
            refreshToken,
            favourite: validName.favourite,
        });
    }
    else {
        res.status(400).json("Wrong password!");
    }
}));
const verifyUser = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        verify(token, secretAccessKey, (err, user) => {
            if (err) {
                return res.status(403).json("Token is not valid!");
            }
            req.user = user;
            next();
        });
    }
    else {
        res.status(401).json("You are not authenticated!");
    }
};
app.get("/api/users/:username", verifyUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User.findOne({ name: req.params.username });
    if (user)
        res.json(user);
    else
        res.json("error");
}));
app.delete("/api/users/:userId", verifyUser, (req, res) => {
    if (req.user.id === req.params.userId) {
        res.status(200).json("User has been deleted.");
    }
    else {
        res.status(403).json("You are not allowed to delete this user!");
    }
});
app.post("/api/logout", verifyUser, (req, res) => {
    const refreshToken = req.body.token;
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    res.status(200).json("You logged out successfully.");
});
app.post("/api/favourite", verifyUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const movieId = req.body.id;
    const username = req.body.username;
    yield User.findOneAndUpdate({ name: username }, {
        $push: {
            favourite: {
                id: movieId,
                rating: 0,
                comments: [],
            },
        },
    });
    const updatedUser = yield User.findOne({ name: username });
    res.json(updatedUser.favourite);
}));
app.delete("/api/favourite/:id", verifyUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const movieId = req.params.id;
    const username = req.body.username;
    yield User.updateMany({ name: username }, {
        $pull: {
            favourite: {
                id: parseInt(movieId),
            },
        },
    });
    const updatedUser = yield User.findOne({ name: username });
    res.json(updatedUser.favourite);
}));
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
app.get("/api/search/:title", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const param = req.params.title;
    const moviesJSON = movieAPI && (yield searchMovies(param, movieAPI));
    res.send(moviesJSON);
}));
app.get("/api/movies/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const param = req.params.id;
    const movieJSON = movieAPI && (yield getMovie(param, movieAPI));
    res.send(movieJSON);
}));
app.get("/api/genres/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categorieJSON = movieAPI && (yield getAllGenres(movieAPI));
    res.send(categorieJSON);
}));
app.post("/api/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcrypt.genSalt();
    const hashedPass = yield bcrypt.hash(req.body.password, salt);
    const username = req.body.name;
    const exists = yield User.findOne({ name: username });
    if (exists) {
        res.send("User already exists");
        return;
    }
    const user = new User({
        name: req.body.name,
        password: hashedPass,
    });
    user.save().then(() => {
        res.send("Successfully created");
    });
}));
//
//# sourceMappingURL=app.js.map