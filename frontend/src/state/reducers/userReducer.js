const initialState = false;

export const loginOpenReducer = (state = initialState, action) => {
	switch (action.type) {
		case "LoginOpen":
			return action.isOpen;

		default:
			return state;
	}
};

export const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case "setUser":
			return action.user;

		default:
			return state;
	}
};
