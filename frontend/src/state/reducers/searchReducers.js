const initialState = [];

const searchReducer = (state = initialState, action) => {
	switch (action.type) {
		case "initialState":
			return action.payload.state;

		default:
			return state;
	}
};

export default searchReducer;
