import * as React from 'react'
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from 'native-base';

import Home from "./src/screens/Home"
import Login from './src/screens/LoginEl'
import Register from './src/screens/Register'
import AddList from './src/screens/AddList';
import List from './src/screens/ListEl';
import Categories from './src/screens/Categories';
import Detail from './src/screens/DetailEl';

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function MyTab() {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            headerShown: false,
            tabBarLabel: () => { return null },
            tabBarIcon: ({ focused }) => {
                let iconName;
                if (route.name == "List") {
                    iconName = focused ? "list" : "list-outline"
                    return <Ionicons name={iconName} size={25} color="#FF5555" />
                } else if (route.name == "AddList") {
                    iconName = focused ? "add-circle" : "add-circle-outline"
                    return <Ionicons name={iconName} size={25} color="#FF5555" />
                } else if (route.name == 'Categories') {
                    iconName = focused ? "bookmarks" : "bookmarks-outline"
                    return <Ionicons name={iconName} size={25} color="#FF5555" />
                }
            }
        })}>
            <Stack.Screen name="List" component={List} />

            <Stack.Screen name="AddList" component={AddList} />
            <Stack.Screen name="Categories" component={Categories} />

        </Tab.Navigator>
    )
}

export default function Container() {
    return (
        <NavigationContainer>
            <StatusBar />
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
                <Stack.Screen name="MyTab" component={MyTab} options={{ headerShown: false, headerTintColor: "white", headerMode: "screen" }} />
                <Stack.Screen name="Detail" component={Detail} options={{ headerShown: true, headerMode: "screen" }} />
            </Stack.Navigator>
        </NavigationContainer>
        // <Home />
    )
}