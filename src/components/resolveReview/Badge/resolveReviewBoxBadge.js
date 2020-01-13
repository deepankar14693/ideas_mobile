import React from 'react';
import { Badge } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';

export default class BadgeBox extends React.Component {
    render() {
        const count = this.props.count;
        return (
            <View>
                {count > 0 &&
                    <Badge value={this.props.value}
                        containerStyle={[{ paddingTop: 24 ,paddingBottom: 24}]}
                        badgeStyle={[styles.badgeStyle, this.props.statusStyle]}
                        textStyle={{ fontSize: 15 }}
                    />
                }
                {!count &&
                    <View style={[styles.badgeStyle, { paddingTop: 24 }]} />
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    badgeStyle: {
        paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10, borderRadius: 15, minWidth: 100, minHeight: 40
    }
})