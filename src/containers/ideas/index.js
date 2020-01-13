import { Icon, Text } from 'native-base'
import React from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { Header } from 'react-native-elements'
import { connect } from 'react-redux'
import { getFilteredGroupsDataForIdea } from '../../store/ideas/selectors/ideaGroup'
import Navigator from './navigator'

function Index(props) {

  const renderBack = () => {
    return <Icon name='arrow-back' onPress={() => props.navigation.goBack()} />
  }

  const renderCenterComponent = (ideaNumber) => {
    return (
      <View style={[styles.rowBlock]}>
        <View style={styles.leftItem}><Text style={[styles.textStyle]}>{'Idea - ' + ideaNumber}</Text></View>
      </View>
    )
  }

  const renderNavigation = () => {
    return <Icon name="menu" onPress={() => props.navigation.openDrawer()} />
  }

  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: '#1b3f77' }} />
      {props.filteredGroupData.currentIdeaGroup &&
        <View style={styles.container}>
          <Header
            containerStyle={{
              // backgroundColor: '#c7dbfe',
              backgroundColor: 'rgba(231,240,254,1)',
              justifyContent: 'space-around',
              height: 50,
              paddingTop: 0
            }}

            placement="left"
            leftComponent={renderBack()}
            centerComponent={renderCenterComponent(props.filteredGroupData.currentIdeaGroup.Idea.IdeaNumber)}
            // centerComponent={{ text: 'DASHBOARD', style: { color: '#566F99', fontSize: 18, fontWeight: '700' } }}
            rightComponent={renderNavigation()}
          />
          <Navigator screenProps={{ filteredGroupData: props.filteredGroupData, openedTab: props.openedTab, focusAreas: props.focusAreas }} />
        </View>
      }
    </>
  )
}

const mapStateToProps = (state, props) => {
  const getData = getFilteredGroupsDataForIdea();
  return {
    filteredGroupData: getData(state.ideaData.ideaGroups, state.masterData.groups, state.masterData.focusAreas, state.ideaData.openedIdeaGroup.ideaGroupId, props.screenProps.groupId).filteredGroupData,
    openedTab: state.ideaData.openedIdeaGroup.tab,
    focusAreas: state.masterData.focusAreas
  }
}

export default connect(mapStateToProps, null)(Index);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rowBlock: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftItem: {
    justifyContent: "space-between",
  },
  textStyle: {
    left: 20, width: 200, color: '#566F99', fontSize: 18, fontWeight: '700'
  }
})
