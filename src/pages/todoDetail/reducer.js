const initState = {
    info:{}
};

const todoDetailReducer = (state=initState, action) => {
    switch (action.type) {
        case 'DETAIL_DATA':
            return {
                ...state,
                ...action.payload,
                info: action.payload.info
            };
        default: 
            return {
                ...state
            };
    }
}

export default todoDetailReducer;