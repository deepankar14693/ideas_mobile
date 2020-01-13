import { Text } from 'native-base';
import React from 'react';
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { translateKey } from '../../../common/utils';
import ManageAcceptedGroup from '../screenComponents/manageAcceptedGroup';
import ManageUnacceptedGroup from '../screenComponents/manageUnacceptedGroup';


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function Group(props) {
  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: '#1b3f77' }} />
      <ScrollView
        contentContainerStyle={styles.scrollContainerStyle}
        showsVerticalScrollIndicator={false}
      >
        {/* ASSIGNED GROUPS VIEW START */}
        <View style={styles.groupBlock}>
          <Text style={styles.headingText}>Groups</Text>
          <View style={styles.horizontalLine}></View>
          {props.screenProps.filteredGroupData.acceptedGroups && props.screenProps.filteredGroupData.acceptedGroups.length !== 0 && props.screenProps.filteredGroupData.acceptedGroups.map((groupData, index) => {
            var isCurrentGroup = (groupData.GroupId === props.screenProps.filteredGroupData.currentIdeaGroup.GroupId) ? true : false;
            var groupTagName = '';
            if (isCurrentGroup && props.ideaView !== 'CompanyView') {
              groupTagName = ' (' + translateKey('MyGroup') + ')';
            }
            if (groupData.IsPrimary) {
              groupTagName = groupTagName + ' (' + translateKey('Primary') + ')'
            }
            return (
              <ManageAcceptedGroup
                key={groupData.IdeaGroupId}
                groupData={groupData}
                groupTagName={groupTagName}
              />
            )
          })
          }
        </View>
        {/* ASSIGNED GROUPS VIEW ENDS */}
        <View style={styles.groupBlock}>
          <View style={styles.heading}>
            <Text style={styles.headingText}>Pending Groups</Text>
            <View style={styles.horizontalLine}></View>
          </View>
          {
            props.screenProps.filteredGroupData.unAcceptedGroups && props.screenProps.filteredGroupData.unAcceptedGroups.length !== 0 && props.screenProps.filteredGroupData.unAcceptedGroups.map((groupData, index) => {
              const isCurrentGroup = (groupData.GroupId === props.screenProps.filteredGroupData.currentIdeaGroup.GroupId) ? true : false;
              return (
                <ManageUnacceptedGroup
                  key={groupData.IdeaGroupId}
                  groupData={groupData}
                  isCurrentGroup={isCurrentGroup}
                />
              )
            })
          }
        </View>
        <View style={styles.groupBlock}>
          <View style={styles.heading}>
            <Text style={styles.headingText}>IT Costing</Text>
            <View style={styles.horizontalLine}></View>
            {/* <View>
              <Dropdown ddlTitle={'Select Risk'} options={riskTypes} />
            </View> */}
          </View>
          {/* {props.screenProps.filteredGroupData.itCostingGroups && props.screenProps.filteredGroupData.itCostingGroups.length !== 0 && props.screenProps.filteredGroupData.itCostingGroups.map((group, index) => {
                return (
                  <ColorHeadBox colorStyle="#c7dbfe" key={index}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", margin: 10, marginTop: 8 }}>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={styles.titleStyle}>
                          {group.groupName ? group.groupName + ' ' : ''}{group.groupDescription ? group.groupDescription : ''}
                        </Text>
                        <Text
                          style={{
                            fontSize: 11, color: 'rgba(107,115,127,1)', padding: 5,
                            justifyContent: "center", lineHeight: 12
                          }}>{group.groupName ? Cost : ''}</Text>
                      </View>
                      <View style={{ flexDirection: "row", marginLeft: 5 }}>
                        <ButtonWithIcon buttonStyle={styles.buttonStyle}
                          textStyle={styles.textButtonStyle}
                          iconName="create" iconStyle={styles.iconStyle} >Add</ButtonWithIcon>

                        <MaterialCommunityIconsIcon
                          name="dots-vertical"
                          style={{ color: 'rgba(103,126,164,1)', fontSize: 28 }}
                        />
                      </View>
                    </View>
                    <View style={styles.boxContainer}>
                      <View style={{ flex: 0.38 }}>
                        <Text style={{ color: 'rgba(85,111,153,1)', fontSize: HEIGHT * 0.02, fontWeight: 'bold' }}>Is IT Costing required?</Text>
                      </View>
                      <View style={{ flex: 0.25 }}>
                        <DropdownButton
                          dropdownStyle={styles.dropdownView}
                          dropdownTextStyle={{ color: "rgba(85,111,153,1)", fontSize: HEIGHT * 0.02 }}
                          dropdownText={'Yes'}
                          dropdownIconStyle={{ fontSize: HEIGHT * 0.02, color: 'rgba(85,111,153,1)' }}
                        />
                      </View>
                      <View style={[styles.itDetailedBox, { flex: 0.25 }]}>
                        <Text style={{ fontSize: HEIGHT * 0.02, alignSelf: 'flex-end', right: 5, color: "rgba(85,111,153,1)" }}>{'-$' + group.dollarImpact}</Text>
                      </View>
                    </View>
                    <View style={styles.indicator}>
                      <View style={{ flex: 0.64 }}></View>
                      <View style={[styles.itDetailedDecisionIndicator, { flex: 0.26 }]}>
                        <Text style={styles.decisionText}>IT Detailed</Text>
                        <MaterialCommunityIconsIcon
                          name="dots-horizontal"
                          style={styles.decisionIcon}
                        />
                      </View>
                    </View>
                  </ColorHeadBox>
                )
              })} */}
        </View>
      </ScrollView>

    </>
  )

}

