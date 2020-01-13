import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

const Dot = (props) => {
    return (
        <>
            {props.type === 1 &&
                <View style={styles.dotWithoutBg}></View>
            }
            {props.type === 2 &&
                <View style={styles.dotWithBg}></View>
            }
            {props.type === 3 &&
                <View style={styles.crossIconContainer}>
                    <Icon
                        type='font-awesome'
                        color="rgba(118,138,172,1)"
                        style={styles.crossIcon}
                        size={8}
                        name="close" />
                </View>
            }
            {props.type === 4 &&
                <View style={styles.dotWithoutBgSelected}></View>
            }
            {props.type === 5 &&
                <View style={styles.dotWithBgSelected}></View>
            }
            {props.type === 6 &&
                <View style={styles.crossIconContainerSelected}>
                    <Icon
                        type='font-awesome'
                        color="rgba(118,138,172,1)"
                        style={styles.crossIconSelected}
                        size={9}
                        name="close" />
                </View>
            }
        </>
    )
}


export default Dot;

const styles = StyleSheet.create({
    dotWithoutBg: {
        height: 5,
        width: 5,
        borderRadius: 5,
        borderWidth: 0.7,
        borderColor: '#768aad',
        marginRight: 1,
    },
    dotWithBg: {
        backgroundColor: '#768aad',
        height: 5,
        width: 5,
        borderRadius: 5,
        borderWidth: 0.7,
        borderColor: '#768aad',
        marginRight: 1,
    },
    crossIconContainer: {
        marginRight: 1,
    },
    crossIcon: {
        color: '#768aad',
        height: 5,
        width: 5,
    },

    dotWithoutBgSelected: {
        height: 5,
        width: 5,
        borderRadius: 5,
        borderWidth: 0.7,
        borderColor: '#FFF',
        marginRight: 1,
    },
    dotWithBgSelected: {
        backgroundColor: '#FFF',
        height: 5,
        width: 5,
        borderRadius: 5,
        borderWidth: 0.7,
        borderColor: '#FFF',
        marginRight: 1,
    },
    crossIconContainerSelected: {
        marginRight: 1,
    },
    crossIconSelected: {
        color: '#FFF',
        height: 5,
        width: 5,
    }
})