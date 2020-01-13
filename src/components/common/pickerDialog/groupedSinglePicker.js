import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity, View, FlatList, Platform } from 'react-native';
import { Text } from 'native-base';
import { material, human } from 'react-native-typography';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialDialog from './materialDialog';
import _ from 'lodash';
import colors from './colors';

export default class GroupedSinglePicker extends Component {
    constructor(props) {
        super(props);

        const { items, selectedItems } = props;
        const rows = buildSelectedRows(items, selectedItems);

        const dataSource = _.cloneDeep(rows);
        //new ListView.DataSource({
        //   rowHasChanged: (r1, r2) => r1.value !== r2.value || r1.selected !== r2.selected,
        // }).cloneWithRows(rows);

        this.state = {
            dataSource,
            rows,
        };
        this.emptyPress = this.emptyPress.bind(this);
    }

    emptyPress() {
        //do nothing
    }

    // Refreshing the dataSource when we refresh any prop (such as visible)
    componentWillReceiveProps(nextProps) {
        const { items, selectedItems } = nextProps;
        const rows = buildSelectedRows(items, selectedItems);
        const dataSource = _.cloneDeep(rows);
        this.setState({ dataSource, rows });
    }

    onRowPress(selectedItem) {
        let rows = [...this.state.rows];

        let selectedIndex;
        if (selectedItem != null) {
            _.map(_.filter(Object.assign({}, rows), { section: selectedItem.section }), (row) => {
                row.selected = false;
            });

            selectedIndex = rows.findIndex(item => item.value === selectedItem.value);
            rows[selectedIndex] = Object.assign({}, rows[selectedIndex], {
                selected: true
            });
        }
        const dataSource = _.cloneDeep(rows);
        this.setState({ dataSource, rows });
    }

    renderRow = (row, sectionID, rowID) => (
        <TouchableOpacity key={row.item.value} disabled={row.item.isParent} onPress={() => row.item.isParent ? this.emptyPress : this.onRowPress(row.item)}>
            <View style={[styles.rowContainer, row.item.isParent ? (row.item.isFirstItem ? styles.groupHeaderFirstRow : styles.groupHeaderRow) : '']}>
                {!row.item.isParent &&
                    <View style={styles.iconContainer}>
                        <Icon
                            name={row.item.selected ? 'radio-button-checked' : 'radio-button-unchecked'}
                            color={this.props.colorAccent}
                            size={24}
                        />
                    </View>
                }
                <Text style={row.item.isParent ? styles.groupHeader : material.subheading}>{(row.item.label)}</Text>
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
                onOk={() =>
                    this.props.onOk({
                        selectedItems: this.state.rows.filter(row => row.selected),
                    })}
                cancelLabel={this.props.cancelLabel}
                onCancel={this.props.onCancel}
                showActionButtons={showActionButtons}
            >
                <FlatList data={this.state.dataSource} renderItem={this.renderRow} />
            </MaterialDialog>
        );
    }
}

function buildSelectedRows(items, selectedItems) {
    const rows = items.map(item =>
        Object.assign({}, item, {
            selected: selectedItems.some(i => i.value === item.value && !item.isParent),
        }),
    );
    return rows;
}

const styles = StyleSheet.create({
    rowContainer: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    groupHeaderFirstRow: {
        marginTop: 0,
        marginBottom: 10
    },
    groupHeaderRow: {
        marginTop: 20,
        marginBottom: 10
    },
    groupHeader: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    iconContainer: {
        marginRight: 16,
    },
});

GroupedSinglePicker.propTypes = {
    visible: PropTypes.bool.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectedItems: PropTypes.arrayOf(PropTypes.object),
    title: PropTypes.string,
    titleColor: PropTypes.string,
    colorAccent: PropTypes.string,
    onCancel: PropTypes.func.isRequired,
    onOk: PropTypes.func.isRequired,
    cancelLabel: PropTypes.string,
    okLabel: PropTypes.string,
    scrolled: PropTypes.bool,
};

GroupedSinglePicker.defaultProps = {
    selectedItems: [],
    title: undefined,
    titleColor: undefined,
    colorAccent: colors.androidColorAccent,
    cancelLabel: undefined,
    okLabel: undefined,
    scrolled: false,
};
