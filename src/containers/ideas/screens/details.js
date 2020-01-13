import React, { Component } from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet, Dimensions, Switch, TouchableOpacity } from 'react-native';
import { Text } from 'native-base';
import Foundation from 'react-native-vector-icons/Foundation';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import InputWithLabel from '../../../components/common/inputs/inputWithLabel';
import DropdownWithLabel from '../../../components/common/inputs/dropdownWithLabel';
import Documents from '../screenComponents/documents';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      isIdeaActive: true,
    }
  }

  trackIdeaStatus = (value) => {
    this.setState({ isIdeaActive: value })
  }

  changeText = (text) => {
    this.setState({ title: text })
  }

  render() {
    return (
      <>
        <SafeAreaView style={{ flex: 0, backgroundColor: '#1b3f77' }} />
        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.scrollContainerStyle}
            showsVerticalScrollIndicator={false}
          >
            <View>
              <Text style={styles.headingText}>Details</Text>
              <View style={styles.horizontalLine}></View>
            </View>

            <InputWithLabel
              containerStyle={{ flexDirection: 'row', justifyContent: 'space-between', top: HEIGHT * 0.03 }}
              labelViewStyle={{ flex: 0.3 }}
              label={'Title'}
              labelStyle={{ fontSize: HEIGHT * 0.022, color: 'rgba(85,111,153,1)' }}
              inputViewStyle={{ flex: 0.7 }}
              inputStyle={{ height: HEIGHT * 0.057, borderColor: 'gray', borderWidth: 0.5, fontSize: HEIGHT * 0.015, justifyContent: 'center' }}
              value={this.state.title}
              onChangeText={this.changeText}
            />

            <InputWithLabel
              containerStyle={{ flexDirection: 'row', justifyContent: 'space-between', top: HEIGHT * 0.05 }}
              labelViewStyle={{ flex: 0.3 }}
              label={'Description'}
              labelStyle={{ fontSize: HEIGHT * 0.022, color: 'rgba(85,111,153,1)' }}
              inputViewStyle={{ flex: 0.7 }}
              inputStyle={{ height: HEIGHT * 0.15, borderColor: 'gray', borderWidth: 0.5, fontSize: HEIGHT * 0.017, justifyContent: 'flex-start' }}
              value={this.state.title}
              onChangeText={this.changeText}
              multiline={true}
              textAlignVertical='top'
            />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', top: HEIGHT * 0.07 }}>
              <View style={{ flex: 0.3 }}>
                <Text style={{ fontSize: HEIGHT * 0.022, color: 'rgba(85,111,153,1)' }}>Status</Text>
              </View>
              <View style={{ flex: 0.7, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flex: 0.4, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Switch style={{ width: WIDTH * 0.1 }} trackColor={'green', 'green'} value={this.state.isIdeaActive} onValueChange={(val) => this.trackIdeaStatus(val)}></Switch>
                  <Text style={{ fontSize: HEIGHT * 0.018, color: 'rgba(85,111,153,1)', fontWeight: 'bold' }}>Idea is <Text>{this.state.isIdeaActive ? 'active' : 'inactive'}</Text></Text>
                </View>

                <TouchableOpacity onPress={() => { }}>
                  <View style={[styles.readAndAddButtonStyle, { flex: 0.6 }]}>
                    <Text style={[styles.readAndAddButtonTextStyle, { flex: 0.75, color: 'rgba(103,126,164,1)' }]}>Archive</Text>
                    <Foundation name="archive" style={[styles.readAndAddButtonIconStyle, { flex: 0.25, color: 'rgba(103,126,164,1)' }]} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>


            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', top: HEIGHT * 0.09 }}>
              <View style={{ flex: 0.3 }}>
                <Text style={{ fontSize: HEIGHT * 0.022, color: 'rgba(85,111,153,1)' }}>Idea Leader</Text>
              </View>
              <View style={{ flex: 0.7, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flex: 0.4, justifyContent: 'flex-start' }}>
                  <Text style={{ fontSize: HEIGHT * 0.018, color: 'rgba(85,111,153,1)', fontWeight: 'bold' }}>select idea leader</Text>
                </View>

                <TouchableOpacity onPress={() => { }}>
                  <View style={[styles.readAndAddButtonStyle, { flex: 0.6 }]}>
                    <Text style={[styles.readAndAddButtonTextStyle, { color: 'rgba(103,126,164,1)' }]}>Change</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', top: HEIGHT * 0.13 }}>
              <View style={{ flex: 0.9 }}>
                <Text style={{ fontSize: HEIGHT * 0.016, color: 'gray', fontStyle: 'italic' }}>Changed on September 17,2019 12:53PM by John Doe</Text>
              </View>
              <View style={{ flex: 0.1, left: WIDTH * 0.035 }}>
                <EvilIcons name="clock" style={{ fontSize: HEIGHT * 0.035 }} />
              </View>
            </View>


            <InputWithLabel
              containerStyle={{ top: HEIGHT * 0.17 }}
              label={'Current State'}
              labelStyle={{ fontSize: HEIGHT * 0.022, color: 'rgba(85,111,153,1)' }}
              inputStyle={{ height: HEIGHT * 0.057, borderColor: 'gray', borderWidth: 0.5, fontSize: HEIGHT * 0.017, justifyContent: 'flex-start', fontStyle: 'italic' }}
              value={this.state.title}
              onChangeText={this.changeText}
              placeholder="Enter current state details..."
            />

            <InputWithLabel
              containerStyle={{ top: HEIGHT * 0.19 }}
              label={'Recommended Approach'}
              labelStyle={{ fontSize: HEIGHT * 0.022, color: 'rgba(85,111,153,1)' }}
              inputStyle={{ height: HEIGHT * 0.057, borderColor: 'gray', borderWidth: 0.5, fontSize: HEIGHT * 0.017, justifyContent: 'flex-start', fontStyle: 'italic' }}
              value={this.state.title}
              onChangeText={this.changeText}
              placeholder="Enter recommended approach details..."
            />

            <InputWithLabel
              containerStyle={{ top: HEIGHT * 0.21 }}
              label={'Valuation Description'}
              labelStyle={{ fontSize: HEIGHT * 0.022, color: 'rgba(85,111,153,1)' }}
              inputStyle={{ height: HEIGHT * 0.057, borderColor: 'gray', borderWidth: 0.5, fontSize: HEIGHT * 0.017, fontStyle: 'italic' }}
              value={this.state.title}
              onChangeText={this.changeText}
              placeholder="Enter valuation details..."
            />

            <InputWithLabel
              containerStyle={{ top: HEIGHT * 0.23 }}
              label={'Risk Description'}
              labelStyle={{ fontSize: HEIGHT * 0.022, color: 'rgba(85,111,153,1)' }}
              inputStyle={{ height: HEIGHT * 0.057, borderColor: 'gray', borderWidth: 0.5, fontSize: HEIGHT * 0.017, fontStyle: 'italic' }}
              value={this.state.title}
              onChangeText={this.changeText}
              placeholder="Enter risk details..."
            />

            <InputWithLabel
              containerStyle={{ top: HEIGHT * 0.25 }}
              label={'Metrics and Milestones'}
              labelStyle={{ fontSize: HEIGHT * 0.022, color: 'rgba(85,111,153,1)' }}
              inputStyle={{ height: HEIGHT * 0.057, borderColor: 'gray', borderWidth: 0.5, fontSize: HEIGHT * 0.017, fontStyle: 'italic' }}
              value={this.state.title}
              onChangeText={this.changeText}
              placeholder="Enter metrics and milestones details..."
            />

            <View style={{ top: HEIGHT * 0.32 }}>
              <Text style={styles.headingText}>Custom Fields</Text>
              <View style={styles.horizontalLine}></View>
            </View>

            <Text style={{ fontSize: HEIGHT * 0.02, color: 'rgba(85,111,153,1)', fontWeight: 'bold', top: HEIGHT * 0.34 }}>Project-Defined Fields</Text>

            <DropdownWithLabel
              label={'Customer Impact'}
              dropdownText={'Select'}
              containerStyle={[styles.dropdownViews, { top: HEIGHT * 0.35 }]}
              labelViewStyle={styles.dropdownLabel}
              labelStyle={styles.dropdownLabelText}
              dropdownViewStyle={styles.dropdownBox}
              dropdownStyle={styles.dropdownView}
              dropdownTextStyle={styles.dropdownText}
              dropdownIconStyle={styles.dropdownIcon}
            />

            <DropdownWithLabel
              label={'Cross-Group Topics'}
              dropdownText={'Select'}
              containerStyle={[styles.dropdownViews, { top: HEIGHT * 0.37 }]}
              labelViewStyle={styles.dropdownLabel}
              labelStyle={styles.dropdownLabelText}
              dropdownViewStyle={styles.dropdownBox}
              dropdownStyle={styles.dropdownView}
              dropdownTextStyle={styles.dropdownText}
              dropdownIconStyle={styles.dropdownIcon}
            />

            <InputWithLabel
              containerStyle={[styles.dropdownViews, { top: HEIGHT * 0.39 }]}
              labelViewStyle={styles.dropdownLabel}
              label={'Project Defined Plain text Field'}
              labelStyle={styles.dropdownLabelText}
              inputViewStyle={styles.dropdownBox}
              inputStyle={{ height: HEIGHT * 0.057, borderColor: 'gray', borderWidth: 0.5, fontSize: HEIGHT * 0.015, justifyContent: 'center', fontStyle: 'italic' }}
              value={this.state.title}
              onChangeText={this.changeText}
              placeholder="Enter plain text..."
            />

            <InputWithLabel
              containerStyle={[styles.dropdownViews, { top: HEIGHT * 0.41 }]}
              labelViewStyle={styles.dropdownLabel}
              label={'Project Defined Numeric Field'}
              labelStyle={styles.dropdownLabelText}
              inputViewStyle={styles.dropdownBox}
              inputStyle={{ height: HEIGHT * 0.057, borderColor: 'gray', borderWidth: 0.5, fontSize: HEIGHT * 0.015, justifyContent: 'center', fontStyle: 'italic' }}
              value={this.state.title}
              onChangeText={this.changeText}
              placeholder="Enter numeric value..."
              keyboardType='number-pad'
            />

            <DropdownWithLabel
              label={'Multiple Group'}
              dropdownText={'Select'}
              containerStyle={[styles.dropdownViews, { top: HEIGHT * 0.43 }]}
              labelViewStyle={styles.dropdownLabel}
              labelStyle={styles.dropdownLabelText}
              dropdownViewStyle={styles.dropdownBox}
              dropdownStyle={styles.dropdownView}
              dropdownTextStyle={styles.dropdownText}
              dropdownIconStyle={styles.dropdownIcon}
            />

            <Text style={{ fontSize: HEIGHT * 0.02, color: 'rgba(85,111,153,1)', fontWeight: 'bold', top: HEIGHT * 0.47 }}>Group-Defined Fields</Text>

            <DropdownWithLabel
              label={'Idea Source'}
              dropdownText={'Select'}
              containerStyle={[styles.dropdownViews, { top: HEIGHT * 0.49 }]}
              labelViewStyle={styles.dropdownLabel}
              labelStyle={styles.dropdownLabelText}
              dropdownViewStyle={styles.dropdownBox}
              dropdownStyle={styles.dropdownView}
              dropdownTextStyle={styles.dropdownText}
              dropdownIconStyle={styles.dropdownIcon}
            />

            <InputWithLabel
              containerStyle={[styles.dropdownViews, { top: HEIGHT * 0.51 }]}
              labelViewStyle={styles.dropdownLabel}
              label={'Plain text Field'}
              labelStyle={styles.dropdownLabelText}
              inputViewStyle={styles.dropdownBox}
              inputStyle={{ height: HEIGHT * 0.057, borderColor: 'gray', borderWidth: 0.5, fontSize: HEIGHT * 0.015, justifyContent: 'center', fontStyle: 'italic' }}
              value={this.state.title}
              onChangeText={this.changeText}
              placeholder="Enter plain text..."
            />

            <InputWithLabel
              containerStyle={[styles.dropdownViews, { top: HEIGHT * 0.53 }]}
              labelViewStyle={styles.dropdownLabel}
              label={'Numeric Field'}
              labelStyle={styles.dropdownLabelText}
              inputViewStyle={styles.dropdownBox}
              inputStyle={{ height: HEIGHT * 0.057, borderColor: 'gray', borderWidth: 0.5, fontSize: HEIGHT * 0.015, justifyContent: 'center', fontStyle: 'italic' }}
              value={this.state.title}
              onChangeText={this.changeText}
              placeholder="Enter numeric value..."
              keyboardType='number-pad'
            />

            <DropdownWithLabel
              label={'Select Time'}
              dropdownText={'Select'}
              containerStyle={[styles.dropdownViews, { top: HEIGHT * 0.55 }]}
              labelViewStyle={styles.dropdownLabel}
              labelStyle={styles.dropdownLabelText}
              dropdownViewStyle={styles.dropdownBox}
              dropdownStyle={styles.dropdownView}
              dropdownTextStyle={styles.dropdownText}
              dropdownIconStyle={styles.dropdownIcon}
            />

            <DropdownWithLabel
              label={'Select Day'}
              dropdownText={'Select'}
              containerStyle={[styles.dropdownViews, { top: HEIGHT * 0.57 }]}
              labelViewStyle={styles.dropdownLabel}
              labelStyle={styles.dropdownLabelText}
              dropdownViewStyle={styles.dropdownBox}
              dropdownStyle={styles.dropdownView}
              dropdownTextStyle={styles.dropdownText}
              dropdownIconStyle={styles.dropdownIcon}
            />

            <View style={{ top: HEIGHT * 0.61 }}>
              <Text style={styles.headingText}>Attachments</Text>
              <View style={styles.horizontalLine}></View>
            </View>

            <View style={[{ top: HEIGHT * 0.63 }]}>
              <Documents isITCosting={false} />
            </View>

            <View style={[{ top: HEIGHT * 0.65 }]}>
              <Documents isITCosting={true} />
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
    // flex: 1,
    width: WIDTH,
    // alignItems: 'center',
    // justifyContent: 'flex-start',
    padding: HEIGHT * 0.022,
    paddingBottom: HEIGHT * 0.7
  },
  headingText: {
    fontSize: HEIGHT * 0.032,
    color: "rgba(118,138,172,1)",
  },
  horizontalLine: {
    // width: WIDTH * 0.88,
    height: HEIGHT * 0.002,
    backgroundColor: 'black',
  },
  readAndAddButtonStyle: {
    width: WIDTH * 0.2,
    // height: HEIGHT * 0.055,
    flexDirection: 'row',
    padding: HEIGHT * 0.008,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(223,228,236,1)',
    borderRadius: 3
  },
  readAndAddButtonIconStyle: {
    // flex: 0.25,
    fontSize: HEIGHT * 0.035,
    // color: 'rgba(103,126,164,1)',
    fontWeight: 'bold'
  },
  readAndAddButtonTextStyle: {
    // flex: 0.75,
    fontSize: HEIGHT * 0.018,

    // color: 'rgba(103,126,164,1)',
    fontWeight: 'bold'
  },
  dropdownViews: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  dropdownLabel: {
    flex: 0.5
  },
  dropdownView: {
    flexDirection: 'row',
    padding: 6,
    height: HEIGHT * 0.057,
    // width: WIDTH * 0.2,
    borderWidth: 0.5,
    borderColor: 'gray',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  dropdownText: {
    // color: "rgba(85,111,153,1)",
    color: 'gray',
    fontSize: HEIGHT * 0.016,
    fontWeight: '700',
    fontStyle: 'italic'
  },
  dropdownIcon: {
    fontSize: HEIGHT * 0.022,
    color: 'rgba(85,111,153,1)',
  },
  dropdownLabelText: {
    color: 'rgba(118,138,172,1)',
    fontSize: HEIGHT * 0.018,
    fontWeight: 'bold'
  },
  dropdownBox: {
    flex: 0.5
  },
})
