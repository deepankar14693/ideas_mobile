//import { getDashboardData } from '../actions/dashboardActions';
//import signalr from 'react-native-signalr';
//import { getChachedState } from '../store/ideas2/selectors/ideaGroup';
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
// import { getIdeaGroupDashboardData, getDashboardOtherDataList } from '../actions/dashboardActions';
// import { getPreparedDashboardData } from '../store/dashboard/selectors/dashboardCommon';
import Dashboard from '../containers/dashboard/index';
import { Container, Header, Left, Icon, Content, Body, Title, Right, Subtitle, Spinner } from 'native-base';


class App extends Component {

  constructor(props) {
    super(props);

  }

  render() {

   // console.log(this.props);

    const projectName = this.props.masterData.config['ClientSetting_ProjectName'] ? this.props.masterData.config['ClientSetting_ProjectName'].Value : '';
    const projectSecondaryName = this.props.masterData.config['ClientSetting_ProjectSecondaryName'] ? this.props.masterData.config['ClientSetting_ProjectSecondaryName'].Value : '';


    return (
      <Container>
        <Header>
          <Left>
            <Icon name='arrow-back' style={{ color: 'white' }} onPress={() => this.props.navigation.navigate('Login')} />
          </Left>
          <Body>
            <View style={{ width: 190, padding: 10 }}>
              <Title style={{ color: '#97bcfd', fontWeight: '600' }}>{projectName}</Title>
              <Subtitle style={{ color: '#c7dbfe', textAlign: 'left' }}>{projectSecondaryName}</Subtitle>
            </View>
          </Body>
          <Right>
            <Icon name="menu" style={{ color: 'white' }} onPress={() => this.props.navigation.openDrawer()} />
          </Right>
        </Header>
        <Content>
          {/* <View style={{ flex: 1 }}>
            <IdeaList salaryRange={this.props.masterData.salaryRange} />
          </View> */}
          <View style={styles.container}>
            {this.props.isLoading  &&
              <View style={styles.spinnerStyle}>
                <Spinner color='#263d88' />
              </View>
            }
            {!this.props.isLoading && 
              <Dashboard {...this.props} /* showView={true} */ />}
          </View>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  spinnerStyle:{
     marginTop: "55%"
  }
})

export default App;
