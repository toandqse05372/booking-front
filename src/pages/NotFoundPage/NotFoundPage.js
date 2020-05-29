import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

class NotFoundPage extends Component {
    render() {
        const { t } = this.props;
        return (
            <div className="container">
                <h1>not found</h1>
            </div>
        );
    }
}

// export default HomePage;
export default withTranslation()(NotFoundPage);
