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

import {
	searchMovies,
	getMovie,
	getAllGenres,
} from "./getMovieData/searchMovies.js";

const app = express();
const port = process.env.PORT;
const mongoURI = process.env.MONGODB_URI;
const movieAPI = process.env.MOVIEDB_KEY;
const secretAccessKey = process.env.ACCESS_TOKEN_SECRET;

app.use(express.json());

app.use(morgan("dev"));

app.use(
	cors({
		origin: "http://localhost:3000",
	})
);

mongoURI &&
	mongoose
		.connect(mongoURI)
		.then(() => {
			app.listen(port);
		})
		.catch((err) => console.log(err));

//authentication and authorization

const generateAccessToken = (user) => {
	return sign({ id: user.id }, secretAccessKey, {
		expiresIn: "20m",
	});
};

app.post("/api/user", async (req, res) => {
	const salt = await bcrypt.genSalt();
	const hashedPass = await bcrypt.hash(req.body.password, salt);

	const username = req.body.name;

	const exists = await User.findOne({ name: username });

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
});

app.post("/api/login", async (req, res) => {
	const username = req.body.username;

	const validName = await User.findOne({ name: username });

	if (!validName) {
		res.json("Wrong username");
		return;
	}

	const validPass = await bcrypt.compare(req.body.password, validName.password);

	if (validPass) {
		//Generate an access token
		const accessToken = generateAccessToken(validPass);
		res.json({
			username: username,
			accessToken,
			favourite: validName.favourite,
			interested: validName.interested,
		});
	} else {
		res.status(400).json("Wrong password!");
	}
});

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
	} else {
		res.status(401).json("You are not authenticated!");
	}
};

app.post("/api/logout", verifyUser, (req, res) => {
	res.status(200).json("You logged out successfully.");
});

app.post("/api/favourite", verifyUser, async (req, res) => {
	const movieId = parseInt(req.body.id);
	const username = req.body.username;

	console.log(movieId);

	await User.findOneAndUpdate(
		{ name: username },
		{
			$push: {
				favourite: [movieId],
			},
		}
	);

	const updatedUser = await User.findOne({ name: username });

	console.log(updatedUser.favourite);

	res.json(updatedUser.favourite);
});

app.delete("/api/favourite/:id", verifyUser, async (req, res) => {
	const movieId = parseInt(req.params.id);
	const username = req.body.username;

	await User.updateMany(
		{ name: username },
		{
			$pull: {
				favourite: movieId,
			},
		}
	);

	const updatedUser = await User.findOne({ name: username });

	res.json(updatedUser.favourite);
});

const addIntrestedComment = async (
	username: string,
	movieId: number,
	comment: string
) => {
	await User.findOneAndUpdate(
		{ name: username },
		{
			$push: {
				interested: {
					id: movieId,
					rating: 0,
					comment: comment,
				},
			},
		}
	);
};

app.post("/api/interested/comment/:movieId", verifyUser, async (req, res) => {
	const movieId = parseInt(req.params.movieId);
	const username = req.body.username;
	const comment = req.body.comment;

	const checkInterested = await User.findOne({
		name: username,
		"interested.id": movieId,
	});

	if (!checkInterested) {
		await addIntrestedComment(username, movieId, comment);
	} else {
		const userInfo = await User.findOne({ name: username });

		const prevComment =
			userInfo.interested &&
			userInfo.interested.filter((movie) => movie.id === movieId)[0].comment;

		await User.findOneAndUpdate(
			{ name: username, "interested.id": movieId },
			{
				$set: {
					"interested.$.comment": `${prevComment + " \n" + comment}`,
				},
			}
		);
	}

	const updatedUser = await User.findOne({ name: username });

	res.json(updatedUser.interested);
});

app.delete("/api/interested/comment/:movieId", verifyUser, async (req, res) => {
	const movieId = parseInt(req.params.movieId);
	const username = req.body.username;

	await User.findOneAndUpdate(
		{ name: username, "interested.id": movieId },
		{
			$set: {
				"interested.$.comment": "",
			},
		}
	);

	const updatedUser = await User.findOne({ name: username });

	res.json(updatedUser.interested);
});

const addIntrestedRate = async (
	username: string,
	movieId: number,
	rate: number
) => {
	await User.findOneAndUpdate(
		{ name: username },
		{
			$push: {
				interested: {
					id: movieId,
					rating: rate,
					comment: "",
				},
			},
		}
	);
};

app.post("/api/interested/rate/:movieId", verifyUser, async (req, res) => {
	const movieId = parseInt(req.params.movieId);
	const username = req.body.username;
	const rate = parseInt(req.body.rate);

	const checkInterested = await User.findOne({
		name: username,
		"interested.id": movieId,
	});

	console.log(checkInterested);

	if (!checkInterested) {
		await addIntrestedRate(username, movieId, rate);
	} else {
		await User.findOneAndUpdate(
			{ name: username, "interested.id": movieId },
			{
				$set: {
					"interested.$.rating": rate,
				},
			}
		);
	}

	const updatedUser = await User.findOne({ name: username });

	res.json(updatedUser.interested);
});

app.get("/api/search/:title", async (req, res) => {
	const param = req.params.title;

	const moviesJSON = movieAPI && (await searchMovies(param, movieAPI));

	res.send(moviesJSON);
});

app.get("/api/movies/:id", async (req, res) => {
	const param = req.params.id;

	const movieJSON = movieAPI && (await getMovie(param, movieAPI));

	res.send(movieJSON);
});

app.get("/api/genres/", async (req, res) => {
	const categorieJSON = movieAPI && (await getAllGenres(movieAPI));

	res.send(categorieJSON);
});
