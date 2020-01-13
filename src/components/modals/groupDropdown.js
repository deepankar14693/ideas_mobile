import { Left, ListItem, Radio, Right } from 'native-base';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Overlay } from 'react-native-elements';

class GroupModal extends Component {

    render() {
        return (
            <Overlay
                isVisible={this.props.modalVisible}
                onBackdropPress={() => this.props.setModalVisible(false)}
            >
                <View style={{ marginTop: 22 }}>
                    <ListItem>
                        <Left>
                            <Text>Daily Stand Up</Text>
                        </Left>
                        <Right>
                            <Radio selected={false} />
                        </Right>
                    </ListItem>
                    <ListItem>
                        <Left>
                            <Text>Discussion with Client</Text>
                        </Left>
                        <Right>
                            <Radio selected={true} />
                        </Right>
                    </ListItem>
                </View>
            </Overlay>

        );
    }
}

export default GroupModal;