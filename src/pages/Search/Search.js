import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Container, Form, FormControl, Button, InputGroup } from 'react-bootstrap'
import Information from './../../info-json';
import callApi from './../../utils/apiCaller'
import axios from 'axios';
import { connect } from 'react-redux';
import { actNameP } from './../../actions/index';


class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            txtParkName: '',
            txtCityID: '',
            searchList: [],
        }
    }

    //when fill on the form all value and name stored
    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        })
        const { txtParkName } = this.state;
        this.props.fetchNamePark(txtParkName);
    }

    // send request to server to get Park information by Name
    onSubmitSearch = (e) => {
        const { searchName, txtParkName } = this.props;
        
        e.preventDefault();
        // const {  txtCityID, searchList } = this.state;
       
        
        axios.get('http://localhost:8090/park/searchName', {
            params: {
                name: searchName,
                //page = 1 Temp 
                page: 1,
                //limit = 10 Temp 
                limit: 10,
            }
        }).then(res => {
            // console.log(res.data.listResult);
            this.setState({
                searchList: res.data.listResult
            })
        }).catch(function (error) {
            console.log(error.response);
        });
    }
    
    // get list by map & return by html tag
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
        // console.log(this.props.myTasks);
        const { txtParkName, searchList } = this.state;
        return (
            <Container fluid>
                <Form onSubmit={this.onSubmitSearch} >
                    <InputGroup>
                        <FormControl
                            type="text"
                            placeholder="Search"
                            name="txtParkName"
                            value={txtParkName}
                            onChange={this.onChange}
                        />
                    </InputGroup>
                    <Button
                        type="Submit"
                        variant="outline-success">
                        Search
                    </Button>
                </Form>
                {this.showSearchList(searchList)}
            </Container >
        );
    }
}

const mapStateToProps = state => {
    return {
        searchName: state.Park,
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchNamePark : (name) => {
            dispatch(actNameP(name))
        }
    }
}

// export default withTranslation()(Search);
export default connect(mapStateToProps, mapDispatchToProps)(Search);
