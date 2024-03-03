import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import { Provider } from '../context/Product/ProductContext';

import ProductContainer from './Product/StackContainer';
import BillContainer from './Bill/StackContainer';
import SettingContainer from './Setting/StackContainer';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Provider>
            <NavigationContainer>
                <Tab.Navigator screenOptions={{ headerShown: false }} >
                    <Tab.Screen name='Bill' component={BillContainer} options={{
                        tabBarIcon: ({ focused }) => {
                            return <Ionicons name={focused ? 'receipt' : "receipt-outline"} size={24} color='black' />
                        }
                    }} />
                    <Tab.Screen name='Product' component={ProductContainer} options={{
                        tabBarIcon: ({ focused }) => {
                            return <FontAwesome5 name={focused ? 'box-open' : 'box'} size={24} color='black' />
                        }
                    }} />
                    <Tab.Screen name='Settings' component={SettingContainer} options={{
                        tabBarIcon: ({ focused }) => {
                            return <Ionicons name={focused ? 'settings-sharp' : 'settings-outline'} size={24} color='black' />
                        }
                    }} />
                </Tab.Navigator>
            </NavigationContainer>
        </Provider>
    )
}