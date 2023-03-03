/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CharacterScreen } from './src/pages/Character/CharacterScreen';
import { CharactersListScreen } from './src/pages/CharactersList/CharactersListScreen';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Characters List">
          <Stack.Screen
            name="Characters List"
            component={CharactersListScreen}
          />
          <Stack.Screen name="Character" component={CharacterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
