import Pagination from "@/components/Pagination";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useResourceList } from "@/hooks/useFetch";
import { Redirect, Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";

const VALID_RESOURCES = ["abilities", "berries", "generations", "items"];

export default function ResourceScreen() {
  const { resource } = useLocalSearchParams();
  const { t } = useTranslation(resource);
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);

  const { data, error, isLoading } = useResourceList(
    resource as string,
    currentPage
  );

  if (!VALID_RESOURCES.includes(resource as string)) {
    return <Redirect href="/+not-found" />;
  }

  const handleItemPress = (item: Resource) => {
    router.push(`/${resource}/${item.id}`);
  };

  const padId = (id: number) => {
    // 假设最大ID为3或4位数，补齐到4位
    return String(id).padStart(4, "0");
  };

  const renderItem = ({ item }: { item: Resource }) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => handleItemPress(item)}
      >
        <ThemedText style={styles.itemText}>
          {padId(item.id)} - {t(item.identifier)}
        </ThemedText>
      </TouchableOpacity>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          title: isLoading ? "Loading..." : (resource as string),
        }}
      />
      <ThemedText type="title" style={styles.title}>
        {resource}
      </ThemedText>

      {/* 分页控件区域 */}
      <ThemedView style={styles.paginationContainer}>
        <Pagination
          total_pages={data?.total_pages ?? 1}
          current_page={data?.page ?? 1}
          onPageChange={setCurrentPage}
        />
      </ThemedView>

      {/* 列表区域 */}
      <FlatList
        data={data?.data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        style={styles.flatListStyle}
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
  paginationContainer: {
    height: 40, // 固定高度
    marginBottom: 10,
    flexDirection: "row",
  },
  flatListStyle: {
    flex: 1, // 让FlatList占据剩余空间
  },
  listContainer: {
    width: "100%",
    paddingBottom: 20,
  },
  itemContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    width: "100%",
  },
  itemText: {
    fontSize: 16,
    textAlign: "left",
    textTransform: "capitalize",
    fontFamily: "monospace", // 使用等宽字体确保数字对齐
  },
});
