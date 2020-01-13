import React, { PureComponent } from 'react';
class Logout extends PureComponent {

    componentDidMount() {
        this.props.navigation.navigate('Login', { isLogoutClicked: true });
    }

    render() {
        return <></>
    }
}

export default Logout;
