import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Container, Form, FormControl, Button, InputGroup } from 'react-bootstrap'
import axios from 'axios';
import { connect } from 'react-redux';
import { actNameP } from './../../actions/index';
import { Link } from 'react-router-dom';

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

    fetchData() {
        const { txtParkName } = this.state;
        this.props.fetchNamePark(txtParkName);
    }

    // send request to server to get Park information by Name
    onSubmitSearch = (e) => {
        // e.preventDefault();
        this.fetchData();
    }


    render() {
        // console.log(this.props.myTasks);
        const { txtParkName } = this.state;
        return (
            <Container fluid>
                {/* <Form onSubmit={this.onSubmitSearch} > */}
                <InputGroup>
                    <FormControl
                        type="text"
                        placeholder="Search"
                        name="txtParkName"
                        value={txtParkName}
                        onChange={this.onChange}
                    />
                </InputGroup>
                <Link to="/listParkSearched">
                    <Button
                        type="submit"
                        variant="outline-success"
                        onClick={this.onSubmitSearch}
                    >
                        Search
                        </Button>
                </Link>
                {/* </Form> */}
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
        fetchNamePark: (name) => {
            dispatch(actNameP(name))
        }
    }
}

// export default withTranslation()(Search);
export default connect(mapStateToProps, mapDispatchToProps)(Search);
