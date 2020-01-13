import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Idea from '../containers/ideas/index';
import IdeaContainer from './ideaContainer';

const IdeasStack = createStackNavigator({
  Ideas: {
    screen: IdeaContainer,
    navigationOptions: {
      header: null,
      gestureEnabled: false
    }
  },
  Idea: {
    screen: Idea,
    navigationOptions: {
      header: null,
      gestureEnabled: false
    }
  },
  initialRouteName: 'Ideas'
})

export default createAppContainer(IdeasStack);
