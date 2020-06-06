import { combineReducers } from 'redux';
import tasks from './tasks';
import Park from './Park';
const myReducers = combineReducers({
    tasks,
    Park
});
export default myReducers;