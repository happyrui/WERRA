import { combineReducers } from 'redux';
import todoListReducer from './pages/todoList/reducer';
import todoDetailReducer from './pages/todoDetail/reducer';

const storeTree = combineReducers({
    todoListReducer,
    todoDetailReducer
});

export default storeTree;