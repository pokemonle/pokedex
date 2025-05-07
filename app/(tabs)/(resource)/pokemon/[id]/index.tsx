import { ThemedText } from "@/components/ThemedText";
import { Image } from "expo-image";
import { Tabs, useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";
import useSWR from "swr";

// Fetcher function for the API
const fetcher = (url: string) => fetch(url).then((res) => res.json());

// Pokemon interface based on the API response
interface Pokemon {
  id: number;
  identifier: string;
  species_id: number;
  height: number;
  weight: number;
  base_experience: number;
  order: number;
  is_default: boolean;
}

export default function PokemonDetailScreen() {
  // Get the ID from the URL parameters
  const { id } = useLocalSearchParams();
  const { t } = useTranslation("pokemon_species");
  // Fetch the Pokemon data
  const { data, error, isLoading } = useSWR<Pokemon>(
    `https://api-rs.pokemonle.incubator4.com/v1/pokemons/${id}`,
    fetcher
  );

  const pokemon = data;

  // Display loading state
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <ThemedText style={styles.loadingText}>
          Loading Pokémon data...
        </ThemedText>
      </View>
    );
  }

  // Display error state
  if (error || !pokemon) {
    return (
      <View style={styles.errorContainer}>
        <ThemedText style={styles.errorText}>
          Error loading Pokémon data. Please try again.
        </ThemedText>
      </View>
    );
  }

  // Convert height from decimeters to meters and format
  const heightInMeters = pokemon.height / 10;
  // Convert weight from hectograms to kilograms and format
  const weightInKg = pokemon.weight / 10;

  return (
    <ScrollView style={styles.container}>
      <Tabs.Screen options={{ title: "1111" }} />
      <View style={styles.card}>
        <ThemedText type="title" style={styles.name}>
          {t(pokemon.identifier)}
        </ThemedText>

        <View style={styles.imageContainer}>
          <Image
            source={`https://image.pokemonle.incubator4.com/pokemon/${pokemon.id}.webp`}
            style={styles.image}
          />
        </View>

        <View style={styles.infoContainer}>
          <InfoRow label="Pokédex ID" value={`#${pokemon.id}`} />
          <InfoRow label="Species ID" value={`${pokemon.species_id}`} />
          <InfoRow label="Height" value={`${heightInMeters} m`} />
          <InfoRow label="Weight" value={`${weightInKg} kg`} />
          <InfoRow
            label="Base Experience"
            value={`${pokemon.base_experience} XP`}
          />
          <InfoRow label="Order" value={`#${pokemon.order}`} />
          <InfoRow
            label="Default Form"
            value={pokemon.is_default ? "Yes" : "No"}
          />
        </View>
      </View>
    </ScrollView>
  );
}

// Helper component for displaying info rows
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <ThemedText style={styles.infoLabel}>{label}:</ThemedText>
      <ThemedText style={styles.infoValue}>{value}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#f8f8f8",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    color: "red",
    textAlign: "center",
  },
  card: {
    margin: 16,
    padding: 16,
    // backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  name: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 16,
    textTransform: "capitalize",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 24,
    backgroundColor: "#f2f2f240",
    padding: 20,
    borderRadius: 12,
  },
  image: {
    width: 200,
    height: 200,
  },
  infoContainer: {
    // backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 16,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
  },
  infoLabel: {
    fontWeight: "bold",
    flex: 1,
  },
  infoValue: {
    flex: 1,
    textAlign: "right",
  },
});
