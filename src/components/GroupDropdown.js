import React, { Component } from 'react';
import { Picker, Platform } from 'react-native';

class GroupDropdown extends Component {

  onValueChange = (group) => {
    this.props.onValueChange(group);
  }

  render() {
    let dropdownOptions = this.props.dropdownOptions;
    const isAndroid = Platform.OS === "android";

    return (
      <Picker selectedValue={this.props.selectedGroup}
        style={isAndroid ? styles.pickerAndroid : styles.pickeriOS}
        onValueChange={this.onValueChange}
      >
        {
          dropdownOptions && dropdownOptions.length !== 0 && dropdownOptions.map((group, index) => {
            return (
              <Picker.Item label={group.Name} value={group.GroupId} key={index} style={styles.itemStyle} />
            )
          })
        }
      </Picker>
    )

  }
}

export default GroupDropdown;

const styles = {
  itemStyle: {
    fontSize: 10,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  pickerAndroid: {
    height: 30,
  },
  pickeriOS: {
    height: 30,
    top: -86
  }

}
