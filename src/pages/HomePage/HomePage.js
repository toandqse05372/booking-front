import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Container, Row, Col } from 'react-bootstrap'
import Search from '../Search/Search';
class HomePage extends Component {
    render() {
        const { t } = this.props;
        return (
            <Container >
                {/* <Row>
                    <Col>{t('HomePage.CHANGE_HOMEPAGE')}</Col>
                    <Col><Header /></Col>
                </Row>
                <Row>
                    <Col><Body /></Col>
                </Row> */}
                <Row>
                    <Col md={4}><Search /></Col>
                </Row>
            </Container>
        );
    }
}

// export default HomePage;
export default withTranslation()(HomePage);
