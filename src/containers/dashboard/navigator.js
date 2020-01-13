import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";

import { Summary, Resolve, Review } from './screens';

const TabNavigator = createMaterialTopTabNavigator(
    {
        Summary: {
            screen: props => Summary({ ...props })
        },
        Resolve: {
            screen: props => Resolve({ ...props })
        },
        Review: {
            screen: props => Review({ ...props })
        }
    },
    {
        tabBarOptions: {
            // indicatorStyle: {
            //     height: '100%',
            //     backgroundColor: 'rgba(98,126,173,0.5)',
            //     borderBottomWidth: 2.5, borderBottomColor: 'yellow', borderStyle: 'solid'
            // },
        }
    }
);

export default createAppContainer(TabNavigator);
