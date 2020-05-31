import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Container, Form, FormControl, Button, InputGroup } from 'react-bootstrap'
import Information from './../../info-json';
import callApi from './../../utils/apiCaller'
import axios from 'axios';


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
    }

    // send request to server to get Park information by Name
    onSubmitSearch = (e) => {
        e.preventDefault();
        var { txtParkName, txtCityID, searchList } = this.state;
        // callApi('park/searchName', 'GET', {
        //     Name: txtParkName,
        //     // city_id : txtCityID,
        axios.get('http://localhost:8090/park/searchName', {
            params: {
                name: txtParkName,
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
                                    <span >{data.cityName}</span>
                                    <br></br>
                                    <span >{data.description}</span>
                                    <br></br>
                                    <span >{data.name}</span>
                                    <br></br>
                                    <span >{data.phoneNumber}</span>
                                    <br></br>
                                </li>
                            </ul>
                        </div>
                    </div>
                );
            });
        }
        return result;
    }


    render() {
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

export default withTranslation()(Search);
