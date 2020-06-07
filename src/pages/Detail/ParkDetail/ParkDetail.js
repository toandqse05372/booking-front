import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Container, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux';




class ParkDetail extends Component {
    render() {
        const {parkID} = this.props;
        return (
            <div>
                    đì theo: {parkID}
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
