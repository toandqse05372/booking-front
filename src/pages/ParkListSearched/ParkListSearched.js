import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from 'axios';
import Pagination from "react-js-pagination";
import './lol.css'
import { Link } from "react-router-dom";
import { getParkID } from './../../actions/index';


class ParkListSearched extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchList: [],
            activePage: 1,
            totalPage: 1,
            testList: [],
            count: 0,
            totalItems: 0
        }
    }
    // onGetParkID(id){
    //     this.props.fetchParkIdToStore(id)
    // }

    // fetchParkIdToStore = (id) =>{
    //     this.props.fetchParkID(id)
    // }

    //render list by "searched list"
    showSearchList = (searchList) => {
        var result = null;
        if (searchList.length > 0) {
            result = searchList.map((data, index) => {
                return (
                    //specifire key for each data
                    <div key={data.id}>
                        <Link to="/ParkDetail">

                            <div>
                                <ul>
                                    <button
                                        // onClick={this.onGetParkID(data.id)}
                                    >
                                        <li>
                                            <span >address: {data.address}</span>
                                            <br></br>
                                            <span >id: {data.id}</span>
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
                                    </button>
                                </ul>

                            </div>

                        </Link>
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

    //received data from API
    receivedData(searchName) {
        const { activePage, totalItems } = this.state;
        axios.get('http://localhost:8090/park/searchName', {
            params: {
                //park name
                name: searchName,
                //page Number  
                page: activePage,
                //limit of page
                limit: 2,
            }
        }).then(res => {
            //set state
            this.setState({
                totalPage: res.data.totalPage,
                searchList: res.data.listResult.body,
                totalItems: res.data.totalItems
            })
        }).catch(function (error) {
            console.log(error.response);
        });
    }

    //load all data before render
    componentDidMount = () => {
        const { searchName } = this.props;
        // this.receivedDataWithCounter(searchName);
        this.receivedData(searchName);
    }

    //handle changing when user click in "button change number"
    handlePageChange = (pageNumber) => {
        const { searchName } = this.props;
        this.setState({
            activePage: pageNumber
        }, () => {
            this.receivedData(searchName)
        })
    }

    render() {
        const { activePage, totalItems, searchList } = this.state;
        const { searchName } = this.props;
        return (
            <Container >
                <p>Search Name: {searchName} </p>
                <div>
                    <Pagination
                        //what number is selected
                        activePage={activePage}
                        //the number of items each page
                        itemsCountPerPage={2}
                        //total of items in list
                        totalItemsCount={totalItems}
                        //trigger handle page change
                        onChange={this.handlePageChange.bind(this)}
                    />
                    {this.showSearchList(searchList)}
                </div>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        searchName: state.Park,
    }
};

// const mapDispatchToProps = (dispatch, props) => {
//     return {
//         fetchParkID: (id) => {
//             dispatch(getParkID(id))
//         }
//     }
// }

export default connect(mapStateToProps, null)(ParkListSearched);
