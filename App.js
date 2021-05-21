import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './LoginScreen';
import TripName from './TripName';
import AddExpenses from './AddExpenses';
import Summary from './Summary';
import SearchExpense from './SearchExpense';

const Stack = createStackNavigator(); 

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="TripName" component={TripName} />
        <Stack.Screen name="AddExpenses" component={AddExpenses} />
        <Stack.Screen name="Summary" component={Summary} />
        <Stack.Screen name="SearchExpense" component={SearchExpense} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}