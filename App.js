import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Serial from "./screens/Serial";
import Quantity from "./screens/Quantity";
import CheckStock from "./screens/CheckStock";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        activeColor="#f0edf6"
        inactiveColor="#3e2465"
        barStyle={{ backgroundColor: "#694fad" }}
      >
        <Tab.Screen
          options={{
            tabBarLabel: "Serial",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" size={24} color={color} />
            ),
          }}
          name="Serial"
          component={Serial}
        />
        <Tab.Screen
          options={{
            tabBarLabel: "quantity",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="storage" size={24} color={color} />
            ),
          }}
          name="Quantity"
          component={Quantity}
        />
        <Tab.Screen
          options={{
            tabBarLabel: "stock",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="search" size={24} color={color} />
            ),
          }}
          name="CheckStock"
          component={CheckStock}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
