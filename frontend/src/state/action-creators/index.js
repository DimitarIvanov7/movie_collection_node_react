export const setUser = (user) => {
	return (dispatch) => {
		dispatch({
			type: "setUser",
			user: user,
		});
	};
};

export const LoginOpen = (isOpen) => {
	return (dispatch) => {
		dispatch({
			type: "LoginOpen",
			isOpen: isOpen,
		});
	};
};

export const initialState = (state) => {
	return (dispatch) => {
		dispatch({
			type: "initialState",
			state: state,
		});
	};
};
