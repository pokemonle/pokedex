import { Button, StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";

interface PaginationProps {
  total_pages: number;
  current_page: number;
  onPageChange?: (page: number) => void;
}

export default function Pagination({
  total_pages,
  current_page,
  onPageChange,
}: PaginationProps) {
  const getPageRange = () => {
    const pages: (number | string)[] = [1];

    let rangeStart = Math.max(2, current_page - 1);
    let rangeEnd = Math.min(total_pages - 1, current_page + 1);

    if (current_page <= 3) {
      rangeEnd = Math.min(5, total_pages - 1);
    } else if (current_page >= total_pages - 2) {
      rangeStart = Math.max(2, total_pages - 4);
    }

    // Add ellipsis before range if needed
    if (rangeStart > 2) {
      pages.push("...");
    }

    // Add page numbers in range
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }

    // Add ellipsis after range if needed
    if (rangeEnd < total_pages - 1) {
      pages.push("...");
    }

    // Always show last page if more than 1 page
    if (total_pages > 1) {
      pages.push(total_pages);
    }

    return pages;
  };

  return (
    <ThemedView style={styles.container}>
      <Button
        title="Previous"
        disabled={current_page === 1}
        onPress={() => onPageChange?.(current_page - 1 || 1)}
      />

      {getPageRange().map((page, index) => (
        <Button
          key={index}
          color={current_page === page ? "black" : undefined}
          disabled={typeof page === "string"}
          title={page.toString()}
          onPress={() => onPageChange?.(page as number)}
        />
      ))}
      <Button
        title="Next"
        disabled={current_page === total_pages}
        onPress={() => {
          console.log(current_page + 1);
          onPageChange?.(current_page + 1);
        }}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
  },
});
