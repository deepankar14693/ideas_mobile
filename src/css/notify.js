import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },

  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },

  notify: {
    // position: 'absolute',
    // left: '50%',
    // top: 60,
    // zIndex: 9999
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    zIndex: 9999
  },
  notifyOuter: {
    margin: 0,
    zIndex: 999,
    position: 'relative',
    textAlign: 'center'
  },
  notifyMsgbox: {
    position: 'relative',
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 10,
    paddingRight: 10,
    width: '308px',
    height: 30,
    textAlign: 'left',
    backgroundColor: '#FBFFC6',
    borderColor: '#ffac35',
    borderWidth: 1,
    top: 5,
    borderRadius: 5
  },
  notification: {
    backgroundColor: '#f9ffc9',
    borderColor: '#ffac35',
    borderWidth: 1,

  },
  notificationLabel: {
    fontWeight: 'normal',
    alignItems: 'flex-start'
  },
  grayDarkest: {
    color: '#233238'
  }

});

export default styles;