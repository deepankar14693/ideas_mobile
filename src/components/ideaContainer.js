import { Icon, Text } from 'native-base';
import React, { Component } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Header } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getIdeaData, getIdeaDetailData } from '../actions/ideaActions';
import { getCurrentGroupDetails } from '../common/utils';
import { getFilteredIdeaGroups, getPrimaryIdeaGroup } from '../store/ideas/selectors/ideaGroup';
import IdeaCard from './IdeaCard';

class IdeaContainer extends Component {

    renderBack() {
        return <Icon name='arrow-back' onPress={() => this.props.navigation.navigate('Dashboard')} />
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.screenProps.groupId !== prevProps.screenProps.groupId) {
            this.props.getIdeaData(prevProps.screenProps.groupId);
        }
    }

    componentDidMount() {
        if (this.props.screenProps.groupId) {
            this.props.getIdeaData(this.props.screenProps.groupId);
        }
    }

    renderCenterComponent() {
        return (
            <View style={[styles.rowBlock]}>
                <View style={styles.leftItem}><Text style={[styles.textStyle]}>{'Idea List'}</Text></View>
                {/* <View style={[styles.rightItem, { width: "40%" }]}><SCRDropdown scrTypeChange={this.scrTypeChange} scrType={this.state.scrType} /></View> */}
            </View>
        )
    }

    renderNavigation() {
        return <Icon name="menu" onPress={() => this.props.navigation.openDrawer()} />
    }

    goToIdea = (ideaId, ideaGroupId, tabName) => {
        this.props.getIdeaDetailData(ideaId, ideaGroupId, tabName);
        this.props.navigation.navigate('Idea');
    }

    render() {
        const data = this.props.filteredIdeaGroups;
        const ideaView = this.props.screenProps.groupId === '00000000-0000-0000-0000-000000000000' ? 'CompanyView' : 'Ideas';
        const currentGroupDetails = ideaView === 'CompanyView' ? null : getCurrentGroupDetails(this.props.masterDataGroups, this.props.screenProps.groupId);
        return (
            <>
                <SafeAreaView style={{ flex: 0, backgroundColor: '#1b3f77' }} />
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
                        // centerComponent={{ text: 'DASHBOARD', style: { color: '#566F99', fontSize: 18, fontWeight: '700' } }}
                        rightComponent={this.renderNavigation()}
                    />
                    <ScrollView style={{ flex: 1, marginTop: 10, backgroundColor: 'rgba(246,250,254,1)' }}>
                        {data && data.length !== 0 && data.map((item, index) => {
                            if (item.Idea.IdeaNumber === 1344) {
                                const getChacedData = getPrimaryIdeaGroup();
                                const primaryIdeaGroup = currentGroupDetails ? (currentGroupDetails.IsITCosting ? getChacedData(this.props.filteredIdeaGroups, item.IdeaId).chachedState : null) : null;
                                return (
                                    <IdeaCard {...this.props} ideaGroup={item}
                                        key={index}
                                        primaryIdeaGroup={primaryIdeaGroup}
                                        goToIdea={this.goToIdea}
                                        ideaView={ideaView} currentGroupDetails={currentGroupDetails} />
                                )
                            }
                        })}
                    </ScrollView>
                </View>
            </>

        )
    }
}

const mapStateToProps = (state, props) => {
    const getData = getFilteredIdeaGroups();
    return {
        filteredIdeaGroups: getData(state.ideaData.ideaGroups, props.screenProps.groupId, true, state.permissions, false, false, true).filteredIdeaGroups,
        masterDataGroups: state.masterData.groups,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getIdeaData, getIdeaDetailData }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(IdeaContainer);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(246,250,254,1)'
    },
    rowBlock: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
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
