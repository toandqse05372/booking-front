import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Container, Row, Col } from 'react-bootstrap'
// import Search from '../../Search/Search';
import Banner from '../Banner/Banner';
import './style.css'
import Search from '../../../components/Search/Search';
class HomePage extends Component {
    render() {
        const { t } = this.props;
        return (
            <div>
                <Banner />
                {/* <Row no-gutters md={12}>
                    <Col> <Search /> </Col>
                </Row> */}
            </div>
        );
    }
}

// export default HomePage;
export default withTranslation()(HomePage);
