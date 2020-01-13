import React, { Component } from 'react'
import { View, Dimensions, StyleSheet } from 'react-native'
import { Text } from 'native-base'
import { ScrollView } from 'react-native-gesture-handler';
import { formatAmount } from '../../common/utils';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default class ExecutiveDashboardTable extends Component {
  render() {
    return (
      <View style={{ flex: 1, top: HEIGHT * 0.03 }} >
        <View style={{ width: WIDTH * 0.90, borderBottomWidth: 1, borderBottomColor: 'black', paddingBottom: 5 }}>
          <Text style={{ color: '#4e5561', fontSize: HEIGHT * 0.025, right: WIDTH * 0.01, fontWeight: 'bold' }}> GROUPS <Text style={{ color: '#4e5561', fontSize: HEIGHT * 0.015, fontWeight: 'bold' }}>(Rank By $ Value)</Text> </Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <View style={[styles.tabHeader, { width: WIDTH * 0.5 }]}>
              <Text style={styles.tabText}>GROUP</Text>
            </View>
            <View style={[styles.tabHeader, { width: WIDTH * 0.17 }]}>
              <Text style={[styles.tabText, { alignSelf: 'flex-end' }]} ># IDEAS</Text>
            </View>
            <View style={[styles.tabHeader, { width: WIDTH * 0.17 }]}>
              <Text style={[styles.tabText, { alignSelf: 'flex-end' }]}>$ VALUE</Text>
            </View>
          </View>

          <View style={{ height: HEIGHT * 0.6 }}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{}}>
              {this.props.executiveData.Groups && this.props.executiveData.Groups.length !== 0 &&
                this.props.executiveData.Groups.map((item, index) => {
                  return (
                    <View style={styles.tableHeader} key={index}>
                      <View style={[styles.rowTab, { width: WIDTH * 0.5 }]}>
                        <Text style={styles.rowText}>{item.Group}</Text>
                        <Text style={styles.rowText}>{item.GroupLeader}</Text>
                      </View>
                      <View style={[styles.rowTab, { width: WIDTH * 0.17 }]} >
                        <Text style={[styles.rowText, { alignSelf: 'flex-end' }]} >{this.props.scrType.value == 2 ? formatAmount(item.DetailedValue, false, true, false) : (this.props.scrType.value == 4 ? formatAmount(item.Variance, false, true, false) : formatAmount(item.IdeaCount, false, true, false))}</Text>
                      </View>
                      <View style={[styles.rowTab, { width: WIDTH * 0.17 }]} >
                        <Text style={[styles.rowText, { alignSelf: 'flex-end' }]}>{this.props.scrType.value == 2 ? formatAmount(item.RoughValue, false, true, false) : (this.props.scrType.value == 4 ? formatAmount(item.PlanValue, false, true, false) : formatAmount(item.IdeaValue, true, true, false))}</Text>
                      </View>
                    </View>
                  )
                })}
            </ScrollView>
          </View>

        </View>
      </View >

    )
  }
}

const styles = StyleSheet.create({
  table: {
    top: HEIGHT * 0.03
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  tabHeader: {
    borderBottomWidth: 1, borderBottomColor: 'black', paddingBottom: 5
  },
  // tabText: {
  //   color: 'black', fontSize: HEIGHT * 0.015, fontWeight: '500'
  // },
  tabText: {
    color: '#4e5561', fontSize: 15, fontWeight: '700'
  },
  rowTab: {
    borderBottomWidth: 0.3, borderBottomColor: 'black', justifyContent: 'center', padding: 5, paddingLeft: 0
  },
  // rowText: {
  //   color: '#868f92', fontSize: HEIGHT * 0.015, fontWeight: '500'
  // }
  rowText: {
    color: '#4e5561', fontSize: 14, fontWeight: '700'
  }
})
