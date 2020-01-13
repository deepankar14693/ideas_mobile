import React, { PureComponent } from 'react';
import { Text } from 'native-base';
import { View } from 'react-native';

class Settings extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ marginLeft: 10, marginRight: 10 }}>
                <Text>Settings</Text>
            </View>
        )
    }
}

export default Settings;