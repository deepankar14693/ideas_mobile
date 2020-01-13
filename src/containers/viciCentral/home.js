import React, { PureComponent } from 'react';

class Home extends PureComponent {

    componentDidMount() {
        this.props.navigation.navigate('Login');
    }

    render() {
        return <></>
    }
}

export default Home;
