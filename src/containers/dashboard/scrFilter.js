import React, { PureComponent } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Title, Text, Icon, Button, Left, Right, Body } from 'native-base';
import SinglePicker from '../../components/common/pickerDialog/singlePicker';
import GroupedSinglePicker from '../../components/common/pickerDialog/groupedSinglePicker';
import _ from 'lodash';


const valueTypeOptions = [{ label: 'All', value: '1' }, { label: 'Rough', value: '2' }, { label: 'Detailed', value: '3' }];
const recommendationTypeOptions = [{ label: 'All', value: '1' }, { label: 'Go', value: '2' }, { label: 'No Go', value: '3' }, { label: 'No Recommendation', value: '4' }];
const decisionTypeOptions = [{ label: 'All', value: '1' }, { label: 'Go', value: '2' }, { label: 'No Go', value: '3' }, { label: 'No Decision', value: '4' }];

class SCRFilter extends PureComponent {
    constructor(props) {
        super(props);
        this.state = this.getDefaultState();
        this.onSelectValueItem = this.onSelectValueItem.bind(this);
        this.onSelectSCRFilters = this.onSelectSCRFilters.bind(this);
    }

    getDefaultState() {
        return {
            scrFiltersVisible: false,
            valueTypeVisible: false,
            selectedValueType: this.props.screenProps.selectedValueType,// this.getDefaultSelected('Value'),
            selectedSCRFilters: this.props.screenProps.selectedSCRFilters,
        }
    }

    onSelectValueItem(selectedItem) {
        this.setState({ valueTypeVisible: false });
        this.props.screenProps.onSelectValueItem(selectedItem);
    }

    onSelectSCRFilters(items, e) {
        this.setState({ scrFiltersVisible: false });
        this.props.screenProps.onSelectSCRFilters(items.selectedItems);
    };

    toggleValueTypePicker = (isFilterMode) => e => {
        if (isFilterMode) {
            this.setState({ scrFiltersVisible: !this.state.scrFiltersVisible });
        } else {
            this.setState({ valueTypeVisible: !this.state.valueTypeVisible });
        }
    }

    render() {
        const scrType = this.props.screenProps && this.props.screenProps.scrType ? this.props.screenProps.scrType : 1;
        if (scrType === 1) return <View></View>;

        const isFilterMode = scrType === 3;
        const selectedSCRFilters = this.props.screenProps.selectedSCRFilters;

        const selectedValueType = !isFilterMode ? this.props.screenProps.selectedValueType : _.filter(selectedSCRFilters, { section: 'Value' })[0];
        const selectedRecommendationType = !isFilterMode ? 0 : _.filter(selectedSCRFilters, { section: 'Recommendation' })[0];
        const selectedDecisionType = !isFilterMode ? 0 : _.filter(selectedSCRFilters, { section: 'Decision' })[0];

        let scrFilterOptions = [];
        if (isFilterMode) {
            if (scrType === 2 || scrType === 3) {
                if (scrType === 3) scrFilterOptions.push({ label: 'Value', value: 'V_0', section: 'Value', isParent: true, isFirstItem: true });
                _.map(valueTypeOptions, (option) => {
                    scrFilterOptions.push({ label: option.label, value: 'V_' + option.value, section: 'Value' });
                });
                4
                if (scrType === 3) {
                    scrFilterOptions.push({ label: 'Recommendation', value: 'R_0', section: 'Recommendation', isParent: true });
                    _.map(recommendationTypeOptions, (option) => {
                        scrFilterOptions.push({ label: option.label, value: 'R_' + option.value, section: 'Recommendation' });
                    });
                    scrFilterOptions.push({ label: 'Decision', value: 'D_0', section: 'Decision', isParent: true });
                    _.map(decisionTypeOptions, (option) => {
                        scrFilterOptions.push({ label: option.label, value: 'D_' + option.value, section: 'Decision' });
                    });
                }
            }
        }
        return (
            <View style={styles.filterContainer}>
                <View style={styles.filterContainerLeft}>
                    <View style={styles.viewStyle}><Text>{'Value'}:</Text><Text style={styles.filterFontStyle}>{selectedValueType ? (selectedValueType.label ? selectedValueType.label : '') : 'All'}</Text></View>

                    {scrType === 3 &&
                        <>
                            <View style={styles.viewStyle}><Text>{'Recommendation'}:</Text><Text style={styles.filterFontStyle}>{selectedRecommendationType ? (selectedRecommendationType.label ? selectedRecommendationType.label : '') : 'No Recomm.'}</Text></View>
                            <View style={styles.viewStyle}><Text>{'Decision'}:</Text><Text style={styles.filterFontStyle}>{selectedDecisionType ? (selectedDecisionType.label ? selectedDecisionType.label : '') : 'All'}</Text></View>
                        </>
                    }
                </View>
                <Right>
                    <TouchableOpacity onPress={this.toggleValueTypePicker(isFilterMode)}>
                        <Button transparent>
                            <Icon name='settings' onPress={this.toggleValueTypePicker(isFilterMode)} />
                        </Button>
                    </TouchableOpacity>
                </Right>

                {isFilterMode &&
                    <GroupedSinglePicker
                        title={scrType === 2 ? 'Value' : 'Filter'}
                        items={scrFilterOptions}
                        visible={this.state.scrFiltersVisible}
                        selectedItems={selectedSCRFilters}
                        onCancel={() => this.setState({ scrFiltersVisible: false })}
                        onOk={this.onSelectSCRFilters}
                        showActionButtons={true}
                        scrolled={true}
                    />
                }
                {(scrType === 2 || scrType === 3) &&
                    <View style={{ float: 'left' }}>
                        {!isFilterMode &&
                            <SinglePicker
                                title={'Value'}
                                items={valueTypeOptions}
                                visible={this.state.valueTypeVisible}
                                selectedItem={selectedValueType}
                                onCancel={() => this.setState({ valueTypeVisible: false })}
                                onOk={this.onSelectValueItem}
                            // scrolled={true}
                            //showActionButtons={true}
                            />
                        }
                    </View>
                }
            </View>
        )
    }
}

export default SCRFilter;

const styles = {
    filterContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        borderRadius: 6,
        // backgroundColor: '#b0bcd0',
        border: '1px solid #e3e8ee',
        // textAlign: 'center',
        paddingLeft: "2%",
        paddingright: "2%",
        width: "100%",
        // alignItems: "center",
        // justifyContent: "space-between",
    },

    filterContainerLeft: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        paddingTop: 12,
        paddingBottom: 5,
        width: "85%",

    },
    viewStyle: {
        display: "flex",
        flexDirection: "row",
        // backgroundColor: "#FCFFC6",
        // borderBottomWidth: 2,
        // borderColor: "#b2b8ba",
        marginRight: 7,
    },
    filterFontStyle: {
        color: "#0087D3",
        fontWeight: "bold",
        marginLeft: 3
    }
}
