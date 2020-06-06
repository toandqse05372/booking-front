import * as types from './../constants/actionTypes';
import callApi from './../utils/apiCaller';
import axios from 'axios';



export const actFetchlistAllParkRequest = () => {
    return (dispatch) => {
        return callApi('parks', 'GET', null).then(res => {
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

// export const actNamePListAll = (nameP) => {
//     return (dispatch) => {
//         return axios.get('http://localhost:8090/park/searchName', {
//             params: {
//                 name: dispatch(actNameP(nameP)),
//                 page: 1,
//                 limit: 10,
//             }
//         }).then(res => {

//         })
//     };
// }
