import { StyleSheet } from "react-native";

export const tableStyles = StyleSheet.create({
    container: { marginTop: 16, backgroundColor: '#fff', fontSize: 13 },
    wrapper: { flexDirection: 'row' },
    riskHeader: { height: 40 },
    header: { height: 40 },
    textAlignLeft: { textAlign: "left" },
    textAlignRight: { textAlign: "right" },
    categoryLeftItem: {
        borderBottomWidth: 3,
        borderBottomColor: "#bbb",
    },
    headerText: { color: '#2E58D6', fontWeight: '700', paddingBottom: 3 },
    title: { flex: 1 },
    row: { height: 35, flexDirection: 'row' },
    riskRow: { height: 35 },
    text: { textAlign: 'right', color: '#2E58D6', paddingBottom: 3 },
    rowBlock: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    leftItem: {
        textAlign: "left",
        alignItems: "flex-start",
        color: 'blue',
        justifyContent: "space-between",
    },
    rightItem: {
        textAlign: "right",
        alignItems: "flex-end",
        color: 'blue',
        justifyContent: "space-between",
    },
    borderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: "#bbb"
    },
    borderBottomHighlight: {
        borderBottomWidth: 3,
        borderBottomColor: "#bbb"
    },
    noBorder: {
        borderBottomWidth: 0,
    },
    mR5: {
        marginRight: 5,
    },
    pR5: {
        paddingRight: 5,
    },
});

