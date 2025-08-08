import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from '../screens/LoginScreen';
import Home from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
    return (
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    );
}