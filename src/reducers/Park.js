import * as types from './../constants/actionTypes';

var inititalState = 'null';


var myPark = (state = inititalState, action) => {
    switch (action.type) {
        case types.SEARCH_PARK_BY_NAME:
            state = action.nameP
            return state;
        default: return state;
    }
}

export default myPark;