export const addItem = (item) => {
	return (dispatch) => {
		dispatch({
			type: "add",
			payload: item,
		});
	};
};

export const removeItem = (id) => {
	return (dispatch) => {
		dispatch({
			type: "remove",
			payload: id,
		});
	};
};

export const removeMultiple = (ids) => {
	return (dispatch) => {
		dispatch({
			type: "removeMultiple",
			payload: ids,
		});
	};
};

export const removeAll = () => {
	return (dispatch) => {
		dispatch({
			type: "removeAll",
		});
	};
};

export const addQuantity = (id) => {
	return (dispatch) => {
		dispatch({
			type: "addQuantity",
			payload: id,
		});
	};
};

export const removeQuantity = (id) => {
	return (dispatch) => {
		dispatch({
			type: "removeQuantity",
			payload: id,
		});
	};
};

export const initialState = (state) => {
	return (dispatch) => {
		dispatch({
			type: "initialState",
			payload: state,
		});
	};
};

export const priceSort = (min, max) => {
	return (dispatch) => {
		dispatch({
			type: "priceSort",
			range: { min, max },
		});
	};
};
