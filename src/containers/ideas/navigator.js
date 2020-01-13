import { Group, FocusArea, Details, Risk, Value, Decision } from './screens';
import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { Dimensions } from 'react-native';

const HEIGHT = Dimensions.get('window').height;
//const WIDTH = Dimensions.get('window').width;

const TabNavigator = createMaterialTopTabNavigator({
  Group: {
    screen: props => Group({ ...props })
  },
  FocusArea: {
    screen: props => FocusArea({ ...props }),
    navigationOptions: {
      tabBarLabel: 'Focus Area'
    }
  },
  Details: {
    screen: props => Details({ ...props })
  },
  Risk: {
    screen: props => Risk({ ...props })
  },
  Value: {
    screen: props => Value({ ...props })
  },
  Decision: {
    screen: props => Decision({ ...props })
  }
}, {
  tabBarOptions: {
    tabStyle: { width: 'auto' },
    labelStyle: { fontSize: HEIGHT * 0.02 },
    scrollEnabled: true,
  },
}
);

export default createAppContainer(TabNavigator);
