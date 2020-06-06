import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { actFetchlistAllParkRequest, actFetchlistAllPark } from './../../actions/index';
import callApi from './../../utils/apiCaller';
import axios from 'axios';

class ParkListSearched extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchNameState: '',
            searchList: [],
        }
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

    componentDidMount = () => {
        const { searchName } = this.props;
        console.log(searchName);
        this.setState({
            searchNameState: searchName
        }) 
        axios.get('http://localhost:8090/park/searchName', {
            params: {
                name: searchName,
                //page = 1 Temp 
                page: 1,
                //limit = 10 Temp 
                limit: 10,
            }
        }).then(res => {
            console.log(res.data.listResult);
            this.setState({
                searchList: res.data.listResult
            })
        }).catch(function (error) {
            console.log(error.response);
        });
    }

    render() {
        const { searchNameState, searchList } = this.state;
        return (
            <Container >
                <p>Search Name: {searchNameState} </p>
                {this.showSearchList( searchList )}
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        searchName: state.Park,
    }
};



export default connect(mapStateToProps, null)(ParkListSearched);
// export default connect(mapStateToProps, null)(ParkList);
