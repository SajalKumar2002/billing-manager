import { PaperProvider } from 'react-native-paper';

import TabNavigator from './src/screens/TabNavigator';

export default function App() {
  return (
    <PaperProvider>
      <TabNavigator />
    </PaperProvider>
  )
}
