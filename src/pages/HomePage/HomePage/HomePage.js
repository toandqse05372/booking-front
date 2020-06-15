import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Container, Row, Col } from 'react-bootstrap'
// import Search from '../../Search/Search';
import Banner from '../Banner/Banner';
import './style.css'
import Search from '../../../components/Search/Search';
import { connect } from 'react-redux';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tokenLoginGot: '',
        }
    }

    componentWillMount() {
        var tokenLogin = JSON.parse(localStorage.getItem('tokenLogin'));
        this.setState({
            tokenLoginGot: tokenLogin,
        })
    }

    render() {
        const { tokenLoginGot } = this.state;
        // const {UserDetail} = this.props;
        const { t } = this.props;
        return (
            <div>
                {/* <p>Welcome from store: {UserDetail.firstName}</p> */}
                <Banner />
                {tokenLoginGot}
                {/* <Row no-gutters md={12}>
                    <Col> <Search /> </Col>
                </Row> */}
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        UserDetail: state.User,
    }
};

// export default withTranslation()(HomePage);
export default connect(mapStateToProps, null)(withTranslation()(HomePage));
