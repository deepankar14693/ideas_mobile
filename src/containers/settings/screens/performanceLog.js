import { Text } from 'native-base';
import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

class PerformanceLog extends PureComponent {
    constructor(props) {
        super(props);
    }

    renderDiv = (t1, t2) => {
        return (
            <View style={{ flexDirection: 'row', height: 23 }}>
                <View style={{ backgroundColor: 'rgb(52, 119, 180)', flex: 0.5, paddingLeft: 5 }}>
                    <Text>{t1}</Text>
                </View>
                <View style={{ backgroundColor: 'rgb(246, 124, 5)', flex: 0.5, paddingRight: 5 }}>
                    <Text style={{ textAlign: "right" }}>{t2}</Text>
                </View>
            </View>
        )
    };

    render() {
        return (
            <View style={{ marginLeft: 10, marginRight: 10 }}>
                {this.renderDiv('Transfer Time (ms)', 'Server Time (ms)')}
                <View style={{ marginTop: 8 }}>
                    {
                        this.props.performanceLog.map((item, index) =>
                            <View key={index} style={{ paddingBottom: 5 }}>
                                <Text>{index + 1}{'\u2022'} {item.Action}</Text>
                                {this.renderDiv(item.Time1.toFixed(4), item.Time2.toFixed(4))}
                            </View>
                        )
                    }
                </View>
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        performanceLog: state.performanceLog,
    }
}

export default connect(mapStateToProps, null)(PerformanceLog);