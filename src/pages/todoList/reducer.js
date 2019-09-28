const initState = {
    listData: []
};
// reducer是一个纯函数，它接收两个参数，当前的state和action，返回新的state
const todoListReducer = (state=initState, action) => {
    switch (action.type) {
        case 'LIST_DATA':
            return {
                ...state,
                ...action.payload,
                listData: action.payload
            };
        default: 
            return {
                ...state
            };
    }
}
export default todoListReducer;