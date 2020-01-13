import React, { Component } from 'react';
import ModalSelector from 'react-native-modal-selector';
import { View } from 'react-native';
import { Text } from 'native-base'
import _ from 'lodash';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class GroupPicker extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.drawer && this.props.groupId && this.props.projectId) {
            const group = _.filter(this.props.dropdownOptions, { 'key': this.props.groupId, 'projectValue': this.props.projectId });
            if (group.length > 0) {
                this.props.onValueChange(group[0]);
            }
            else {
                this.props.onValueChange(this.props.dropdownOptions[1])
            }
        }
    }

    customizeSelectedItemInOtions = (options, groupId) => {
        if (groupId && options && options.length !== 0) {
            for (let i = 0; i < options.length; i++) {
                if (options[i].key === groupId && !options[i].section) {
                    let customElement = <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={[{ textAlign: 'left', left: 20, color: '#5789fa', fontSize: 16 }, options[i].key === options[i].projectValue && { fontWeight: 'bold' }]}>{options[i].label}</Text>
                        <MaterialIcons name='check' style={[{ color: '#5789fa', fontSize: 20 }, options[i].key === options[i].projectValue && { fontWeight: 'bold' }]} />
                    </View>
                    options[i] = { ...options[i], component: customElement }
                }
            }
            return options
        }
    }

    render() {
        const data = this.customizeSelectedItemInOtions(this.props.dropdownOptions, this.props.groupId);
        return (
            <ModalSelector
                data={data}
                accessible={true}
                scrollViewAccessibilityLabel={'Scrollable options'}
                cancelButtonAccessibilityLabel={'Cancel Button'}
                closeOnChange={true}
                cancelText={'Cancel'}
                backdropPressToClose={true}
                optionTextStyle={{ textAlign: 'left', color: '#5789fa', left: 20, fontSize: 16 }}
                sectionTextStyle={{ textAlign: 'left', fontSize: 20 }}
                onChange={(option) => this.props.changeGroup(option)}
                overlayStyle={{ backgroundColor: 'gray' }}
            >
                {this.props.children}
            </ModalSelector>
        )
    }
}
