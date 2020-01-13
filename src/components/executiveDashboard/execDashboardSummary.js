import React, { Component } from 'react'
import { View, Dimensions, StyleSheet } from 'react-native'
import { Text } from 'native-base'
import { formatAmount } from '../../common/utils'

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default class execDashboardSummary extends Component {
  render() {
    return (
      <View>
        <View style={styles.heading}>
          <Text style={styles.headingText}> Executive Dashboard - {this.props.scrType.label} </Text>
        </View>
        <View style={styles.summaryOverview}>
          <Text style={[styles.summaryOverviewText, { color: '#4e5561' }]} >Company</Text>
          <View>
            <View style={styles.summaryOverview}>
              <Text style={[styles.summaryOverviewText, { color: '#4e5561' }]} ># Ideas:</Text>
              <Text style={[styles.summaryOverviewText, { color: 'black', fontWeight: 'bold' }]} >{this.props.scrType.value == 2 ? formatAmount(this.props.executiveData.DetailedValue, true, true, false) : formatAmount(this.props.executiveData.IdeaCount, true, true, false)}</Text>
            </View>
            <View style={styles.summaryOverview}>
              <Text style={[styles.summaryOverviewText, { color: '#4e5561' }]} >$ Value: </Text>
              <Text style={[styles.summaryOverviewText, { color: 'black', fontWeight: 'bold' }]}>{this.props.scrType.value == 2 ? formatAmount(this.props.executiveData.RoughValue, true, true, false) : formatAmount(this.props.executiveData.IdeaValue, true, true, false)}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  heading: {
    width: WIDTH * 0.90, borderBottomWidth: 1, borderBottomColor: 'black', paddingBottom: 10
  },
  headingText: {
    color: '#868f92', fontSize: HEIGHT * 0.032, right: WIDTH * 0.01
  },
  summaryOverview: {
    flexDirection: 'row', justifyContent: 'space-between'
  },
  summaryOverviewText: {
    fontSize: HEIGHT * 0.024
  }
})
