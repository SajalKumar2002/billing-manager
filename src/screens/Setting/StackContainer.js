import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Provider as BillProvider } from '../../context/Bill/BillContext';
import { Provider as ProductProvider } from '../../context/Product/ProductContext';

import Setting from "./Setting";

const Stack = createNativeStackNavigator();

export default function StackContainer() {
    return (
        <ProductProvider>
            <BillProvider>
                <Stack.Navigator screenOptions={{ headerTitle: 'Settings' }}>
                    <Stack.Screen name="Setting" component={Setting} />
                </Stack.Navigator>
            </BillProvider>
        </ProductProvider>
    )
}