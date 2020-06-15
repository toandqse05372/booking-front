import { combineReducers } from 'redux';
import tasks from './tasks';
import Park from './Park';
import User from './User';
import cart from './cart';
const myReducers = combineReducers({
    tasks,
    Park,
    User,
    cart
});
export default myReducers;