import React from 'react';
import { withTranslation } from 'react-i18next';
import { Text } from 'native-base';

class Translation extends React.PureComponent {
  render() {
    const { t, tReady } = this.props;
    return (<>
      {(tReady && this.props.params) && <Text>{t(this.props.id, this.props.params)}</Text>}
      {(tReady && !this.props.params) && <Text style={[this.props.styles && this.props.styles]}>{t(this.props.id)}</Text>}

    </>
    )
  }
}

export default withTranslation(['translation'])(Translation);
