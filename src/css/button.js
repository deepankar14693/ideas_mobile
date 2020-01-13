import { StyleSheet } from "react-native";

export const buttonStyle = StyleSheet.create({
    detailButtonTxtStyle: {
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 0.5,
        borderColor: "#1d3f77",
        color: "#1d3f77",
        padding: 10,
        borderRadius: 5
    },
    defaultButton: {
        padding: 5,
        margin: 2,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    btnNeutralSolidStyle: {
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "rgba(176,188,208,.4)",
        backgroundColor: "rgba(176,188,208,.4)",
    },
    btnNeutralOutlineStyle: {
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#b0bcd0",
        backgroundColor: "transparent",
    },
    btnDisabledStyle: {
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "rgba(178,184,186,.75)",
        backgroundColor: "rgba(228,230,231,.5)",
    },
    textButtonStyle: {
        color: "#566f99",
        fontWeight: "bold",
        fontSize: 14,
        marginLeft: 5
    },
    disabledTextButtonStyle: {
        color: "rgba(35,50,56,.4)",
        fontWeight: "bold",
        fontSize: 14,
        marginLeft: 5
    },
    iconStyle: {
        color: "#566f99",
        fontSize: 18,
    },
    disabledIconStyle: {
        color: "rgba(35,50,56,.4)",
        fontSize: 18,
    },
})

