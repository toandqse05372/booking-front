import { combineReducers } from 'redux';
import tasks from './tasks';
import Park from './Park';
import User from './User';
const myReducers = combineReducers({
    tasks,
    Park,
    User
});
export default myReducers;