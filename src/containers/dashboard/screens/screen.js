import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from 'native-base';

class Screen extends React.Component {
    render() {
        return (
            <View>
                <Text style={styles.text}>This is the  screen</Text>
            </View>
        )
    }
}

export default Screen;

const styles = StyleSheet.create({

    text: { fontSize: 28, color: "red", textAlign: "center", padding:50 }

});
