import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from './Home';
import Edit from './Edit';
import Create from './Create';

const Stack = createNativeStackNavigator();

export default function StackContainer() {
    return (
        <Stack.Navigator screenOptions={{ headerTitle: 'Product Manager' }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Create" component={Create} />
            <Stack.Screen name="Edit" component={Edit} />
        </Stack.Navigator>
    )
}