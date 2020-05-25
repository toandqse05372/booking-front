import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

class HomePage extends Component {
    render() {
        const { t } = this.props;
        return (
            <div className="container">
                <h1>{t('HomePage.CHANGE_HOMEPAGE')}</h1>
            </div>
        );
    }
}

// export default HomePage;
export default withTranslation()(HomePage);
