import * as types from './../constants/actionTypes';

var inititalState = [{
    address: 'null'
}];


var myNamePark = (state = inititalState, action) => {
    switch (action.type) {
        case types.FETCH_PARK:
            state = action.a
            return [...state];
        default: return [...state];
    }
}

export default myNamePark;