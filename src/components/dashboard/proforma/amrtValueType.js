import React, { PureComponent } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'native-base';
import { material } from 'react-native-typography';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Translation from '../../common/translation';

class ProformaType extends PureComponent {

    onChange = (value) => e => {
        this.props.onChange(value);
    }

    render() {
        const amrtValue = this.props.amrtValue;
        return (
            <View style={styles.container}>
                <TouchableOpacity key={'p&L'} onPress={this.onChange(true)}>
                    <View style={styles.innerContainer}>
                        <View style={styles.iconContainer}>
                            <Icon name={amrtValue ? 'radio-button-checked' : 'radio-button-unchecked'} color={'blue'} size={24} />
                        </View>
                        <Text style={material.headline}><Translation id={'Amortized'} /></Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity key={'cashflow'} onPress={this.onChange(false)}>
                    <View style={[styles.innerContainer, { paddingLeft: 20 }]}>
                        <View style={[styles.iconContainer]}>
                            <Icon name={!amrtValue ? 'radio-button-checked' : 'radio-button-unchecked'} color={'blue'} size={24} />
                        </View>
                        <Text style={material.headline}><Translation id={'Unamortized'} /></Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
    },
    innerContainer: {
        flex: 1, flexDirection: 'row', alignItems: 'center'
    },
    iconContainer: {
        marginRight: 5
    },
});

export default ProformaType;