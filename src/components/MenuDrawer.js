import _ from 'lodash';
import { Subtitle, Text, Title } from 'native-base';
import React, { Component } from 'react';
import { Dimensions, ImageBackground, Platform, SafeAreaView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { DrawerNavigatorItems } from 'react-navigation-drawer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getOrganizationMasterData, getTimeStamps } from '../actions/masterDataActions';
import { getExecutiveDashboardData } from '../actions/executiveDashboardActions';
import { getDefaultGroupId, getDefaultProjectId } from '../common/utils2';
import GroupPicker from '../containers/ideas/screenComponents/GroupPicker';
import DropdownButton from './common/inputs/dropdownButton';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Translation from './common/translation';
import i18n from '../i18n';
import Share, { ShareSheet, Button } from 'react-native-share';
import SinglePicker from './common/pickerDialog/singlePicker';
var memoryStore = require('../common/memoryStore');

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

class MenuDrawer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isDialogOpen: false,
      organizationId: memoryStore.getItem('organizationId'),
      visible: false,
      isGmailInstalled: false,
      isWhatsappInstalled: false,
      isGooglePlusInstalled: false,
      isSmsInstalled: false,
      // selectedProject: null,
      isProjectDialogOpen: false,
      projectId: ''
    }
  }

  onCancel() {
    this.setState({ visible: false });
  }
  onOpen() {
    this.setState({ visible: true });
  }

  static getDerivedStateFromProps(props, state) {
    const organizationId = memoryStore.getItem('organizationId');
    if (organizationId !== state.organizationId) {
      return { organizationId: organizationId }; // <- this is setState equivalent
    }
    if (props.organizationMasterData.projects && (!_.isEmpty(props.organizationMasterData.projects))) {
      if (!props.screenProps.projectId) {
        const projectId = getDefaultProjectId(props.organizationMasterData.projects, props.screenProps.projectId);
        props.getExecutiveDashboardData(projectId);
        return { projectId: projectId }
      }
      if (props.screenProps.projectId && (props.screenProps.projectId !== state.projectId)) {
        return { projectId: props.screenProps.projectId }
      }
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.organizationId !== prevState.organizationId) {
      console.log('componentDidUpdate organizationId:', this.state.organizationId);
      this.props.getOrganizationMasterData(this.state.organizationId);
      this.props.getTimeStamps(this.state.organizationId);
    }
    if (this.props.screenProps.projectId !== prevProps.screenProps.projectId) {
      this.props.getExecutiveDashboardData(this.props.screenProps.projectId)
    }
  }


  componentDidMount() {
    const organizationId = memoryStore.getItem('organizationId');
    const isAndroid = Platform.OS == "android";

    if (organizationId) {
      this.props.getOrganizationMasterData(organizationId);
      this.props.getTimeStamps();
    }
    if (isAndroid) {
      Share.isPackageInstalled('com.whatsapp')
        .then(({ isInstalled }) => this.setState({ isWhatsappInstalled: isInstalled }));
      Share.isPackageInstalled('com.google.android.gm')
        .then(({ isInstalled }) => this.setState({ isGmailInstalled: isInstalled }));
      Share.isPackageInstalled('com.google.android.apps.messaging')
        .then(({ isInstalled }) => this.setState({ isSmsInstalled: isInstalled }));
      Share.isPackageInstalled('com.google.android.apps.plus')
        .then(({ isInstalled }) => this.setState({ isGooglePlusInstalled: isInstalled }));
    } else {
      //this.setState({ isWhatsappInstalled: Share.Linking.canOpenURL('com.whatsapp') });
    }

    // if (this.props.organizationMasterData && (!_.isEmpty(this.props.organizationMasterData.projects))) {
    //   const projectId = getDefaultProjectId(this.props.organizationMasterData.projects, this.props.screenProps.projectId);
    //   let projectsArray = this.createProjectArray(this.props.organizationMasterData.projects);
    //   let index = _.findIndex(projectsArray, { value: projectId });
    //   this.setState({ selectedProject: projectsArray[index] });
    // }
  }

  changeGroup = (group) => {
    this.props.screenProps.onValueChange(group);
    this.props.getExecutiveDashboardData(group.projectValue);
    this.setState({ projectId: group.projectValue });
    this.props.navigation.closeDrawer();
  }

  drawerItemIcon = (drawerScene) => {
    const { isFullView } = this.props.navigation.state.params;
    if (isFullView) {
      switch (drawerScene.route.routeName) {
        case 'Dashboard':
          return <Text style={[styles.drawerItems, { color: 'white' }]} >Dashboard</Text>
        case 'ExecutiveDashboard':
          return <Text style={[styles.drawerItems, { color: 'white' }]} >Executive Dashboard</Text>
        case 'Ideas':
          return <Text style={[styles.drawerItems, { color: 'white' }]}>Ideas</Text>
        case 'Planning':
          return <Text style={[styles.drawerItems, { color: 'gray' }]}>Planning</Text>
        case 'Tracking':
          return <Text style={[styles.drawerItems, { color: 'gray' }]}>Tracking</Text>
        case 'Calendar':
          return <View style={{ width: WIDTH * 0.90, borderBottomWidth: 0.7, borderBottomColor: 'white', paddingVertical: 2 }}>
            <Text style={[styles.drawerItems, { color: 'gray' }]}>Calendar</Text>
          </View>
        case 'ShareLink':
          return <View style={{ width: WIDTH * 0.90, borderTopWidth: 0.7, borderTopColor: 'white', paddingVertical: 2 }}>
            <Text style={[styles.drawerItems, { color: 'white' }]}>Share</Text>
          </View>
        case 'ViciCentralHome':
          return <View style={{ width: WIDTH * 0.90, borderTopWidth: 0.7, borderTopColor: 'white', paddingVertical: 2 }}>
            <Text style={[styles.drawerItems, { color: 'white' }]}>Vici Central Home</Text>
          </View>
        case 'Settings':
          return <Text style={[styles.drawerItems, { color: 'white' }]}>Settings</Text>
        case 'Logout':
          return <Text style={[styles.drawerItems, { color: 'white' }]}>Logout</Text>
        default:
          return <Text style={styles.drawerItems}>Dashboard</Text>
      }
    }
    else {
      switch (drawerScene.route.routeName) {
        case 'ExecutiveDashboard':
          return <Text style={[styles.drawerItems, { color: 'white' }]} >Executive Dashboard</Text>
        case 'ViciCentralHome':
          return <View style={{ width: WIDTH * 0.90, paddingVertical: 2 }}>
            <Text style={[styles.drawerItems, { color: 'white' }]}>Vici Central Home</Text>
          </View>
        case 'Logout':
          return <Text style={[styles.drawerItems, { color: 'white' }]}>Logout</Text>
        default:
          return
      }
    }
  }

  openGroupDialog = () => {
    this.setState({ isDialogOpen: true })
  }

  openProjectDialog = () => {
    this.setState({ isProjectDialogOpen: true })
  }

  projectChange = (project) => {
    this.props.screenProps.onProjectChange(project);
    this.props.getExecutiveDashboardData(project.value)
    this.setState({ projectId: project.value })
    this.setState({ isProjectDialogOpen: false })
    this.props.navigation.closeDrawer();
  }

  closeGroupDialog = () => {
    this.setState({ isDialogOpen: false })
  }

  getSelectedGroup = (groupId, groups) => {
    if (groupId && groups && groups.length !== 0) {
      let index = _.findIndex(groups, (group) => group.GroupId === groupId);
      if (index !== -1) {
        return groups[index].Name
      }
      return ''
    }
  }

  getSelectedProject = (projectId, projects) => {
    if (projectId && projects && (!_.isEmpty(projects))) {
      let project = _.find(projects, { ProjectId: projectId });
      return project ? project.Name : '';
    }
  }

  filterGroupsProjectWise = (data) => {
    const { projects, projectPermissions } = data;
    let bindingData = [];

    if (projects && (!_.isEmpty(projects)) && projectPermissions && (!_.isEmpty(projectPermissions)) && projectPermissions.UserGroups && projectPermissions.UserGroups.length !== 0) {
      for (let project in projects) {
        let currentProject = projects[project];
        if (currentProject.Permission === true) {
          const projectGroups = _.filter(projectPermissions.UserGroups, { 'ProjectId': currentProject.ProjectId });
          if (projectGroups.length > 0) {
            const phaseName = currentProject.Name;
            let separatingObject = { key: currentProject.ProjectId + '-project', section: true, label: phaseName };
            bindingData.push(separatingObject);
            _.filter(projectPermissions.UserGroups, (group) => {
              if (group.ProjectId === currentProject.ProjectId) {
                bindingData.push({ label: group.Name, key: group.GroupId, projectName: phaseName, projectValue: group.ProjectId })
              }
            });
            if (currentProject.IsCompanyPermission && projectGroups.length > 1) {
              const companyLabel = currentProject.CompanyPermissionType === 1 ? 'Company' : 'MyGroup';
              bindingData.push({
                label: i18n.t(companyLabel), key: currentProject.ProjectId, projectName: phaseName, projectValue: currentProject.ProjectId,
                component: <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Translation id={companyLabel} styles={{ textAlign: 'left', color: '#5789fa', left: 20, fontSize: 16, fontWeight: 'bold' }} />
                </View>
              })
            }
          }
        }
      }
    }
    return bindingData
  }

  createProjectArray = (projects) => {
    if (projects && (!_.isEmpty(projects))) {
      return _.map(projects, (project) => ({ label: project.Name, value: project.ProjectId }))
    }
  }

  stopNavigation = (scene) => {
    if (!['Planning', 'Tracking', 'Calendar'].includes(scene.route.routeName)) {
      this.props.navigation.navigate(scene.route.routeName)
    }
  }

  render() {
    if (this.props.organizationMasterData.isLoading) {
      return <></>;
    }
    const { isFullView } = this.props.navigation.state.params;
    const organizationMasterData = this.props.organizationMasterData;
    const { projectId } = this.state;

    const projectName = organizationMasterData.config['ClientSetting_ProjectName'] ? organizationMasterData.config['ClientSetting_ProjectName'].Value : '';
    const projectSecondaryName = organizationMasterData.config['ClientSetting_ProjectSecondaryName'] ? organizationMasterData.config['ClientSetting_ProjectSecondaryName'].Value : '';

    // const projectId = getDefaultProjectId(organizationMasterData.projects, this.props.screenProps.projectId);
    const projects = this.createProjectArray(organizationMasterData.projects);
    let selectedProjectIndex = _.findIndex(projects, { value: projectId });

    const userGroups = _.mapKeys(_.map(_.filter(organizationMasterData.projectPermissions.UserGroups, { 'ProjectId': projectId }), 'GroupId'));
    const groupId = getDefaultGroupId(userGroups, projectId, this.props.screenProps.groupId);

    const dropdownOptions = this.filterGroupsProjectWise(organizationMasterData);
    const props = { ...this.props, groupId: groupId };
    const isAndroid = Platform.OS == "android";
    const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.vicicentral.ideas';//For android only
    const appStoreUrl = 'https://apps.apple.com/in/app/vici-project/id1484917544';//For ios only

    let shareOptions = {
      title: 'Share via',
      message: (isAndroid ? 'Click to open app link in play store ' + playStoreUrl : 'Click to open app link in app store ' + appStoreUrl),
      url: 'data:image/png;base64, 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',
    };

    return (
      <>
        <SafeAreaView style={{ flex: 0, backgroundColor: '#1b3f77' }} />
        <View style={styles.container}>
          <ImageBackground source={{ uri: 'https://static.vicicentral.com/images/ViciPattern.png' }} style={styles.imageBackgroundStyle}
            imageStyle={{ resizeMode: 'repeat', overflow: 'hidden', backfaceVisibility: 'visible', transform: [{ scale: isAndroid ? 4 : 1.5 }, { translateY: 4 }, { translateX: isAndroid ? 120 : 50 }] }}>
            <View style={{ flex: 1, left: 40, justifyContent: 'space-evenly' }}>
              <View style={{ paddingTop: 10 }}>
                <Title style={{ color: '#97bcfd', fontWeight: '600', textAlign: 'left' }}>{projectName}</Title>
                <Subtitle style={{ color: '#c7dbfe', textAlign: 'left' }}>{projectSecondaryName}</Subtitle>
              </View>

              {isFullView && dropdownOptions && dropdownOptions.length !== 0 &&
                <GroupPicker dropdownOptions={dropdownOptions} changeGroup={this.changeGroup} groupId={groupId} projectId={projectId} onValueChange={this.props.screenProps.onValueChange} drawer={true}>
                  <DropdownButton
                    // onPress={this.openGroupDialog}
                    dropdownStyle={styles.dropdownView}
                    dropdownTextStyle={{ fontSize: HEIGHT * 0.028, fontWeight: 'bold' }}
                    dropdownText={`${this.getSelectedProject(projectId, organizationMasterData.projects)} / ${props.screenProps.selectedGroupName}`}
                    dropdownIconStyle={{ fontSize: HEIGHT * 0.04, fontWeight: 'bold', top: 0 }}
                  />
                </GroupPicker>
              }

              {!isFullView && projects && projects.length !== 0 &&
                <DropdownButton
                  onPress={this.openProjectDialog}
                  dropdownStyle={styles.dropdownView}
                  dropdownTextStyle={{ fontSize: HEIGHT * 0.028, fontWeight: 'bold' }}
                  dropdownText={projects[selectedProjectIndex].label}
                  dropdownIconStyle={{ fontSize: HEIGHT * 0.04, fontWeight: 'bold', top: 0 }}
                />
              }

              {this.state.isProjectDialogOpen &&
                <SinglePicker
                  items={projects}
                  visible={this.state.isProjectDialogOpen}
                  selectedItem={projects[selectedProjectIndex]}
                  onCancel={() => this.setState({ isProjectDialogOpen: false })}
                  onOk={this.projectChange}
                />
              }

            </View>
          </ImageBackground>
          <View style={styles.bottomContainer}>
            <DrawerNavigatorItems {...props}
              screenProps={props}
              activeBackgroundColor='rgba(37,55,104,1)'
              getLabel={(drawerScene) => this.drawerItemIcon(drawerScene)}
              onItemPress={(scene) => this.stopNavigation(scene)}
            />
            <TouchableOpacity
              //activeOpacity={0.5}
              //style={styles.buttonStyle}
              onPress={this.onOpen.bind(this)}>
              <Text style={[styles.drawerItems, { color: 'white' }]}><Icon name="share-alt" size={30} color="#fff" /></Text>
            </TouchableOpacity>
            <ShareSheet visible={this.state.visible} onCancel={this.onCancel.bind(this)}>
              {this.state.isWhatsappInstalled &&
                <Button iconSrc={{ uri: 'https://img.icons8.com/color/48/000000/whatsapp.png' }}
                  onPress={() => {
                    this.onCancel();
                    setTimeout(() => {
                      Share.shareSingle(Object.assign(shareOptions, {
                        "social": "whatsapp"
                      }));
                    }, 300);
                  }}>Whatsapp</Button>
              }
              {this.state.isGmailInstalled &&
                <Button iconSrc={{ uri: 'https://image.flaticon.com/icons/png/128/281/281769.png' }}
                  onPress={() => {
                    this.onCancel();
                    setTimeout(() => {
                      Share.shareSingle(Object.assign(shareOptions, {
                        "social": "email"
                      }));
                    }, 300);
                  }}>Email</Button>
              }
              {this.state.isSmsInstalled &&
                <Button iconSrc={{ uri: 'https://www.pngkey.com/png/detail/334-3340440_sms-android-messages-app-icon.png' }}
                  onPress={() => {
                    this.onCancel();
                    setTimeout(() => {
                      Share.shareSingle(Object.assign(shareOptions, {
                        "social": "sms"
                      }));
                    }, 300);
                  }}>Message</Button>
              }
              {this.state.isGooglePlusInstalled &&
                <Button iconSrc={{ uri: 'https://icons-for-free.com/iconfiles/png/512/google+plus+google+gplus+plus+icon-1320196802701985206.png' }}
                  onPress={() => {
                    this.onCancel();
                    setTimeout(() => {
                      Share.shareSingle(Object.assign(shareOptions, {
                        "social": "googleplus"
                      }));
                    }, 300);
                  }}>Google +</Button>
              }
            </ShareSheet>
          </View>
        </View>
      </>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    organizationMasterData: state.organizationMasterData,
    masterData: state.masterData,
    permissions: state.permissions
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getOrganizationMasterData, getTimeStamps, getExecutiveDashboardData }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuDrawer);


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackgroundStyle: {
    flex: 0.29,
    overflow: 'hidden',
    backgroundColor: "#183f7a",
  },
  bottomContainer: {
    flex: 0.71,
    backgroundColor: 'rgba(38,61,135,1)',
  },
  dropdownView: {
    backgroundColor: 'white',
    top: 0,
    flexDirection: 'row',
    padding: 7,
    width: '60%',
    justifyContent: 'space-between'
  },
  drawerItems: {
    fontSize: HEIGHT * 0.025,
    fontWeight: 'bold',
    left: 40,
    marginBottom: 10,
    marginTop: 15
  }
});
