import _ from 'lodash';
import { Text } from 'native-base';
import React from 'react';
import { Dimensions, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { isEmpty2, translateKey } from '../../common/utils';
import Modal from '../../components/common/modal';
import colors from '../../components/common/pickerDialog/colors';
import { dropdownStyle } from '../../css/ideaListViews';
import { tableStyles } from '../../css/proforma';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

export default function Dropdown(props) {
    const [isOpen, _toggleDropdownMenu] = React.useState(false);
    const [selectedValue, _onDdlSelect] = React.useState(!isEmpty2(props.selectedValue) ? props.selectedValue : null);

    const onRowPress = (row, selectedItem) => {
        if (selectedItem !== selectedValue) {
            _onDdlSelect(selectedItem.value);
            toggleDropdownMenu(false);
            if (props.onDdlChange) {
                props.onDdlChange(row, selectedItem);
            }
        }
    }

    const renderRow = (row, sectionID, rowID) => {
        return (
            <TouchableOpacity key={row.item.value} disabled={row.item.isParent}
                onPress={() => onRowPress(props.row, row.item)}>
                <View style={styles.rowContainer}>
                    <View style={styles.iconContainer}>
                        <Icon
                            name={row.item.selected ? 'radio-button-checked' : 'radio-button-unchecked'}
                            color={colors.dropdownOptionRadioColor}
                            size={24}
                        />
                    </View>
                    <Text style={{ color: colors.androidPrimaryTextColor, fontStyle: (row.item.value ? 'normal' : 'italic') }}>
                        {row.item.value ? row.item.label : translateKey('None')}
                    </Text>
                </View>
            </TouchableOpacity>

        )
    };

    const getddlOptions = (ddlOptions) => {
        const data = _.map(ddlOptions, (option) => {
            return { value: option.value, label: option.label, selected: (option.value === selectedValue ? true : false) }
        })
        return data;
    }

    const renderContent = (dataSource) => {
        const ddlOptions = getddlOptions(dataSource)
        return (
            <View style={{ ...tableStyles.container, paddingBottom: 0 }}>
                <FlatList data={ddlOptions} renderItem={renderRow} />
            </View>
        )
    }

    const toggleDropdownMenu = (isOpen) => {
        _toggleDropdownMenu(isOpen)
    }

    const getLabel = (options, selectedValue) => {
        const labelArray = _.filter(options, { 'value': selectedValue });
        if (labelArray.length > 0) {
            return labelArray[0].label;
        } else {
            return null;
        }
    }

    return (
        <>
            {props.disabled &&
                <View style={{ ...dropdownStyle.disabled, marginRight: 0, marginTop: 2, justifyContent: 'space-between' }} >
                    <Text style={{ color: '#566F99', fontSize: 14, textAlign: 'left' }}>
                        {selectedValue ? getLabel(props.options, selectedValue) : ''}
                    </Text>
                    <Ionicons name={isOpen ? "md-arrow-dropup" : "md-arrow-dropdown"}
                        style={{ color: 'rgb(86, 111, 153)', fontSize: HEIGHT * 0.03, marginLeft: -15 }} />
                </View>
            }
            {!props.disabled &&
                <TouchableOpacity onPress={() => toggleDropdownMenu(true)}>
                    <View style={{ ...dropdownStyle.default, marginRight: 0, marginTop: 2, justifyContent: 'space-between' }} >
                        <Text style={{ color: '#566F99', fontSize: 14, textAlign: 'left' }}>
                            {selectedValue ? getLabel(props.options, selectedValue) : 'Select'}
                        </Text>
                        <Ionicons name={isOpen ? "md-arrow-dropup" : "md-arrow-dropdown"}
                            style={{ color: 'rgb(86, 111, 153)', fontSize: HEIGHT * 0.03, marginLeft: -15 }} />
                    </View>
                </TouchableOpacity>
            }
            {isOpen &&
                <Modal title={props.ddlTitle} isOpen={isOpen}
                    setModalVisible={toggleDropdownMenu}
                    content={isOpen ? renderContent(props.options) : ''} />
            }
        </>
    )


}

const styles = StyleSheet.create({
    rowContainer: {
        maxWidth: WIDTH * 0.66,
        paddingBottom: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
    },
    iconContainer: {
        marginRight: 5,
    }
})

