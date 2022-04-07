var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const searchMovies = (query, key) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${query}`;
    const res = yield fetch(url);
    const resJson = yield res.json();
    return resJson;
});
//# sourceMappingURL=searchMany.js.map