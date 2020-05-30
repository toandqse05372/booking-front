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
            txtCityID: ''
        }
    }
    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        })
    }
    
    onSubmitSearch = (e) => {
            e.preventDefault();
            var { txtParkName, txtCityID } = this.state;
            // var { history } = this.props;
            // callApi('park/searchName', 'GET', {
            //     Name: txtParkName,
            //     // city_id : txtCityID,
            axios.get('http://localhost:8090/park/searchName', {
                params: {
                  name: txtParkName,
                    //page = 1 Temp 
                  page: 1,
                    //limit = 1 Temp 
                    limit: 10,
                }
              }).then(res => {
                console.log(res);
                // history.push("/");
            }).catch(function (error) {
                console.log(error.response);
                // if (error.response) {
                //     // Request made and server responded
                //     console.log(error.response.data);
                //     if (error.response.data.toString() === 'WRONG_USERNAME_PASSWORD') {
                //         alert(t('Error.WRONG_USERNAME_PASSWORD'));
                //     }
                    //   history.push("/");

                // }
            });
    }
    render() {
        const items = Information.map((data, index) => {
            
            return (
                
                <div key={data.name}>
                    <div>
                        <ul>
                            <li>
                                <span >{data.name}</span>
                                <span >{data.age}</span>
                                <span >{data.country}</span>
                                <span >{data.parkname}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            )
        })
        const { txtParkName } = this.state;
        return (
            <Container fluid>
                <Form onSubmit={this.onSubmitSearch} >
                <InputGroup>
                    <FormControl
                        type="text"
                        // placeholder="Search"
                        name="txtParkName"
                        value={txtParkName}
                        // className="mr-sm-2" 
                        onChange = {this.onChange}
                    />
                    </InputGroup>
                    <Button 
                        type="Submit"
                        variant="outline-success">
                        Search
                    </Button>
                </Form>
        {/* { items } */}
            </Container >
        );
    }
}

// export default HomePage;
export default withTranslation()(Search);
