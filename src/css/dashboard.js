import { StyleSheet } from "react-native";

export const summaryCss = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 5
    },
    innerContainer: {
        flex: 1,
        width: "96%",
        borderRadius: 6,
        paddingBottom: 20,
        borderWidth: 1,
        borderColor: "#e3e8ee",
        backgroundColor: "#fff",
        //box shadow IOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        //box shadow Android
        elevation: 6
        // flexDirection: "column"

    },
    headTxt: {
        fontSize: 25,
        fontWeight: "300",
        textAlign: "center",
        color: "#233238",
        paddingTop: 10,
    },
    numTxt: {
        //   width: "100%",
        height: 60,
        fontSize: 40,
        fontWeight: "300",
        //   lineHeight: 1,
        textAlign: "center",
        color: "#233238",
        paddingTop: 6,

    },
    detailTxtStyle1: {
        //  width: "86%",
        height: 30,
        fontSize: 12,
        textAlign: 'center',
        color: "#233238",

        //   margin: "0 auto",
    },
    detailTxtStyle2: {
        height: 60,
        fontSize: 12,
        textAlign: 'center',
        color: "#233238",
        marginTop: 5,
    },
    linkStyle: {
        height: 20,
        textAlign: 'center',
        color: "#233238",
        marginTop: 5,
    },
    detailButtonTxtStyle: {
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 0.5,
        borderColor: "#1d3f77",
        color: "#1d3f77",
        padding: 10,
        borderRadius: 5
    },
    titleWithHRLine: {
        fontSize: 12,
        textAlign: 'left',
        color: "#4e5561",
        borderBottomColor: '#4e5561',
        borderBottomWidth: 1,
        marginLeft: 20,
        marginRight: 20,
    }
});


export const resolveReviewCss = StyleSheet.create({
    headTxt: {
        fontSize: 25,
        fontWeight: "600",
        color: "#4e5561",
        textAlign: "center",
        paddingTop: 5,
        paddingBottom: 5
    },
    hrLine: {
        borderBottomColor: '#8396b4',
        borderBottomWidth: 4
    },
    divider: {
        backgroundColor: 'blue', height: 10
    }
});