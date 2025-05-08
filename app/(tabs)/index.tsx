import { Image } from "expo-image";
import { StyleSheet, TouchableOpacity } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link } from "expo-router";

type AppRoutes = "/pokemon" | "/abilities" | "/berries" | "/items";

export default function HomeScreen() {
  const resources = [
    {
      name: "Pokemon",
      path: "./pokemon",
      // icon: require("@/assets/images/pokemon-icon.png"), // 假设你有这个图标
    },
    {
      name: "Abilities",
      path: "./abilities",
      // icon: require("@/assets/images/partial-react-logo.png"), // 使用现有图标作为替代
    },
    {
      name: "Berries",
      path: "./berries",
      // icon: require("@/assets/images/partial-react-logo.png"), // 使用现有图标作为替代
    },
    {
      name: "Items",
      path: "./items",
      // icon: require("@/assets/images/partial-react-logo.png"), // 使用现有图标作为替代
    },
  ];

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Pokemon Dex</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedText type="subtitle" style={styles.exploreText}>
        Explore the Pokemon Universe
      </ThemedText>

      {/* 资源卡片网格 */}
      <ThemedView style={styles.gridContainer}>
        {resources.map((resource, index) => (
          <Link key={index} href={resource.path as AppRoutes} asChild>
            <TouchableOpacity style={styles.card}>
              {/* <Image
                source={resource.icon}
                style={styles.cardIcon}
              /> */}
              <ThemedText style={styles.cardText}>{resource.name}</ThemedText>
            </TouchableOpacity>
          </Link>
        ))}
      </ThemedView>

      <ThemedView style={styles.footerContainer}>
        <ThemedText style={styles.footerText}>
          Data provided by Pokemonle
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 20,
  },
  exploreText: {
    textAlign: "center",
    marginBottom: 24,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  card: {
    width: "48%",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardIcon: {
    width: 80,
    height: 80,
    marginBottom: 12,
  },
  cardText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  footerContainer: {
    marginTop: 20,
    paddingVertical: 16,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    opacity: 0.7,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
