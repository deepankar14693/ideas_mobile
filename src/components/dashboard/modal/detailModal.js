import { Container, Content, Icon } from 'native-base';
import React, { Component } from 'react';
import { Text } from 'react-native';
import { Header, Overlay } from 'react-native-elements';
import Translation from '../../common/translation';
import Category from './category';
import _ from 'lodash';
import { formatAmount2, formatCount } from '../../../common/utils';

export default class CategoryModal extends Component {
    renderCenterComponent() {
        return (
            <Translation styles={{ color: '#fff' }} id={this.props.title} />
        )
    }

    renderNavigation(type) {
        if (type === 1) {
            return <Text style={{ color: '#fff', paddingRight: 5 }} onPress={() => this.props.setModalVisible(false)}>{'Close'}</Text>
        } else return <Icon name="close" style={{ color: '#fff', paddingRight: 5 }} onPress={() => this.props.setModalVisible(false)} />
    }

    getTableData(arrayData) {
        let tableData = [];
        tableData.push(['CATEGORY', 'BASELINE $', '# IDEAS'])
        _.map(arrayData, (item) => {
            tableData.push([item.Title, formatAmount2(item.BaselineValue, true, false), formatCount(item.IdeaCount)]);
        })
        return tableData;
    }

    render() {

        console.log(this.props.tableData)
        const tableData = this.getTableData(this.props.tableData);
        console.log(tableData)

        return (
            <Overlay isVisible={this.props.modalVisible} onBackdropPress={() => this.props.setModalVisible(false)}
                overlayStyle={{ padding: 0, borderRadius: 8 }}
            >
                <Container style={{ borderRadius: 8 }}>
                    <Header
                        placement="left"
                        containerStyle={{
                            borderTopLeftRadius: 8,
                            borderTopRightRadius: 8,
                            backgroundColor: '#5789fa', justifyContent: 'space-around', paddingLeft: 0,
                            paddingTop: 0, height: 50,
                        }}
                        centerComponent={this.renderCenterComponent()}
                        rightComponent={this.renderNavigation()}
                    />
                    <Content>
                        {/* <Text style={{ color: 'gray' }}> {'// Your main content goes here'}</Text> */}
                        <Category tableData={tableData} />
                    </Content>
                    <Header
                        placement="left"
                        containerStyle={{
                            backgroundColor: 'transparent',
                            justifyContent: 'space-around',
                            paddingTop: 0, height: 15, borderBottomWidth: 0
                        }}
                    // centerComponent={this.renderNavigation(1)}
                    />
                </Container>
            </Overlay>
        );
    }
}
