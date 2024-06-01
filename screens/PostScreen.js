import { StyleSheet, View, SafeAreaView } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';

import colors from "../styles/colors";

import MyPosts from "./MyPosts";
import NewPost from "./NewPost";

const Stack = createStackNavigator();

const PostScreen = () => {
    return (
        <Stack.Navigator
            screenOptions={{
            headerShown: false,
          }}
        >
            <Stack.Screen name="MyPosts" component={MyPosts} />
            <Stack.Screen name="NewPost" component={NewPost} />
        </Stack.Navigator>
    );
};

export default PostScreen;