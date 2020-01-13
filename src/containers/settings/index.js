import { Icon } from 'native-base'
import React, { Component } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { Header } from 'react-native-elements'
import Translation from '../../components/common/translation'
import Navigator from './navigator'

export default class Index extends Component {

    renderBack() {
        return <Icon name='arrow-back' onPress={() => this.props.navigation.goBack()} />
    }

    renderCenterComponent() {
        return (
            <View style={[styles.rowBlock]}>
                <View style={[styles.leftItem]}><Translation styles={styles.textStyle} id='Settings' /></View>
            </View>
        )
    }

    renderNavigation() {
        return <Icon name="menu" onPress={() => this.props.navigation.openDrawer()} />
    }

    render() {
        return (
            <>
                <SafeAreaView style={{ flex: 0, backgroundColor: '#1b3f77' }} />
                <View style={styles.container}>
                    <Header containerStyle={{ backgroundColor: 'rgba(231,240,254,1)', justifyContent: 'space-around', height: 50, paddingTop: 0 }}
                        placement="left"
                        leftComponent={this.renderBack()}
                        centerComponent={this.renderCenterComponent()}
                        rightComponent={this.renderNavigation()}
                    />
                    <Navigator />
                </View>
            </>
        )
    }
}

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
        textAlign: 'left', width: 200, color: '#566F99', fontSize: 18, fontWeight: '700'
    }
})
