import { combineReducers } from 'redux';
import todoListReducer from './pages/todoList/reducer';
import todoDetailReducer from './pages/todoDetail/reducer';
import oneGameReducer from './pages/oneGame/reducer';
import userReducer from './pages/user/reducer'

const storeTree = combineReducers({
    todoListReducer,
    todoDetailReducer,
    oneGameReducer,
    userReducer
});

export default storeTree;