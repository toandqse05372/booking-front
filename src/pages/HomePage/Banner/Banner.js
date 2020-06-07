import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import './style.css'
import { Container } from 'react-bootstrap';
import Search from '../../../components/Search/Search';

class Banner extends Component {
    render() {
        const { t } = this.props;
        return (
                <header className="masthead">
                    <div className="container h-100">
                        <div className="row h-100 align-items-center">
                            <div className="col-12 text-center">
                                <h1 className="font-weight-dark">Đẹp như người yêu cũ của bạn</h1>
                                <p className="lead">Chỗ search nè</p>
                                <Search />
                            </div>
                        </div>
                    </div>
                </header>
        );
    }
}

export default withTranslation()(Banner);



