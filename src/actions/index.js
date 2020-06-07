import * as types from './../constants/actionTypes';
import callApi from './../utils/apiCaller';
import axios from 'axios';



export const actFetchlistAllParkRequest = () => {
    return (dispatch) => {
        return callApi('parks', 'GET', null).then(res => {
            // console.log(res.data);
            dispatch(actFetchlistAllPark(res.data))
        });
    };
}

export const actFetchlistAllPark = (a) => {
    return {
        type: types.FETCH_PARK,
        a
    }
}

export const actNameP = (nameP) => {
    return {
        type: types.SEARCH_PARK_BY_NAME,
        nameP
    }
}

export const getParkID = (id) => {
    return {
        type: types.GET_PARK_ID,
        id
    }
}
