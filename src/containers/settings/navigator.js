import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { PerformanceLog, Settings } from './screens';
import i18n from '../../i18n';

const TabNavigator = createMaterialTopTabNavigator(
    {
        settings:{
            screen: props => Settings({ ...props }),
            navigationOptions: {
                tabBarLabel: i18n.t('Settings')
            }
        },
        Logs: {
            screen: props => PerformanceLog({ ...props }),
            navigationOptions: {
                tabBarLabel: i18n.t('Logs')
            }
        }
    }
);

export default createAppContainer(TabNavigator);
