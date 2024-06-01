import { StyleSheet, View, SafeAreaView } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';

import colors from "../styles/colors";

import MarketPosts from "./MarketPosts";
import MakeOffer from "./MakeOffer";

const Stack = createStackNavigator();

const MarketScreen = () => {
    return (
        <Stack.Navigator
            screenOptions={{
            headerShown: false,
          }}
        >
            <Stack.Screen name="MarketPosts" component={MarketPosts} />
            <Stack.Screen name="MakeOffer" component={MakeOffer} />
        </Stack.Navigator>
    );
};

export default MarketScreen;