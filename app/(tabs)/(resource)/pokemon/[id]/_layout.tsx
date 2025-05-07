import { Tabs } from "expo-router";

export default function TabLayout() {
  //   const colorScheme = useColorScheme();

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: "Basic" }} />
    </Tabs>
  );
}
