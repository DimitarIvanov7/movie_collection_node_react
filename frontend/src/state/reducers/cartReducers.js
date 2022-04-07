const initialState = [];

const objectPresent = (state, action) => {
	const isObjectPresent = state.find(
		(obj) => obj.spec._id === action.payload.spec._id
	);

	if (!isObjectPresent) {
		return [...state, action.payload];
	} else {
		return state.map((item) => {
			if (item.spec._id === action.payload.spec._id)
				item.quantity += action.payload.quantity;
			return item;
		});
	}
};

const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case "add":
			return objectPresent(state, action);

		case "remove":
			return state.filter((item) => item.spec._id !== action.payload.id);

		case "removeMultiple":
			return state.filter(
				(item) => !action.payload.ids.includes(item.spec._id)
			);

		case "removeAll":
			return [];

		case "addQuantity":
			// return;
			return state.map((item) => {
				if (item.spec._id === action.payload.id) item.quantity += 1;
				return item;
			});

		case "removeQuantity":
			// eslint-disable-next-line no-case-declarations
			const mapData = state.map((item) => {
				if (item.spec._id === action.payload.id) item.quantity -= 1;
				return item;
			});

			return mapData.filter((item) => item.quantity !== 0);

		default:
			return state;
	}
};

export default cartReducer;
