import * as types from './../constants/actionTypes';

var inititalState = '';


var myPark = (state = inititalState, action) => {
    switch (action.type) {
        case types.SEARCH_PARK_BY_NAME:
            state = action.nameP;
            return state;
        case types.GET_PARK_ID:
            state = action.id;
            return state;
        default: return state;
    }
}

export default myPark;