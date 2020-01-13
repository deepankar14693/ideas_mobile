import { Container, Content, Icon } from 'native-base';
import React from 'react';
import { Text } from 'react-native';
import { Header, Overlay } from 'react-native-elements';
import colors from '../common/pickerDialog/colors';
import Translation from './translation';

export default function Modal(props) {

    const renderCenterComponent = () => {
        return (
            <Translation styles={{ color: '#FFF', textAlign: 'left', fontSize: 18, fontWeight: '700' }} id={props.title} />
        )
    }

    const toggleModalVisible = (isOpen) => {
        props.setModalVisible(isOpen)
    }

    const renderNavigation = (type) => {
        if (type === 1) {
            return <Text style={{ color: '#FFF', paddingRight: 5 }} onPress={() => toggleModalVisible(false)}>{'Close'}</Text>
        } else return <Icon name="close" style={{ color: '#FFF', paddingRight: 15 }} onPress={() => toggleModalVisible(false)} />
    }

    return (
        <Overlay isVisible={props.isOpen} onBackdropPress={() => toggleModalVisible(false)}
            overlayStyle={{ borderRadius: 8, paddingHorizontal: 16, paddingTop: 0 }}>
            <Container>
                <Header
                    placement="left"
                    containerStyle={{
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        borderBottomWidth: 1,
                        backgroundColor: colors.dropdownOptionRadioColor,
                        //borderBottomColor: colors.dropdownOptionRadioColor,
                        //backgroundColor: 'transparent',
                        justifyContent: 'space-around',
                        marginLeft: -16,
                        marginRight: -16,
                        paddingLeft: 0,
                        paddingRight: 0,
                        paddingTop: 0,
                        height: 50,

                        //styles={{ color: colors.dropdownOptionRadioColor, fontStyle: 'italic', fontWeight: '300', paddingLeft: 2, paddingBottom: 5 }}
                    }}
                    centerComponent={renderCenterComponent()}
                    rightComponent={renderNavigation()}
                />
                <Content>
                    {props.content}
                </Content>
                <Header
                    placement="left"
                    containerStyle={{
                        backgroundColor: 'transparent',
                        justifyContent: 'space-around',
                        paddingTop: 0, height: 15, borderBottomWidth: 0
                    }}
                />
            </Container>
        </Overlay>
    );

}
