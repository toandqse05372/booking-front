import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { actFetchlistAllParkRequest, actFetchlistAllPark } from './../../actions/index';
import callApi from './../../utils/apiCaller';
class ParkList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchList: {
            },
        }
    }

    componentDidMount(){
        // callApi('parks', 'GET', null).then(res => {
        //     this.props.fetchAllPark(res.data)
        // });
        this.props.fetchAllPark()
    }

    showSearchList = (searchList) => {
        var result = null;
        if (searchList.length > 0) {
            result = searchList.map((data, index) => {
                return (
                    //specifire key for each data
                    <div key={data.id}>
                        <div>
                            <ul>
                                <li>
                                    <span >address: {data.address}</span>
                                    <br></br>
                                    <span >description: {data.description}</span>
                                    <br></br>
                                    <span >mail: {data.mail}</span>
                                    <br></br>
                                    <span >name: {data.name}</span>
                                    <br></br>
                                    <span >open_hours: {data.open_hours}</span>
                                    <br></br>
                                    <span>Closed<br></br>Tuesday: 11:00-21:00<br></br></span>
                                    <span >park_image: {data.park_image}</span>
                                    <br></br>
                                    <span >phoneNumber: {data.phoneNumber}</span>
                                    <br></br>
                                </li>
                            </ul>
                        </div>
                    </div>
                );
            });
        }
        else if (searchList.length === 0) {
            return (
                <p>Not Found</p>
            );
        }
        return result;
    }

    render() {
        const { searchList } = this.props;
        return (
            <Container >
                {this.showSearchList(searchList)}
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        searchList: state.tasks
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchAllPark : () => {
            dispatch(actFetchlistAllParkRequest())
        }
    }
}

// const mapDispatchToProps = (dispatch, props) => {
//     return {
//         fetchAllPark : (park) => {
//             dispatch(actFetchlistAllPark(park))
//         }
//     }
// }

export default connect(mapStateToProps, mapDispatchToProps)(ParkList);
// export default connect(mapStateToProps, null)(ParkList);
