import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './screens/MainScreen';
import { COLORS } from './configs/template';
import { ROUTES } from './configs/route';
import ScannerScreen from './screens/ScannerScreen';
import ResultScreen from './screens/ResultScreen';
import { PLANTS_DATA } from './configs/data';
import LibraryScreen from './screens/LibraryScreen';
import HistoryScreen from './screens/HistoryScreen';
const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: COLORS.GRAY
          }
        }}
      >
        <Stack.Screen
          name={ROUTES.MAIN}
          component={MainScreen}
        />
        <Stack.Screen
          name={ROUTES.SCANNER}
          component={ScannerScreen}
        />
        <Stack.Screen
          name={ROUTES.RESULT}
          // @ts-ignore
          component={ResultScreen}
          initialParams={{ plant: PLANTS_DATA[0] }}
        />
        <Stack.Screen
          name={ROUTES.LIBRARY}
          component={LibraryScreen}
        />
        <Stack.Screen
          name={ROUTES.HISTORY}
          component={HistoryScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
