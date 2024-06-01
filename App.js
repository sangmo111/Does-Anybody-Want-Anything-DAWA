import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from './styles/colors';

import Header from './components/Header';
import MarketScreen from './screens/MarketScreen';
import OfferScreen from './screens/OfferScreen';
import PostScreen from './screens/PostScreen';


import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text, 
  Button, } from '@ui-kitten/components';



export default function App() {
  const Tab = createBottomTabNavigator();

  return (
    <ApplicationProvider {...eva} theme={eva.light}>

      <NavigationContainer style={styles.container}>
      <Tab.Navigator
        screenOptions={() => ({
          headerTitle: (props) => <Header {...props} />,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: colors.lightblue,
          },
          tabBarIconStyle: { display: "none" },
          tabBarLabelStyle: {
            fontWeight: "700",
            fontSize: 15
          },
        })}>
        <Tab.Screen name="Market" component={MarketScreen} />
        <Tab.Screen name="Offers" component={OfferScreen} />
        <Tab.Screen name="Posts" component={PostScreen} />
      </Tab.Navigator>
    </NavigationContainer>

    </ApplicationProvider>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
