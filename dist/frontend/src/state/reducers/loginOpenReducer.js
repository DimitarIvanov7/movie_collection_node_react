const initialState = false;
export const loginOpenReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LoginOpen":
            return action.isOpen;
        default:
            return state;
    }
};
//# sourceMappingURL=loginOpenReducer.js.map