import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import 'react-native-gesture-handler';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { default as Ideas, default as Tracking } from './src/components/Ideas';
import LoginScreen from './src/components/LoginScreen';
import MenuDrawer from './src/components/MenuDrawer';
import Dashboard from './src/containers/dashboard/index';
import Logout from "./src/containers/viciCentral/logout";
//import i18n from './src/i18n';
import Settings from "./src/containers/settings/index";
import ExecutiveDashboard from './src/containers/executiveDashboard/index';

var memoryStore = require('./src/common/memoryStore');
const WIDTH = Dimensions.get('window').width;

export const AppDrawer = createDrawerNavigator({
  ExecutiveDashboard: ExecutiveDashboard,
  Dashboard: {
    screen: Dashboard
  },
  Ideas: Ideas,
  Planning: Tracking,
  Tracking: Tracking,
  Calendar: Tracking,
  ViciCentralHome: props => props.navigation.navigate('Login'),
  Settings: Settings,
  Logout: Logout
},
  {
    drawerWidth: WIDTH * 0.90,
    drawerPosition: 'right',
    contentComponent: MenuDrawer,
    // initialRouteName: memoryStore.getItem()
  })

export const AppStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      header: null,
      gestureEnabled: false
    }
  },
  Drawer: {
    screen: AppDrawer,
    navigationOptions: (screenProps) => ({
      header: null,
      gestureEnabled: false,
      screenProps: screenProps
    })
  },
  initialRouteName: 'Login'
})


const Container = createAppContainer(AppStack);

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupId: memoryStore.getItem('groupId'),
      selectedGroupName: '',
      projectId: memoryStore.getItem('projectId')
    }
    this.onValueChange = this.onValueChange.bind(this);
  }

  onValueChange(group) {
    this.setState({ groupId: group.key, selectedGroupName: group.label });
    this.setState({ projectId: group.projectValue });
    memoryStore.setItem('groupId', group.key);
    memoryStore.setItem('projectId', group.projectValue);
  }

  onProjectChange = (project) => {
    this.setState({ projectId: project.value });
    memoryStore.setItem('projectId', project.value);
  }

  render() {
    console.disableYellowBox = true;
    const isCompanyView = this.state.groupId !== '' && this.state.groupId === this.state.projectId;
    const props = { ...this.props, groupId: this.state.groupId, selectedGroupName: this.state.selectedGroupName, projectId: this.state.projectId, isCompanyView: isCompanyView, onValueChange: this.onValueChange, onProjectChange: this.onProjectChange };
    return (
      <Container screenProps={props} />
    )
  }
}

export default AppContainer;
