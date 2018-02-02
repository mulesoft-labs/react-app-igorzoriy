import React from 'react';

import ApplicationsTable from '../ApplicationsTable';
import MuleSoftHero from '../MuleSoftHero';

import styles from './styles.scss';

class MainApp extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { applications: [] };
  }

  componentDidMount() {
    const { userToken } = this.props;

    if (!userToken) {
      return;
    }

    const runtimeManagerAppsUrl = '/armui/api/v1/applications';
    const options = {
      method: 'GET',
      headers: new Headers({
        Authorization: userToken,
        'X-ANYPNT-ORG-ID': '66310c16-bce5-43c4-b978-5945ed2f99c5',
        'X-ANYPNT-ENV-ID': '543dc91ce4b045653c9178a3',
      }),
    };

    fetch(runtimeManagerAppsUrl, options)
      .then(result => result.json())
      .then(result => this.setState({ applications: result.data }))
      .catch(console.error) // eslint-disable-line no-console
    ;
  }

  render() {
    const { applications } = this.state;
    return (
      <div className={styles.mainApp}>
        <MuleSoftHero
          message="Welcome to MuleSoft"
        />
        <div className={styles.content}>
          <ApplicationsTable
            applications={applications}
          />
        </div>
      </div>
    );
  }
}

export default MainApp;
