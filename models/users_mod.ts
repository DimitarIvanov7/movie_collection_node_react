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
	favourite: {
		type: [Schema.Types.Mixed],
		required: false,
	},
});

const User = mongoose.model("user", userSchema);

export default User;
