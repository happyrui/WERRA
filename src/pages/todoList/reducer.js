const initState = {
    listData: []
};

const todoListReducer = (state=initState, action) => {
    switch (action.type) {
        case 'LIST_DATA':
            return {
                ...state,
                ...action.payload,
                listData: action.payload.listData
            };
        default: 
            return {
                ...state
            };
    }
}

export default todoListReducer;