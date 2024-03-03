import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Provider } from '../../context/Bill/BillContext';

import HomeBill from './HomeBill';
import CreateBill from './CreateBill';
import DisplayBill from './DisplayBill';
import EditBill from './EditBill';

const Stack = createNativeStackNavigator();

export default function StackContainer() {
    return (
        <Provider>
            <Stack.Navigator screenOptions={{ headerTitle: 'Billing' }}>
                <Stack.Screen name="Home" component={HomeBill} />
                <Stack.Screen name="Create" component={CreateBill} />
                <Stack.Screen name='Display' component={DisplayBill} />
                <Stack.Screen name='Edit' component={EditBill} />
            </Stack.Navigator>
        </Provider>
    )
}