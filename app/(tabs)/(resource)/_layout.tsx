import { Ionicons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";

export default function IndexLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "#f5f5f5",
        },
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerLeft: () => (
          <Link href="/(tabs)">
            <Ionicons name="arrow-back" size={24} color="black" />
          </Link>
        ),
        animation: "slide_from_right",
      }}
    ></Stack>
  );
}
