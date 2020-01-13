import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native';
import { Text, Container, Content,Picker, Icon } from 'native-base';

class PickerRisk extends Component {

    constructor(props) {
        super(props);
        this.state = {
          selected: "key1"
        };
      }

    onValueChange(value) {
        this.setState({
          selected: value
        });
      }

  render() {
    return (
     <View>
          <Picker
              mode="dropdown"
              iosHeader="Select your SIM"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: undefined,  height: "100%", }}
              textStyle={{ color: "#5cb85c" }}
             // headerStyle={{fontSize: 12}}
              //headerTitleStyle={{fontSize: 12}}
             // headerBackButtonTextStyle={{fontSize: 12}}
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label="Wallet" value="key0" />
              <Picker.Item label="ATM Card" value="key1" />
              <Picker.Item label="Debit Card" value="key2" />
              <Picker.Item label="Credit Card" value="key3" />
              <Picker.Item label="Net Banking" value="key4" />
            </Picker>
     </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 5
  },
  boxCardStyle: {
    backgroundColor: "gray",
  },
  titleStyle: {
    color: "red",
  },
  badgeStyle: {
    backgroundColor: 'blue',
  },
  badgeTextStyle: {
    color: 'white',
  },



  innerContainer: {
    paddingBottom: 20,
    flex: 1,
    width: "90%",
    borderRadius: 6,
    minHeight: 294,
    borderWidth: 1,
    borderColor: "#e3e8ee",
    backgroundColor: "#fff",
    //box shadow IOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    //box shadow Android
    elevation: 6
    // flexDirection: "column"

  },
  headTxt: {
    fontSize: 20,
    fontWeight: "600",
    color: "#233238",
    textAlign: "center",
    paddingTop: 6,
  },
  numTxt: {
    paddingTop: 20,
    fontSize: 50,
    textAlign: "center",
    color: "#233238",
    fontWeight: '100'
  },
  headTxtSmall: {
    paddingTop: 0,
    paddingBottom: 30,
    fontSize: 16,
    textAlign: "center",
    color: "#233238",
  },
  detailTxtStyle1: {
    //  width: "86%",
    height: 30,
    fontSize: 14,
    textAlign: 'center',
    color: "#233238",

    //   margin: "0 auto",
  },
  detailTxtStyle2: {
    height: 60,
    fontSize: 14,
    textAlign: 'center',
    color: "#233238",
    marginTop: 5,
  },
  linkStyle: {
    height: 20,
    textAlign: 'center',
    color: "#233238",
    marginTop: 5,
  },
  noIdeaIconStyle: {
    fontSize: 70, color: '#07ab59', textAlign: 'center', paddingTop: 10
  }

})

export default PickerRisk;
