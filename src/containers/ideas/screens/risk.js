import React, { Component } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from 'native-base';
import RiskBox from '../screenComponents/riskBox';
import RiskTitle from '../screenComponents/riskTitle';
import ButtonWithIcon from '../../../components/UI/CustomButtons/ButtonWithIcon';
import RiskRatersBox from '../screenComponents/riskRatersBox';
import RiskAdditionalBox from '../screenComponents/riskAdditionalBox';
import RiskTypeBox from '../screenComponents/riskTypeBox';
import ButtonWithBackground from '../../../components/UI/CustomButtons/ButtonWithBackground';
class Risk extends Component {
  render() {
    return (

      <ScrollView style={styles.container}>

        <RiskBox
          boxcardStyle={styles.boxCardStyle}
        >
          <RiskTitle
            titleStyle={styles.titleStyle}
            badgeStyle={styles.badgeStyle}
            titleText={"Does this idea have a Rough Risk?"}
            badgeTextStyle={styles.badgeTextStyle}
            badgeText={"Yes"}
          ></RiskTitle>
          <RiskTypeBox
            riskText={"Rough Risk"}
            buttonComponent={
              <ButtonWithIcon buttonStyle={styles.buttonStyle}
                textStyle={styles.textButtonStyle}
                iconName="create" iconStyle={styles.iconStyle}>Add</ButtonWithIcon>
            }
          ></RiskTypeBox>
        </RiskBox>

        <RiskBox
          boxcardStyle={styles.boxCardStyle}
          titleStyle={styles.titleStyle}
          badgeStyle={styles.badgeStyle}
          badgeTextStyle={styles.badgeTextStyle}
        >
          <RiskTitle
            titleStyle={styles.titleStyle}
            badgeStyle={styles.badgeStyle}
            titleText={"Does this idea have a GL Risk?"}
            badgeText={"No"}
          >

          </RiskTitle>

          <RiskTypeBox
            riskText={"GL Risk"}
            buttonComponent={
              <ButtonWithIcon buttonStyle={styles.buttonStyle}
                textStyle={styles.textButtonStyle}
                iconName="create" iconStyle={styles.iconStyle}>Add</ButtonWithIcon>
            }
          ></RiskTypeBox>

          <RiskTypeBox
            riskText={"GL Risk Rater"}
            buttonComponent={
              <ButtonWithBackground  
              color = '#dadfe6'
              buttonStyle={styles.buttonStyle2} 
              textStyle={styles.textButtonStyle}>Change</ButtonWithBackground>
            }
          ></RiskTypeBox>

        </RiskBox>
 

        <View style={{ width: "100%", flexDirection: "row", marginTop: 10, justifyContent: "space-between" }}>
          <Text style={styles.txtStyle}>All Risk Rating</Text>
          <ButtonWithIcon  buttonStyle={styles.buttonStyle3} 
            textStyle={[styles.textButtonStyle, {lineHeight: 27}]}
            iconName={"add"} iconStyle={{ marginRight: 10, color: '#5789fa' }}
          >Add or Edit Risk Raters</ButtonWithIcon>
        </View>
        <View style={styles.horizentalLine}></View>

        <RiskRatersBox
          colorHeadColor="#74a1f4"
          badgeText={"2491"}
          userText={"Alison Moss"}
          typeGroup={"DirSls-GL"}
          postText={"Content Marketing Manager"}
          contactMail={"vjaiswal@insightresults.com"}

          buttonComponent={
            <ButtonWithIcon buttonStyle={styles.buttonStyle}
              textStyle={styles.textButtonStyle}
              iconName="create" iconStyle={styles.iconStyle}>Add</ButtonWithIcon>
          }

        ></RiskRatersBox>

        <RiskRatersBox
          colorHeadColor="#c6dbfe"
          badgeText={"2497"}
          userText={"Test Personnel User"}
          typeGroup={"QA III"}
          contactMail={"vjaiswal@gmail.com"}

          buttonComponent={
            <ButtonWithIcon buttonStyle={styles.buttonStyle}
              textStyle={styles.textButtonStyle}
              iconName="create" iconStyle={styles.iconStyle}>Add</ButtonWithIcon>
          }
        ></RiskRatersBox>

        <RiskAdditionalBox 
        headText={"Have all additional risk raters been identified?"}
        boxText1={"No, there might still be more risk raters"}
        boxText2={"Yes, all risk raters have been added to the idea"}
        titleStyle={styles.titleStyle}

        >

        </RiskAdditionalBox>
        <RiskAdditionalBox 
         headText={"Are all risk raters complete and ready to be locked?"}
         boxText1={"no there are still risk rating that need to be entered"}
         boxText2={"Yes, lock the risk rating"}
         titleStyle={styles.titleStyle}
        >

        </RiskAdditionalBox>

      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
    paddingLeft: 5,
    paddingRight: 5,
  },
  boxCardStyle: {
    backgroundColor: "#f7f7f7",
  },
  titleStyle: {
    color: "#566f99",
    fontWeight: "bold"
  },
  badgeStyle: {
    backgroundColor: '#263d88',
  },
  badgeTextStyle: {
    color: 'white',
  },
  txtStyle: {
    fontSize: 16,
    //fontWeight: "100",
    color: "#233238",
    paddingTop: 15,
  },
  horizentalLine: {
    height: 1,
    width: "100%",

    borderBottomWidth: 2.5,
    // padding: 2,
    marginTop: 1,
    marginBottom: 2,
    borderColor: "#263d88",
    marginBottom: 5
  },

  buttonStyle: {
    width: 75,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 0,
    borderRadius: 4,
    borderColor: "#b0bbd0",
  },
  textButtonStyle: {
    color: "#566f99",
    fontWeight: "bold",
    fontSize: 14
  },

  iconStyle: {
    color: "#566f99",
    fontSize: 18
  },

  buttonStyle2:{
    width: 75,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 0,
    borderRadius: 4,
    borderColor: "#b0bbd0",
},
buttonStyle3:{
  borderColor: "#d7dde7",

},


})

export default Risk;
