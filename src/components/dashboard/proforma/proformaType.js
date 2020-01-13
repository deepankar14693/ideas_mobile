import React, { PureComponent } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'native-base';
import { material } from 'react-native-typography';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Translation from '../../common/translation';

class ProformaType extends PureComponent {

    onChangeProformaType = (value) => e => {
        this.props.onChangePandLValueType(value);
    }

    render() {
        const isPandL = this.props.showPandLValue;
        return (
            <View style={styles.container}>
                <TouchableOpacity key={'p&L'} onPress={this.onChangeProformaType(true)}>
                    <View style={styles.innerContainer}>
                        <View style={styles.iconContainer}>
                            <Icon name={isPandL ? 'radio-button-checked' : 'radio-button-unchecked'} color={'blue'} size={24} />
                        </View>
                        <Text style={material.headline}><Translation id={'P&L'} /></Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity key={'cashflow'} onPress={this.onChangeProformaType(false)}>
                    <View style={[styles.innerContainer, { paddingLeft: 20 }]}>
                        <View style={[styles.iconContainer]}>
                            <Icon name={!isPandL ? 'radio-button-checked' : 'radio-button-unchecked'} color={'blue'} size={24} />
                        </View>
                        <Text style={material.headline}><Translation id={'CashFlow'} /></Text>
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