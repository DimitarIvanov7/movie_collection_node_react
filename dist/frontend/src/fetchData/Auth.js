var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
export const logoutUser = (accesToken) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch("/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + accesToken,
        },
    });
    const resJSON = yield res.json();
    return resJSON;
});
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
export const addComment = (movieId, accesToken, username, comment) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch(`/interested/comment/${movieId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + accesToken,
        },
        body: JSON.stringify({ username: username, comment: comment }),
    });
    const resJSON = yield res.json();
    return resJSON;
});
export const deleteComment = (movieId, accesToken, username) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch(`/interested/comment/${movieId}`, {
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
export const addRating = (movieId, accesToken, username, rating) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch(`/interested/rate/${movieId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + accesToken,
        },
        body: JSON.stringify({ username: username, rate: rating }),
    });
    const resJSON = yield res.json();
    return resJSON;
});
//# sourceMappingURL=Auth.js.map