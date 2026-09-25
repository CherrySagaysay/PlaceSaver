import { View, Text, StyleSheet, Pressable, ScrollView, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CATEGORIES } from "../constants/categories";
import { useState } from "react";
import { usePlaces } from "../context/PlaceContext";

export default function CategoriesScreen() {
  const { places } = usePlaces();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    null,
  );

  const filteredPlaces = selectedCategory
    ? places.filter(
        (place) => place.category === selectedCategory,
      )
    : [];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Categories</Text>

        <Text style={styles.subtitle}>
          Choose a category to view your saved places.
        </Text>

        <View style={styles.categoryCard}>
          <Text style={styles.categoryTitle}>
            Place Categories
          </Text>

          <Text style={styles.categoryDescription}>
            Select a category below to see your saved places.
          </Text>

          <View style={styles.categoryList}>
            {CATEGORIES.map((category) => (
              <Pressable
                key={category}
                style={[
                  styles.categoryButton,
                  selectedCategory === category &&
                    styles.selectedCategoryButton,
                ]}
                onPress={() =>
                  setSelectedCategory(category)
                }
              >
                <Text
                  style={[
                    styles.categoryButtonText,
                    selectedCategory === category &&
                      styles.selectedCategoryButtonText,
                  ]}
                >
                  {category}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {selectedCategory && (
          <View style={styles.results}>
            <Text style={styles.resultTitle}>
              {selectedCategory} Places
            </Text>

            {filteredPlaces.length === 0 ? (
              <View style={styles.emptyCard}>
                <Text style={styles.emptyTitle}>
                  No places found
                </Text>

                <Text style={styles.emptyText}>
                  No places have been saved in this category yet.
                </Text>
              </View>
            ) : (
              filteredPlaces.map((place) => (
                <View
                  key={place.id}
                  style={styles.placeItem}
                >
                  <Text style={styles.placeName}>
                    {place.name}
                  </Text>

                  <Text style={styles.placeAddress}>
                    {place.address}
                  </Text>

                  <View style={styles.categoryBadge}>
                    <Text style={styles.placeCategory}>
                      {place.category}
                    </Text>
                  </View>
                </View>
              ))
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F4F8FC",
  },

  container: {
    padding: 20,
    paddingBottom: 30,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 15,
    color: "#64748B",
    marginBottom: 18,
  },

  categoryCard: {
    width: "100%",
    padding: 18,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  categoryTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 5,
  },

  categoryDescription: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 16,
  },

  categoryList: {
    width: "100%",
  },

  categoryButton: {
    width: "100%",
    paddingVertical: 13,
    paddingHorizontal: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#BFDBFE",
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    marginBottom: 10,
  },

  categoryButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2563EB",
  },

  selectedCategoryButton: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },

  selectedCategoryButtonText: {
    color: "#FFFFFF",
  },

  results: {
    marginTop: 22,
  },

  resultTitle: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 10,
  },

  placeItem: {
    width: "100%",
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 16,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
  },

  placeName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 5,
  },

  placeAddress: {
    fontSize: 15,
    color: "#64748B",
    marginBottom: 10,
  },

  categoryBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: "#DBEAFE",
  },

  placeCategory: {
    fontSize: 13,
    fontWeight: "600",
    color: "#2563EB",
  },

  emptyCard: {
    width: "100%",
    padding: 18,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 5,
  },

  emptyText: {
    fontSize: 14,
    color: "#64748B",
    lineHeight: 20,
  },
});