const styles = StyleSheet.create({

  buttonStyle: {
    width: 75,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 0,
    borderRadius: 4,
    borderColor: "#b0bbd0",
    backgroundColor: "lightgrey",
  },

  textButtonStyle: {
    color: "#566f99",
    fontWeight: "bold",
    fontSize: 14
  },

  iconStyle: {
    color: "#566f99",
    fontSize: 18
  },
  titleStyle: {
    color: "#566f99",
    fontWeight: "bold",
  },

  /*   container: {
      flex: 1,
    }, */
  scrollContainerStyle: {
    width: WIDTH,
    alignItems: 'center',
    paddingBottom: 20
  },
  groupBlock: {
    flex: 1,
    paddingTop: 20,
  },
  horizontalLine: {
    width: WIDTH * 0.97,
    height: HEIGHT * 0.002,
    backgroundColor: 'black',
    top: 2
  },
  headingText: {
    fontSize: HEIGHT * 0.032,
    color: "rgba(118,138,172,1)",
  },
  boxContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  mediumBox: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40//HEIGHT * 0.045,
  },
  dollarBox: {

    backgroundColor: 'rgba(255,255,255,1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(223,228,236,1)',
    height: 40//HEIGHT * 0.045,
  },
  indicator: {
    flexDirection: 'row',
    left: WIDTH * 0.05
  },
  decisionIcon: {
    color: "rgba(118,138,172,1)",
    fontSize: HEIGHT * 0.043,
    bottom: HEIGHT * 0.013,
  },
  decisionText: {
    fontSize: HEIGHT * 0.015,
    fontWeight: '400',
    color: "rgba(118,138,172,1)",
  },
  dropdownView: {
    backgroundColor: 'rgba(255,255,255,1)',
    flexDirection: 'row',
    padding: 10,
    height: HEIGHT * 0.045,
    width: WIDTH * 0.2,
    borderWidth: 0.5,
    borderColor: 'gray',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  itDetailedBox: {
    height: HEIGHT * 0.045,
    width: WIDTH * 0.2,
    backgroundColor: 'rgba(255,255,255,1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(223,228,236,1)',
  },
  itDetailedDecisionIndicator: {
    flexDirection: 'row',
    width: WIDTH * 0.2,
  }
})
