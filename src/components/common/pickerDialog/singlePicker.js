import _ from 'lodash';
import { Text } from 'native-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { material } from 'react-native-typography';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from './colors';
import MaterialDialog from './materialDialog';

export default class SinglePicker extends Component {
    constructor(props) {
        super(props);

        const { items, selectedItem } = props;

        const rows = items.map(item => Object.assign({}, item, { selected: false }));

        let selectedIndex;
        if (selectedItem != null) {
            selectedIndex = rows.findIndex(item => item.value === selectedItem.value);
            rows[selectedIndex] = Object.assign({}, rows[selectedIndex], {
                selected: true,
            });
        }

        // const dataSource = new FlatList.DataSource({
        //   rowHasChanged: (r1, r2) => r1.value !== r2.value || r1.selected !== r2.selected,
        // }).cloneWithRows(rows);
        const dataSource = _.cloneDeep(rows);

        this.state = { dataSource, rows, selectedIndex };
        this.emptyPress = this.emptyPress.bind(this);
    }

    // TODO: Extract common logic with the constructor
    // Refreshing the dataSource when we refresh any prop (such as visible)
    componentWillReceiveProps(nextProps) {
        const { items, selectedItem } = nextProps;

        const rows = items.map(item => Object.assign({}, item, { selected: false }));

        let selectedIndex;
        if (selectedItem != null) {
            selectedIndex = rows.findIndex(item => item.value === selectedItem.value);
            rows[selectedIndex] = Object.assign({}, rows[selectedIndex], {
                selected: true,
            });
        }

        const dataSource = _.cloneDeep(rows);
        this.setState({ dataSource, rows, selectedIndex });
    }

    emptyPress() {
        //do nothing
    }

    onRowPress(rowID, selectedItem) {
        let rows = [...this.state.rows];
        rows = rows.map(item => Object.assign({}, rows, { selected: false }));

        let selectedIndex;
        if (selectedItem != null) {
            selectedIndex = rows.findIndex(item => item.value === selectedItem.value);
            rows[selectedIndex] = Object.assign({}, rows[selectedIndex], {
                selected: true,
            });
        }

        const dataSource = _.cloneDeep(rows);
        this.setState({ dataSource, rows, selectedIndex: rowID });
        const showActionButtons = this.props.showActionButtons ? this.props.showActionButtons : false;
        if (!showActionButtons) {
            this.props.onOk(selectedItem);
        }
    }

    renderRow = (row, sectionID, rowID) => (
        <TouchableOpacity key={row.item.value} disabled={row.item.isParent} onPress={() => row.item.isParent ? this.emptyPress : this.onRowPress(rowID, row.item)}>
            <View style={styles.rowContainer}>
                {!row.item.isParent &&
                    <View style={styles.iconContainer}>
                        <Icon
                            name={row.item.selected ? 'radio-button-checked' : 'radio-button-unchecked'}
                            color={this.props.colorAccent}
                            size={24}
                        />
                    </View>
                }
                <Text style={row.item.isParent ? material.headline : material.subheading}>{(row.item.label)}</Text>
            </View>
        </TouchableOpacity>
    );

    render() {
        const showActionButtons = this.props.showActionButtons ? this.props.showActionButtons : false;
        return (
            <MaterialDialog
                title={this.props.title}
                titleColor={this.props.titleColor}
                colorAccent={this.props.colorAccent}
                visible={this.props.visible}
                okLabel={this.props.okLabel}
                scrolled={this.props.scrolled}
                showActionButtons={showActionButtons}
                onOk={() =>
                    this.props.onOk({
                        selectedItem: this.state.rows[this.state.selectedIndex],
                    })}
                cancelLabel={this.props.cancelLabel}
                onCancel={() => {
                    this.props.onCancel();
                }}
            >
                <FlatList data={this.state.dataSource} renderItem={this.renderRow} />
            </MaterialDialog>
        );
    }
}

const styles = StyleSheet.create({
    rowContainer: {
        height: 45,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    iconContainer: {
        marginRight: 16,
    },
});

SinglePicker.propTypes = {
    visible: PropTypes.bool.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectedItem: PropTypes.shape({
        value: PropTypes.any.isRequired,
        label: PropTypes.string.isRequired,
    }),
    title: PropTypes.string,
    titleColor: PropTypes.string,
    colorAccent: PropTypes.string,
    onCancel: PropTypes.func.isRequired,
    onOk: PropTypes.func.isRequired,
    cancelLabel: PropTypes.string,
    okLabel: PropTypes.string,
    scrolled: PropTypes.bool,
};

SinglePicker.defaultProps = {
    selectedItem: undefined,
    title: undefined,
    titleColor: undefined,
    colorAccent: colors.androidColorAccent,
    cancelLabel: undefined,
    okLabel: undefined,
    scrolled: false,
};
