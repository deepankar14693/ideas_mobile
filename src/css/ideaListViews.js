
import { Dimensions, StyleSheet } from 'react-native';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

export const ideaListGroupStyles = StyleSheet.create({
    ideaNumberEllipse: {
        borderRadius: 10,
        backgroundColor: 'rgba(227,232,238,1)',
        height: 18,
        width: 35,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ideaNumberEllipseText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#1d3f77',
    },
    focuAreaName: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 8
    },
    ideaTitle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    ideaMoreGroupsText: {
        fontSize: 10,
        fontWeight: '400',
        color: 'rgba(107,115,127,1)'
    },
    ideaDescText: {
        flex: 1,
        color: '#566f99',
        fontWeight: '500'
    },
    ideaTitleText: {
        color: '#1d3f77',
        fontWeight: '700'
    },
});

export const ideaListRVDStyles = StyleSheet.create({
    low: {
        flexDirection: 'row',
        backgroundColor: 'rgba(65, 227, 126, 0.25)',
        height: HEIGHT * 0.046,
        marginRight: 5,
        paddingHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'flex-end',
        borderRadius: 4,
        marginTop: 10,
    },
    medium: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 172, 52, 0.25)',
        height: HEIGHT * 0.046,
        marginRight: 5,
        paddingHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'flex-end',
        borderRadius: 4,
        marginTop: 10,
    },
    high: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 94, 89, 0.25)',
        height: HEIGHT * 0.046,
        marginRight: 5,
        paddingHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'flex-end',
        borderRadius: 4,
        marginTop: 10,
    },
    default: {
        flexDirection: 'row',
        height: HEIGHT * 0.046,
        marginRight: 5,
        paddingHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'flex-end',
        borderRadius: 4,
        marginTop: 10,
        borderWidth: 1,
        borderColor: 'rgba(176,188,208,.5)',
    },
    disabled: {
        flexDirection: 'row',
        height: HEIGHT * 0.046,
        marginRight: 5,
        paddingHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'flex-end',
        borderRadius: 4,
        marginTop: 10,
        backgroundColor: 'rgb(242, 242, 242)'
    },
    stageContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        height: HEIGHT * 0.026,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginRight: 4,
    },
    stageText: {
        flex: 1,
        fontSize: HEIGHT * 0.015,
        fontWeight: '600',
        color: 'rgb(118, 138, 173)',
        alignSelf: 'center',
    },
    dotsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 3
    }
})

export const ideaListItem = StyleSheet.create({
    card: {
        flexDirection: 'row',
        width: WIDTH * 0.97,
        backgroundColor: 'rgba(246,250,254,1)',
        borderColor: 'gray',
        borderWidth: 0.5,
        alignSelf: 'center',
        borderRadius: 5
    },
    boxContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    }
})

export const dropdownStyle = StyleSheet.create({
    default: {
        padding: 5,
        width: WIDTH * 0.92,
        flexDirection: 'row',
        minHeight: HEIGHT * 0.046,
        marginRight: 5,
        paddingHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'flex-end',
        borderRadius: 4,
        marginTop: 10,
        borderWidth: 1,
        borderColor: 'rgba(176,188,208,.5)',
    },
    disabled: {
        padding: 5,
        width: WIDTH * 0.92,
        flexDirection: 'row',
        minHeight: HEIGHT * 0.046,
        marginRight: 5,
        paddingHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'flex-end',
        borderRadius: 4,
        marginTop: 10,
        backgroundColor: 'rgb(242, 242, 242)'
    },
})