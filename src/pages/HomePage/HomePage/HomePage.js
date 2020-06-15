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
            UserDetailGot: {
            },
            userLoggedInDetail: {
            }
        }
    }

    componentWillMount() {
        var tokenLogin = JSON.parse(localStorage.getItem('tokenLogin'));
        var userLoggedInDetail = JSON.parse(localStorage.getItem('userLoggedInDetail'));
        this.setState({
            tokenLoginGot: tokenLogin,
            UserDetailGot: this.props.UserDetail,
            userLoggedInDetail: userLoggedInDetail
        })
    }

    render() {
        const { tokenLoginGot, UserDetailGot, userLoggedInDetail } = this.state;
        const { t } = this.props;
        // if (condition) {
                    
        // }
        return (
            <div>
                <p>Welcome from localStorage:  {userLoggedInDetail !== null ? userLoggedInDetail.firstName : "Chua dang nhap kia ban oi"} </p>
                <p>Welcome from store: {UserDetailGot.firstName}</p>
                <Banner />
                {tokenLoginGot}
                
                {/* <Row no-gutters md={12}>
                    <Col> <Search /> </Col>
                </Row> */}
                <Banner />
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
