import _ from 'lodash';
import { Icon, Text } from 'native-base';
import React, { PureComponent } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Header } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getDashboardCheckList, getMobileDashboard } from '../../actions/dashboardActions';
import { phaseOptions } from '../../common/constants';
import Notifications from '../../components/common/notifications';
import SinglePicker from '../../components/common/pickerDialog/singlePicker';
import Navigator from './navigator';

const HEIGHT = Dimensions.get('window').height;
const phases = phaseOptions();

class Index extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            scrType: phases[0],
            groupId: this.props.screenProps.groupId,
            isScrDialogOpen: false,

            selectedValueType: this.getDefaultSelected('Value'),
            selectedSCRFilters: this.getDefaultSelected('SCRFilter'),
        };

        this.scrTypeChange = this.scrTypeChange.bind(this);
        this._getMobileDashboardData = this._getMobileDashboardData.bind(this);
        this.openScrDialog = this.openScrDialog.bind(this);

        this.onSelectValueItem = this.onSelectValueItem.bind(this);
        this.onSelectSCRFilters = this.onSelectSCRFilters.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        if (props.screenProps.groupId !== state.groupId) {
            return { groupId: props.screenProps.groupId }; // <- this is setState equivalent
        }
        return null;
    }

    getDefaultSelected(type) {
        const scrType = this.props.screenProps && this.props.screenProps.scrType ? this.props.screenProps.scrType.value : 1;
        switch (type) {
            case 'Value':
            case 'Recommendation':
            case 'Decision':
                return { label: 'All', value: '1' };
            case 'SCRFilter':
                return scrType == 2 ?
                    [{ label: 'All', value: 'V_1', section: 'Value' }] :
                    [{ label: 'All', value: 'V_1', section: 'Value' }, { label: 'All', value: 'R_1', section: 'Recommendation' }, { label: 'All', value: 'D_1', section: 'Decision' }]
        }
    }

    onSelectValueItem(selectedItem) {
        this.setState({ selectedValueType: { label: selectedItem.label, value: selectedItem.value } });
        this.otherScrRequest(this.state.groupId, this.state.scrType.value, selectedItem.value);
    }

    getSelectedValues(value, trimString) {
        const trimedValue = _.trimStart(value, trimString);
        return trimedValue;
    }

    getFilterTypes(selectedFilters) {
        const valueType = this.getSelectedValues(selectedFilters[0].value, 'V_');
        const recomType = this.getSelectedValues(selectedFilters[1].value, 'R_');
        const decisionType = this.getSelectedValues(selectedFilters[2].value, 'D_');
        return { valueType: valueType, recomType: recomType, decisionType: decisionType };
    }

    onSelectSCRFilters(selectedItems, e) {
        this.setState({ selectedSCRFilters: selectedItems });
        const filterTypes = this.getFilterTypes(selectedItems);
        this.props.getMobileDashboard(
            this.props.screenProps.groupId, this.state.scrType.value,
            filterTypes.valueType, filterTypes.recomType, filterTypes.decisionType
        );
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.screenProps.groupId !== prevProps.screenProps.groupId) {
            if (prevState.scrType.value === 3) {
                this.scr3Request(this.props.screenProps.groupId, prevState.scrType.value);
            } else {
                this.otherScrRequest(this.props.screenProps.groupId, prevState.scrType.value, prevState.selectedValueType.value);
            }
            this.dashboardCheckListRequest(this.props.screenProps.groupId);
        }

        if (this.state.scrType.value !== prevState.scrType.value) {
            if (this.state.scrType.value === 3) {
                this.scr3Request(prevState.groupId, this.state.scrType.value);
            } else {
                this.otherScrRequest(prevState.groupId, this.state.scrType.value, prevState.selectedValueType.value);
            }
        }
    }

    scrTypeChange(value) {
        this.setState({ scrType: value, isScrDialogOpen: false });
    }

    _getMobileDashboardData = (groupId, scrType, valueType, recomType, decisionType) => {
        this.props.getMobileDashboard(groupId, scrType, valueType, recomType, decisionType);
    }

    otherScrRequest(groupId, scrType, selectedValueType) {
        this._getMobileDashboardData(groupId, scrType, selectedValueType, 0, 0);
    }

    scr3Request(groupId, scrType) {
        const filterTypes = this.getFilterTypes(this.state.selectedSCRFilters);
        this._getMobileDashboardData(groupId, scrType, filterTypes.valueType, filterTypes.recomType, filterTypes.decisionType);
    }

    componentDidMount() {
        if (this.state.groupId) {
            const scrType = this.state.scrType.value;
            if (scrType === 3) {
                this.scr3Request(this.state.groupId, scrType);
            } else {
                this.otherScrRequest(this.state.groupId, scrType, this.state.selectedValueType.value);
            }
            this.dashboardCheckListRequest(this.state.groupId);
        }
    }

    dashboardCheckListRequest(groupId) {
        this.props.getDashboardCheckList(groupId);
    }

    renderBack() {
        return <Icon name='arrow-back' onPress={() => this.props.navigation.navigate('Login')} />
    }

    renderNavigation() {
        return <Icon name="menu" onPress={() => this.props.navigation.openDrawer()} />
    }

    renderCenterComponent() {
        return (
            <View style={[styles.rowBlock]}>
                <View style={[styles.leftItem, { width: "56%" }]}><Text style={[styles.textStyle]}>{'Dashboard'}</Text></View>
                <TouchableOpacity onPress={this.openScrDialog}>
                    <View style={[styles.rightItem,]}>
                        <Text style={{ color: '#566F99', fontSize: 18, fontWeight: '700', paddingRight: 10 }}>{this.state.scrType.label}</Text>
                        <Ionicons name="md-arrow-dropdown" style={{ fontSize: HEIGHT * 0.03, fontWeight: '700' }} />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    openScrDialog = () => {
        this.setState({ isScrDialogOpen: true })
    }

    render() {
        const scrType = this.state.scrType.value;
        const props = {
            ...this.props, scrType: scrType, groupId: this.props.screenProps.groupId,
            isLoading: this.props.isLoading,

            selectedValueType: this.state.selectedValueType,
            onSelectValueItem: this.onSelectValueItem,
            selectedSCRFilters: this.state.selectedSCRFilters,
            onSelectSCRFilters: this.onSelectSCRFilters,
        };
        return (
            <>
                <SafeAreaView style={{ flex: 0, backgroundColor: '#1b3f77' }} />
                <View style={styles.container}>
                    <Notifications />
                    <View style={styles.container}>
                        <Header
                            containerStyle={{
                                backgroundColor: '#c7dbfe',
                                justifyContent: 'space-around',
                                height: 50,
                                paddingTop: 0
                            }}

                            placement="left"
                            leftComponent={this.renderBack()}
                            centerComponent={this.renderCenterComponent()}
                            rightComponent={this.renderNavigation()}
                        />

                        {this.state.isScrDialogOpen && phases && phases.length !== 0 &&
                            <SinglePicker
                                items={phases}
                                visible={this.state.isScrDialogOpen}
                                selectedItem={this.state.scrType}
                                onCancel={() => this.setState({ isScrDialogOpen: false })}
                                onOk={this.scrTypeChange}
                            />
                        }
                        <Navigator screenProps={props} />
                    </View>
                </View>
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 0,
        paddingTop: 0,
    },

    rowBlock: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    rightItem: {
        flexDirection: 'row',
        textAlign: "right",
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    leftItem: {
        textAlign: "left",
        alignItems: "flex-start",
        justifyContent: "space-between",
    },
    textStyle: {
        textAlign: 'left', width: 200, color: '#566F99', fontSize: 18, fontWeight: '700'
    }
})

const mapStateToProps = (state, props) => {
    return {
        isLoading: state.mobileDashboardData.isLoading,
        scrType: state.dashboardFilter.phase,
        filter: state.ideaGroupFilter,
        mobileDashboardData: state.mobileDashboardData,
        dashboardCheckList: state.dashboardCheckList,
        masterData: state.masterData
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getMobileDashboard, getDashboardCheckList }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
