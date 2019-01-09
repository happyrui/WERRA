const initState = {
    userInfo:{}
};

const userReducer = (state=initState, action) => {
    switch (action.type) {
        case 'USER_INFO':
            return {
                ...state,
                ...action.payload,
                userInfo: action.payload.userInfo
            };
        default: 
            return {
                ...state
            };
    }
}

export default userReducer;