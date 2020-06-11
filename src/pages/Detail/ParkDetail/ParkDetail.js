import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Container, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux';
import axios from 'axios';




class ParkDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            parkByID: ({

            }),
        }
    }

    receivedData() {
        const { parkID } = this.props;
        axios.get(`http://localhost:8090/park/${parkID}`, {
            params: {
                //park id
                id: parkID,
            }
        }).then(res => {
            //set state
            console.log(res.data)
            this.setState({
                parkByID: res.data
            })
        }).catch(function (error) {
            console.log(error.response);
        });
    }

    componentWillMount() {
        this.receivedData();
    }

    render() {
        const { parkID } = this.props;
        const { parkByID } = this.state;

        return (
            <div>
                stateID: {parkID}<br></br>
                componentID: {parkByID.id}<br></br>
                    address: {parkByID.address}<br></br>
                    description: {parkByID.description}<br></br>
                    mail: {parkByID.mail}<br></br>
                    name: {parkByID.name}<br></br>
                    open_hours: {parkByID.open_hours}<br></br>
                    park_image: {parkByID.park_image}<br></br>
                    phoneNumber: {parkByID.phoneNumber}<br></br>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        parkID: state.Park,
    }
};

// export default ParkDetail;
export default connect(mapStateToProps, null)(ParkDetail);
