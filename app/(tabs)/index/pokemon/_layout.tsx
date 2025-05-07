import { Stack } from "expo-router";
import { StatusBar, View } from "react-native";

export default function HomeLayout() {
  return (
    <View style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          // header: () => <View>1111</View>,
        }}
      >
        <Stack.Screen name="index" options={{ title: "Pokémon" }} />
        <Stack.Screen name="[id]" options={{ title: "Pokémon Details" }} />
      </Stack>
    </View>
  );
}
