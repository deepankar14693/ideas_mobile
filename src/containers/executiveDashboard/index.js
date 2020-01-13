import { Icon, Text, Spinner } from 'native-base';
import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native';
import { Header } from 'react-native-elements';
import ExecutiveDashboard from './executiveDashboard';
import { getExecutiveDashboardData } from '../../actions/executiveDashboardActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { scrPhaseOptions } from '../../common/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SinglePicker from '../../components/common/pickerDialog/singlePicker';

var memoryStore = require('../../common/memoryStore');
const HEIGHT = Dimensions.get('window').height;
const phases = scrPhaseOptions();

class Index extends Component {

  state = {
    projectId: '',
    scrType: phases[0],
    isScrDialogOpen: false
  }

  renderBack() {
    return <Icon name='arrow-back' onPress={() => this.props.navigation.navigate('Login')} />
  }

  

  openScrDialog = () => {
    this.setState({ isScrDialogOpen: true })
  }

  scrTypeChange = (value) => {
    this.setState({ scrType: value, isScrDialogOpen: false });
  }

  renderCenterComponent() {
    return (
      <View style={[styles.rowBlock]}>
        <View style={styles.leftItem}><Text style={[styles.textStyle]}>{'Executive Dashboard'}</Text></View>
        <TouchableOpacity onPress={this.openScrDialog}>
          <View style={[styles.rightItem]}>
            <Text style={{ color: '#566F99', fontSize: 18, fontWeight: '700', paddingRight: 10 }}>{this.state.scrType.label}</Text>
            <Ionicons name="md-arrow-dropdown" style={{ fontSize: HEIGHT * 0.03, fontWeight: '700' }} />
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  renderNavigation() {
    return <Icon name="menu" onPress={() => this.props.navigation.openDrawer()} />
  }

  goToIdea = () => {
    this.props.navigation.navigate('Idea');
  }

  filterExecDashboardDataScrWise = (executiveDashboardData, scrType) => {
    let filteredData = null
    if (executiveDashboardData && (!_.isEmpty(executiveDashboardData)) && scrType) {
      let scrTypes = Object.keys(executiveDashboardData);
      let scr = scrTypes.filter(key => key.includes(scrType))
      filteredData = executiveDashboardData[scr];
    }
    return filteredData;
  }

  render() {
    const execDashboardData = this.filterExecDashboardDataScrWise(this.props.executiveDashboardData, this.state.scrType.value);
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
          {this.state.isScrDialogOpen && phases && phases.length !== 0 &&
            <SinglePicker
              items={phases}
              visible={this.state.isScrDialogOpen}
              selectedItem={this.state.scrType}
              onCancel={() => this.setState({ isScrDialogOpen: false })}
              onOk={this.scrTypeChange}
            />
          }
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 8 }}>
            {
              this.props.isLoading && !execDashboardData && _.isEmpty(execDashboardData) && <Spinner color='#263d88' />
            }
            {
              execDashboardData && (!_.isEmpty(execDashboardData)) && <ExecutiveDashboard executiveDashboardData={execDashboardData} scrType={this.state.scrType} />
            }
          </View>
        </View>
      </>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    executiveDashboardData: state.executiveDashboardData.executiveData,
    isLoading: state.executiveDashboardData.isLoading,
    organizationMasterData: state.organizationMasterData
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getExecutiveDashboardData }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);

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
  },
  rightItem: {
    flexDirection: 'row',
    textAlign: "right",
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})
