import mongoose from "mongoose";
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    favourite: [Number],
    interested: [
        {
            id: {
                type: Number,
            },
            rating: {
                type: Number,
            },
            comment: {
                type: String,
            },
        },
    ],
});
const User = mongoose.model("user", userSchema);
export default User;
//# sourceMappingURL=users_mod.js.map