const initState = {
    images:{}
};

const oneGameReducer = (state=initState, action) => {
    switch (action.type) {
        case 'GET_IMAGES':
            return {
                ...state,
                ...action.payload,
                images: action.payload.images
            };
        default: 
            return {
                ...state
            };
    }
}

export default oneGameReducer;