// in this file are all the functions for actions that require authentication

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

export const logoutUser = async (accesToken: string) => {
	const res = await fetch("/logout", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			authorization: "Bearer " + accesToken,
		},
	});

	const resJSON = await res.json();

	return resJSON;
};

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

export const addComment = async (
	movieId: number,
	accesToken: string,
	username: string,
	comment: string
) => {
	const res = await fetch(`/interested/comment`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			authorization: "Bearer " + accesToken,
		},
		body: JSON.stringify({
			username: username,
			comment: comment,
			movieId: movieId,
		}),
	});

	const resJSON = await res.json();

	return resJSON;
};

export const deleteComment = async (
	movieId: number,
	accesToken: string,
	username: string
) => {
	const res = await fetch(`/interested/comment/${movieId}`, {
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

export const addRating = async (
	movieId: number,
	accesToken: string,
	username: string,
	rating: number
) => {
	const res = await fetch(`/interested/rate`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			authorization: "Bearer " + accesToken,
		},
		body: JSON.stringify({
			username: username,
			rate: rating,
			movieId: movieId,
		}),
	});

	const resJSON = await res.json();

	return resJSON;
};
