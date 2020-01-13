import _ from 'lodash';
import { Text } from 'native-base';
import React from 'react';
import { Dimensions, SafeAreaView, StyleSheet, View } from 'react-native';
import { isEmpty2, translateKey } from '../../../common/utils';
import Dropdown from '../../../components/common/dropdown';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

export default function FocusArea(props) {

  const getFocusAreaNameWithLeaders = (focusAreaId) => {
    let focusAreaLeadersName = [];
    let focusAreaName = '';
    if (focusAreaId) {
      const focusArea = props.screenProps.focusAreas[focusAreaId];
      if (focusArea) {
        focusAreaName = focusArea.Name;
        if (focusArea.FocusAreaLeaders.length > 0) {
          _.map(focusArea.FocusAreaLeaders, (focusAreaLeader) => {
            const leaderName = focusAreaLeader.Name;
            if (!isEmpty2(leaderName)) focusAreaLeadersName.push(leaderName);
          });
        }
      }
    }
    return (focusAreaLeadersName.length > 0 ? (focusAreaName + ' (' + focusAreaLeadersName.join(', ') + ')') : focusAreaName);
  }

  const getAllFocusAreas = (allFocusArea) => {
    var focusAreasWithLeaders = [];
    var focusAreas = Object.assign([], allFocusArea);
    _.map(focusAreas, (focusArea) => {
      var tmpFocusArea = {};
      tmpFocusArea["label"] = getFocusAreaNameWithLeaders(focusArea.FocusAreaId);
      tmpFocusArea["value"] = focusArea.FocusAreaId;
      focusAreasWithLeaders.push(tmpFocusArea);
    });
    return focusAreasWithLeaders;
  }

  const _onFocusAreaChange = (selectedOption, ideaId, ideaGroupId, isPrimary, isCurrentGroup) => {
    debugger
  }

  const rendergroups = (ideaGroups, currentIdeaGroup) => {
    return ideaGroups.map(function (ideaGroup, index) {
      const isCurrentGroup = (ideaGroup.GroupId === currentIdeaGroup.GroupId) ? true : false;
      return (
        <View key={'focusarea_' + ideaGroup.IdeaGroupId + index}
          style={{ flexDirection: "column", alignItems: 'stretch', justifyContent: "flex-start", flex: 1 }}>
          <View>
            <Text style={{ color: "#566f99", fontWeight: "bold" }}>
              {ideaGroup.Name + ": " + ideaGroup.Description}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Dropdown
              //disabled={this.props.isCompany ? true : ((((this.props.isImplementationPhase ? false : this.props.isIdeaReadOnly) || !this.props.permissionFocusArea || !this.props.isCurrentGroup)))}          
              disabled={!isCurrentGroup}
              ddlTitle={'Select a focus area'}
              //keyValue="FocusAreaId" keyText="Name"
              options={getAllFocusAreas(ideaGroup.AllFocusArea)}
              selectedValue={ideaGroup.FocusAreaId ? ideaGroup.FocusAreaId : null}
              row={ideaGroup}
              onDdlChange={() => _onFocusAreaChange} />
          </View>
        </View>
      )
    });

  }

  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: '#1b3f77' }} />
      <View style={styles.container}>
        <View style={{ flex: 0.1 }}>
          <Text style={styles.headingText}>Focus Area Selection</Text>
          <View style={styles.horizontalLine}></View>
        </View>
        <View style={{ flex: 0.3 }}>
          {props.screenProps.filteredGroupData.acceptedGroups && props.screenProps.filteredGroupData.acceptedGroups.length !== 0 &&
            rendergroups(props.screenProps.filteredGroupData.acceptedGroups, props.screenProps.filteredGroupData.currentIdeaGroup)
          }
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  headingText: {
    fontSize: HEIGHT * 0.032,
    color: "rgba(118,138,172,1)",
  },
  horizontalLine: {
    width: WIDTH * 0.92,
    height: HEIGHT * 0.002,
    backgroundColor: 'black',
    top: 2
  }
})
