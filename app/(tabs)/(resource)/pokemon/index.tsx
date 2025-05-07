import Pagination from "@/components/Pagination";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, FlatList, StyleSheet } from "react-native";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface Pokemon {
  id: number;
  identifier: string;
}

export default function HomeScreen() {
  const { t } = useTranslation("pokemon_species");

  const [page, setPage] = useState(1);

  const { data, isLoading } = useSWR<{
    data: Pokemon[];
    total_pages: number;
    page: number;
  }>(
    ["https://api-rs.pokemonle.incubator4.com/v1/pokemons?per_page=24", page],
    ([url, page]) => fetcher(`${url}&page=${page}`)
  );

  const screenWidth = Dimensions.get("window").width;
  const itemWidth = 100; // Width of each item
  const itemMargin = 10; // Margin between items
  const numColumns = Math.floor(screenWidth / (itemWidth + itemMargin * 2));

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Pokémon Collection
      </ThemedText>
      <FlatList
        data={data?.data}
        renderItem={({ item }) =>
          isLoading ? (
            <ThemedText type="title">Loading...</ThemedText>
          ) : (
            <Link
              href={{
                pathname: "../pokemon/[id]",
                params: { id: item.id },
              }}
              style={styles.cardLink}
            >
              <ThemedView style={styles.card}>
                <Image
                  source={`https://image.pokemonle.incubator4.com/pokemon/${item.id}.webp`}
                  style={styles.image}
                  cachePolicy="memory-disk"
                />
                <ThemedText style={styles.pokemonName}>
                  {t(item.identifier)}
                </ThemedText>
              </ThemedView>
            </Link>
          )
        }
        numColumns={numColumns}
        key={numColumns} // Force re-render when numColumns changes
        contentContainerStyle={styles.gridContainer}
        columnWrapperStyle={styles.row}
        ListHeaderComponent={
          <Pagination
            total_pages={data?.total_pages ?? 1}
            current_page={data?.page ?? 1}
            onPageChange={setPage}
          />
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    margin: 10,
  },
  title: {
    textAlign: "center",
    marginVertical: 15,
    marginTop: 50,
  },
  gridContainer: {
    padding: 5,
  },
  row: {
    flex: 1,
    justifyContent: "space-around",
    marginBottom: 10,
  },
  cardLink: {
    margin: 5,
  },
  card: {
    alignItems: "center",
    padding: 10,
    // backgroundColor: "#f5f5f5",
    borderRadius: 10,
    borderColor: "#fff",
    borderWidth: 1,

    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  image: {
    width: 80,
    height: 90,
    marginBottom: 5,
  },
  pokemonName: {
    fontSize: 12,
    textAlign: "center",
    textTransform: "capitalize",
  },
});
