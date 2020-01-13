import { StyleSheet } from "react-native";

export default boxStyle = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
    },
    innerContainer: {
        paddingBottom: 20,
        flex: 1,
        width: "95%",
        borderRadius: 6,
        minHeight: 294,
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
        fontSize: 20,
        fontWeight: "600",
        color: "#233238",
        textAlign: "center",
        paddingTop: 6,
    },
    numTxt: {
        paddingTop: 20,
        fontSize: 50,
        textAlign: "center",
        color: "#233238",
        fontWeight: '100'
    },
    headTxtSmall: {
        paddingTop: 0,
        paddingBottom: 30,
        fontSize: 16,
        textAlign: "center",
        color: "#233238",
    },
    detailTxtStyle1: {
        //  width: "86%",
        height: 30,
        fontSize: 14,
        textAlign: 'center',
        color: "#233238",
    },
    detailTxtStyle2: {
        height: 60,
        fontSize: 14,
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
    noIdeaIconStyle: {
        fontSize: 70, color: '#07ab59', textAlign: 'center', paddingTop: 10
    }

})

