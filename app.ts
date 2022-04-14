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

import { registerValidation } from "./validation/requestValidation.js";

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

// generate jwt token when user logs in. Token expires in 40 min for security purposes
const generateAccessToken = (user: { name: string }) => {
	return (
		secretAccessKey &&
		sign({ name: user.name }, secretAccessKey, {
			expiresIn: "40m",
		})
	);
};

// create new user endpoint. This function checks if the username and password are valid, using JOI,
// check if username already exists and if not, it creates new user

// user's password is hashed using bycript
app.post("/api/user", async (req, res) => {
	const { error } = registerValidation(req.body);

	if (error) {
		return res.status(400).send(error.details[0].message);
	}
	const username = req.body.name;
	const password = req.body.password;

	const salt = await bcrypt.genSalt();
	const hashedPass = await bcrypt.hash(password, salt);

	const exists = await User.findOne({ name: username });

	if (exists) {
		res.send("User already exists");
		return;
	}

	//creating empty arrays of "favourite" and "interested" for each user. "Interested" are movies that the user rated or commented
	const user = new User({
		name: username,
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
		const accessToken = generateAccessToken(username);
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

// function that verifies the jwt using the secret key. This fucntion is used for every endpoint that requeries authentication
const verifyUser = (req: any, res: any, next: any) => {
	const authHeader = req.headers.authorization;
	if (authHeader) {
		const token = authHeader.split(" ")[1];

		secretAccessKey &&
			verify(token, secretAccessKey, (err: any, user: any) => {
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

// whenever a user adds a movie to their favourites, the movieID is added to the favourite array in mongoDB
app.post("/api/favourite", verifyUser, async (req, res) => {
	const movieId = parseInt(req.body.id);
	const username = req.body.username;

	await User.findOneAndUpdate(
		{ name: username },
		{
			$push: {
				favourite: [movieId],
			},
		}
	);

	const updatedUser = await User.findOne({ name: username });

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

// this function does two things: adding a movie in the "interested" array and adding a comment to this movie
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

app.post("/api/interested/comment", verifyUser, async (req, res) => {
	const movieId = parseInt(req.body.movieId);
	const username = req.body.username;
	const comment = req.body.comment;

	//if the movie id is already in the "interested" array, the new comment is concatenatinated to the previous comments
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
			userInfo.interested.filter(
				(movie: { id: number }) => movie.id === movieId
			)[0].comment;

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

//deleting comments
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

// this function does two things: adding a movie in the "interested" array and adding a rating for this movie
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

app.post("/api/interested/rate", verifyUser, async (req, res) => {
	const movieId = parseInt(req.body.movieId);
	const username = req.body.username;
	const rate = parseInt(req.body.rate);

	//check if the movie is in "interested" array. If yes, the rating is changed
	const checkInterested = await User.findOne({
		name: username,
		"interested.id": movieId,
	});

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

//get array of movies by title
app.get("/api/search/:title", async (req, res) => {
	const param = req.params.title;

	const moviesJSON = movieAPI && (await searchMovies(param, movieAPI));

	res.send(moviesJSON);
});

//get singe movie
app.get("/api/movies/:id", async (req, res) => {
	const param = req.params.id;

	const movieJSON = movieAPI && (await getMovie(param, movieAPI));

	res.send(movieJSON);
});

//get movie genres (is used to sort movies by genre on the "Search" page)
app.get("/api/genres/", async (req, res) => {
	const categorieJSON = movieAPI && (await getAllGenres(movieAPI));

	res.send(categorieJSON);
});
