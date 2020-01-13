import { Left, ListItem, Radio, View, Text, Right } from 'native-base';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Overlay } from 'react-native-elements';
import { valueTypeCss } from "../../css/dashboard";

class GroupModal extends Component {

    render() {
        return (
            <Overlay
                isVisible={this.props.modalVisible}
                onBackdropPress={() => this.props.setModalVisible(false)}
            >
                <View style={valueTypeCss.container}>
                    <View style={valueTypeCss.innerContainer}>
                        <ListItem >
                            <Left>
                                <Radio
                                    color={"#f0ad4e"}
                                    selectedColor={"#5cb85c"}
                                    selected={true}
                                />
                            </Left>
                            <Right>
                                <Text>ALl</Text>
                            </Right>
                        </ListItem>
                    </View>
                </View>
            </Overlay>

        );
    }
}

export default GroupModal;