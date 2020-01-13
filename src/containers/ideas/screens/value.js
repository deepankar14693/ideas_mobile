import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native';
import { Text, Badge } from 'native-base';
import DropdownButton from '../../../components/common/inputs/dropdownButton';
import LineItemBox from '../screenComponents/lineItemBox';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
//import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ButtonWithIcon from '../../../components/UI/CustomButtons/ButtonWithIcon';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default class Value extends Component {
  render() {
    return (
      <>
        <SafeAreaView style={{ flex: 0, backgroundColor: '#1b3f77' }} />
        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.scrollContainerStyle}
            showsVerticalScrollIndicator={false}
          >
            <View style={[styles.roughBoxStyle, { height: HEIGHT * 0.22 }]}>
              <View style={styles.titleWithBadge}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontSize: HEIGHT * 0.023, color: "#566f99", fontWeight: "bold" }}>Does this idea have a Rough Value?</Text>
                  <Badge style={[styles.badgeStyle, { alignSelf: 'center', height: HEIGHT * 0.02, backgroundColor: 'rgba(38,61,135,1)', width: WIDTH * 0.1, left: WIDTH * 0.02 }]}><Text style={[styles.badgeTextStyle, { color: 'white' }]}>Yes</Text></Badge>

                </View>

              </View>

              <View style={{ flexDirection: 'row', top: HEIGHT * 0.02 }}>
                <View style={{ flex: 0.28 }}>
                  <Text style={{ color: "#566f99", fontSize: HEIGHT * 0.02 }}>Rough Value</Text>
                  <View style={[styles.dollarBox, { borderColor: '#566f99', width: WIDTH * 0.2, borderWidth: 0.5 }]}>
                    <Text style={{ alignSelf: 'flex-end', right: 5, color: "rgba(85,111,153,1)", fontSize: HEIGHT * 0.02 }}>$543</Text>
                  </View>
                </View>
                <View style={{ flex: 0.28 }}>
                  <Text style={{ color: "#566f99", fontSize: HEIGHT * 0.02 }}>Rough Timing</Text>
                  <DropdownButton
                    // onPress={this.openGroupDialog}
                    dropdownStyle={[styles.dropdownView, { borderRadius: 3, height: HEIGHT * 0.045, width: WIDTH * 0.2, padding: 5, justifyContent: 'space-between', }]}
                    dropdownTextStyle={{ fontSize: HEIGHT * 0.02, color: "rgba(85,111,153,1)", fontStyle: 'italic' }}
                    dropdownText='Select'
                    dropdownIconStyle={{ fontSize: HEIGHT * 0.02, fontWeight: 'bold' }}
                  />
                </View>
                <View style={{ flex: 0.33 }}>
                  <Text style={{ color: "#566f99", fontSize: HEIGHT * 0.02 }}>Expected Impacts</Text>
                  <TouchableOpacity onPress={() => { }} disabled={true}>
                    <View style={[styles.dollarBox, { backgroundColor: 'rgba(237,238,239,1)', borderColor: '#566f99', width: WIDTH * 0.2, borderWidth: 0.5, }]}>
                      <Text style={{ color: "rgba(85,111,153,1)", fontSize: HEIGHT * 0.02 }}>Change</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{ flexDirection: 'row', top: HEIGHT * 0.03, flexWrap: 'wrap' }}>
                <LineItemBox title={'Executive(PE)'} />
                <LineItemBox title={'Assistant(PE)'} additionalStyle={{ left: WIDTH * 0.02 }} />
                <LineItemBox title={'Operations Analyst (PE)'} additionalStyle={{ left: WIDTH * 0.04 }} />
                <LineItemBox title={'Facility Allocation (NPE)'} />
                <LineItemBox title={'Other Employee Expenses (PE)'} additionalStyle={{ left: WIDTH * 0.02, top: HEIGHT * 0.02 }} />
              </View>
            </View>

            <View style={[styles.roughBoxStyle, { height: HEIGHT * 0.35, top: HEIGHT * 0.02 }]}>
              <View style={styles.titleWithBadge}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontSize: HEIGHT * 0.023, color: "#566f99", fontWeight: "bold" }}>Current Detailed Value</Text>
                  <Badge style={[styles.badgeStyle, { alignSelf: 'center', height: HEIGHT * 0.022, backgroundColor: "#f7f7f7", width: WIDTH * 0.15, left: WIDTH * 0.02, borderColor: '#566f99', borderWidth: 0.5 }]}><Text style={[styles.badgeTextStyle, { color: '#566f99' }]}>$3,179</Text></Badge>
                </View>
              </View>

              <View style={[styles.titleWithBadge, { top: HEIGHT * 0.002 }]}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontSize: HEIGHT * 0.023, color: "#566f99", fontWeight: "bold" }}>Rough Value</Text>
                  <Badge style={[styles.badgeStyle, { alignSelf: 'center', height: HEIGHT * 0.022, backgroundColor: "#f7f7f7", width: WIDTH * 0.1, left: WIDTH * 0.02, borderColor: '#566f99', borderWidth: 0.5 }]}><Text style={[styles.badgeTextStyle, { color: '#566f99' }]}>$300</Text></Badge>
                </View>
              </View>

              <View style={{ top: HEIGHT * 0.02 }}>
                <Text style={{ fontSize: HEIGHT * 0.023, color: "#566f99", fontWeight: "bold" }}>Should the current Detailed Value be used for reporting the idea's Value?</Text>
              </View>

              <View style={{ flexDirection: 'row', top: HEIGHT * 0.04, alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ height: HEIGHT * 0.15, width: WIDTH * 0.37, left: WIDTH * 0.05, borderWidth: 1, borderColor: '#566f99', borderRadius: 3, alignItems: 'center', justifyContent: 'space-around', padding: 5 }}>
                  <MaterialCommunityIconsIcon name='checkbox-blank-circle' style={{ color: 'gray', fontSize: HEIGHT * 0.04, right: WIDTH * 0.02 }} />
                  <Text style={{ fontSize: HEIGHT * 0.023, color: '#566f99', left: WIDTH * 0.02 }}>No, line items must still be created or refined</Text>
                </View>

                <View style={{ height: HEIGHT * 0.15, width: WIDTH * 0.37, right: WIDTH * 0.07, borderWidth: 2, borderColor: 'rgba(131,168,249,1)', borderRadius: 3, backgroundColor: 'rgba(199,219,254,1)', alignItems: 'center', justifyContent: 'space-around', padding: 5 }}>
                  <MaterialCommunityIconsIcon name='check-circle' style={{ color: 'rgba(38,61,135,1)', fontSize: HEIGHT * 0.04, right: WIDTH * 0.02 }} />
                  <Text style={{ fontSize: HEIGHT * 0.023, left: WIDTH * 0.02 }}>Yes, use the current detailed value</Text>
                </View>
              </View>
            </View>

            <View style={styles.valueBox}>
              <View style={{ flex: 0.2, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row' }}>
                  <Badge style={[styles.badgeStyle, { height: HEIGHT * 0.022, backgroundColor: "rgba(237,238,239,1)", width: WIDTH * 0.1, top: HEIGHT * 0.01 }]}><Text style={[styles.badgeTextStyle, { color: '#566f99', fontWeight: 'bold' }]}>2491</Text></Badge>
                  <DropdownButton
                    // onPress={this.openGroupDialog}
                    dropdownStyle={[styles.dropdownView, { borderRadius: 10, height: HEIGHT * 0.038, left: WIDTH * 0.03, width: WIDTH * 0.2, padding: 5, justifyContent: 'space-between', }]}
                    dropdownTextStyle={{ fontSize: HEIGHT * 0.02, color: "rgba(85,111,153,1)", fontWeight: 'bold' }}
                    dropdownText='Savings'
                    dropdownIconStyle={{ fontSize: HEIGHT * 0.02, fontWeight: 'bold' }}
                  />
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <View style={[styles.dollarBox, { backgroundColor: 'rgba(237,238,239,1)', width: WIDTH * 0.15 }]}>
                    <Text style={{ fontSize: HEIGHT * 0.02, color: "rgba(85,111,153,1)", fontWeight: 'bold' }}>$3,125</Text>
                  </View>

                  {/* <TouchableOpacity onPress={() => { }}>
                    <View style={[styles.readAndAddButtonStyle, { left: WIDTH * 0.01 }]}> */}
                      {/* <FontAwesome5 name="pen" style={[styles.readAndAddButtonIconStyle, { color: 'rgba(103,126,164,1)' }]} /> */}
                      <ButtonWithIcon buttonStyle={styles.buttonStyle}
                        textStyle={styles.textButtonStyle}
                        iconName="create" iconStyle={styles.iconStyle}>Add</ButtonWithIcon>
                      {/* <Text style={[styles.readAndAddButtonTextStyle, { color: 'rgba(103,126,164,1)' }]}>Add</Text> */}
                    {/* </View>
                  </TouchableOpacity> */}

                  <MaterialCommunityIconsIcon
                    name="dots-vertical"
                    style={{ color: 'rgba(103,126,164,1)', fontSize: HEIGHT * 0.04, left: WIDTH * 0.01 }}
                  />

                </View>
              </View>
              <View style={{ flex: 0.8, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                <View>
                  <Text style={{ color: "#566f99", fontSize: HEIGHT * 0.02 }}>Functional Title</Text>
                  <DropdownButton
                    // onPress={this.openGroupDialog}
                    dropdownStyle={[styles.dropdownView, { borderRadius: 3, height: HEIGHT * 0.045, width: WIDTH * 0.34, padding: 5 }]}
                    dropdownTextStyle={{ fontSize: HEIGHT * 0.019, color: "rgba(85,111,153,1)" }}
                    dropdownText='Account Executive'
                    dropdownIconStyle={{ fontSize: HEIGHT * 0.02, fontWeight: 'bold', left: WIDTH * 0.01 }}
                  />
                </View>

                <View>
                  <Text style={{ color: "#566f99", fontSize: HEIGHT * 0.02 }}>Comp Range</Text>
                  <DropdownButton
                    // onPress={this.openGroupDialog}
                    dropdownStyle={[styles.dropdownView, { borderRadius: 3, height: HEIGHT * 0.045, width: WIDTH * 0.3, padding: 5 }]}
                    dropdownTextStyle={{ fontSize: HEIGHT * 0.019, color: "rgba(85,111,153,1)" }}
                    dropdownText='2:$220-$280...'
                    dropdownIconStyle={{ fontSize: HEIGHT * 0.02, fontWeight: 'bold', left: WIDTH * 0.01 }}
                  />
                </View>

                <View >
                  <Text style={{ color: "#566f99", fontSize: HEIGHT * 0.02 }}>FTE#</Text>
                  <View style={[styles.dollarBox, { borderColor: '#566f99', width: WIDTH * 0.2, borderWidth: 0.5 }]}>
                    <Text style={{ alignSelf: 'flex-start', left: WIDTH * 0.01, color: "rgba(85,111,153,1)", fontSize: HEIGHT * 0.019 }}>12.5</Text>
                  </View>
                </View>

              </View>
            </View>






          </ScrollView>
        </View>
      </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollContainerStyle: {
    width: WIDTH,
    padding: HEIGHT * 0.022,
    paddingBottom: HEIGHT * 0.4
  },
  roughBoxStyle: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    paddingTop: 5,
    paddingLeft: 10,
    borderRadius: 5,
    borderWidth: 0.2
  },
  titleWithBadge: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  badgeStyle: {
    alignItems: 'center',
  },
  badgeTextStyle: {
    fontSize: HEIGHT * 0.014
  },
  dollarBox: {
    height: HEIGHT * 0.045,
    // backgroundColor: 'rgba(255,255,255,1)',
    justifyContent: 'center',
    alignItems: 'center',
    // borderColor: '#566f99',
    borderRadius: 3
  },
  dropdownView: {
    backgroundColor: 'rgba(255,255,255,1)',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#566f99',
  },
  valueBox: {
    flex: 1,
    height: HEIGHT * 0.2,
    borderWidth: 1,
    top: HEIGHT * 0.04,
    borderTopWidth: 8,
    borderTopColor: 'rgba(131,168,249,1)',
    borderColor: "#e3e8ee",
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowRadius: 5,
    borderRadius: 6,
    shadowOffset: { width: 0, height: 1 },
    elevation: 4,
    padding: 10
  },
  readAndAddButtonStyle: {
    width: WIDTH * 0.18,
    height: HEIGHT * 0.04,
    flexDirection: 'row',
    padding: 5,
    borderWidth: 0.2,
    // justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(223,228,236,1)',
    borderRadius: 3
  },
  readAndAddButtonIconStyle: {
    flex: 0.4,
    fontSize: HEIGHT * 0.023,
    // color: 'rgba(103,126,164,1)',
    fontWeight: 'bold'
  },
  readAndAddButtonTextStyle: {
    flex: 0.6,
    fontSize: HEIGHT * 0.02,
    // color: 'rgba(103,126,164,1)',
    fontWeight: 'bold'
  },
  buttonStyle: {
    width: 70,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 0,
    borderRadius: 4,
    borderColor: "#b0bbd0",
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
})
