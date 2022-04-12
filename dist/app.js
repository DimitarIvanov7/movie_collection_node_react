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
const { verify, sign } = pkg;
import { searchMovies, getMovie, getAllGenres, } from "./getMovieData/searchMovies.js";
const app = express();
const port = process.env.PORT;
const mongoURI = process.env.MONGODB_URI;
const movieAPI = process.env.MOVIEDB_KEY;
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
//authentication and authorization
const generateAccessToken = (user) => {
    return (secretAccessKey &&
        sign({ name: user.name }, secretAccessKey, {
            expiresIn: "20m",
        }));
};
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
        favourite: [],
        interested: [],
    });
    user.save().then(() => {
        res.send("Successfully created");
    });
}));
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
        const accessToken = generateAccessToken(username);
        res.json({
            username: username,
            accessToken,
            favourite: validName.favourite,
            interested: validName.interested,
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
        secretAccessKey &&
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
app.post("/api/logout", verifyUser, (req, res) => {
    res.status(200).json("You logged out successfully.");
});
app.post("/api/favourite", verifyUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const movieId = parseInt(req.body.id);
    const username = req.body.username;
    yield User.findOneAndUpdate({ name: username }, {
        $push: {
            favourite: [movieId],
        },
    });
    const updatedUser = yield User.findOne({ name: username });
    res.json(updatedUser.favourite);
}));
app.delete("/api/favourite/:id", verifyUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const movieId = parseInt(req.params.id);
    const username = req.body.username;
    yield User.updateMany({ name: username }, {
        $pull: {
            favourite: movieId,
        },
    });
    const updatedUser = yield User.findOne({ name: username });
    res.json(updatedUser.favourite);
}));
const addIntrestedComment = (username, movieId, comment) => __awaiter(void 0, void 0, void 0, function* () {
    yield User.findOneAndUpdate({ name: username }, {
        $push: {
            interested: {
                id: movieId,
                rating: 0,
                comment: comment,
            },
        },
    });
});
app.post("/api/interested/comment/:movieId", verifyUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const movieId = parseInt(req.params.movieId);
    const username = req.body.username;
    const comment = req.body.comment;
    const checkInterested = yield User.findOne({
        name: username,
        "interested.id": movieId,
    });
    if (!checkInterested) {
        yield addIntrestedComment(username, movieId, comment);
    }
    else {
        const userInfo = yield User.findOne({ name: username });
        const prevComment = userInfo.interested &&
            userInfo.interested.filter((movie) => movie.id === movieId)[0].comment;
        yield User.findOneAndUpdate({ name: username, "interested.id": movieId }, {
            $set: {
                "interested.$.comment": `${prevComment + " \n" + comment}`,
            },
        });
    }
    const updatedUser = yield User.findOne({ name: username });
    res.json(updatedUser.interested);
}));
app.delete("/api/interested/comment/:movieId", verifyUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const movieId = parseInt(req.params.movieId);
    const username = req.body.username;
    yield User.findOneAndUpdate({ name: username, "interested.id": movieId }, {
        $set: {
            "interested.$.comment": "",
        },
    });
    const updatedUser = yield User.findOne({ name: username });
    res.json(updatedUser.interested);
}));
const addIntrestedRate = (username, movieId, rate) => __awaiter(void 0, void 0, void 0, function* () {
    yield User.findOneAndUpdate({ name: username }, {
        $push: {
            interested: {
                id: movieId,
                rating: rate,
                comment: "",
            },
        },
    });
});
app.post("/api/interested/rate/:movieId", verifyUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const movieId = parseInt(req.params.movieId);
    const username = req.body.username;
    const rate = parseInt(req.body.rate);
    const checkInterested = yield User.findOne({
        name: username,
        "interested.id": movieId,
    });
    if (!checkInterested) {
        yield addIntrestedRate(username, movieId, rate);
    }
    else {
        yield User.findOneAndUpdate({ name: username, "interested.id": movieId }, {
            $set: {
                "interested.$.rating": rate,
            },
        });
    }
    const updatedUser = yield User.findOne({ name: username });
    res.json(updatedUser.interested);
}));
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
//# sourceMappingURL=app.js.map