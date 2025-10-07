import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";
import "./global.css";

export default function TabLayout() {
  return (
    // test purpose
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#7c3aed",
        tabBarInactiveTintColor: "#9ca3af",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "white",
          borderTopWidth: 1,
          borderTopColor: "#f3f4f6",
          height: 90,
          paddingBottom: 20,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Quotations",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? "document-text" : "document-text-outline"} 
              size={24} 
              color={color} 
            />
          ),
        }}
      />
    
      <Tabs.Screen
        name="newLeadForm"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <View className="bg-purple-500 rounded-full w-12 h-12  flex justify-center items-center shadow-lg">
              <Ionicons name="add" size={28} color="#fff" />
            </View>
          ),
         
        }}
      />
    
      <Tabs.Screen
        name="QuotationScreen"
        options={{
          href: null,
          title: "Create Quotation",
        }}
      />
  
    </Tabs>
  );
}
