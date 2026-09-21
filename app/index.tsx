import { Pressable, Text, StyleSheet, FlatList, Image, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { usePlaces } from "../context/PlaceContext";
import { useRouter } from "expo-router";
import { useState } from "react";


export default function HomeScreen() {
  const { places } = usePlaces();
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filteredPlaces = places.filter((place) => {
    const searchText = search.toLowerCase();

    return (
      place.name.toLowerCase().includes(searchText) ||
      place.address.toLowerCase().includes(searchText) ||
      place.category.toLowerCase().includes(searchText) ||
      place.notes.toLowerCase().includes(searchText)
    );
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.content}
        data={filteredPlaces}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <Text style={styles.title}>Place Saver</Text>

              <Text style={styles.subtitle}>
                Save and manage your favorite places.
              </Text>
            </View>

            <TextInput
              style={styles.searchInput}
              placeholder="Search places..."
              placeholderTextColor="#94A3B8"
              value={search}
              onChangeText={setSearch}
            />

            <View style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>Your Saved Places</Text>

              <Text style={styles.totalText}>{places.length}</Text>

              <Text style={styles.summaryText}>
                places saved in your collection
              </Text>
            </View>

            <Pressable
              style={styles.primaryButton}
              onPress={() => router.push("/add")}
            >
              <Text style={styles.buttonText}>+ Add New Place</Text>
            </Pressable>

            <Pressable
              style={styles.secondaryButton}
              onPress={() => router.push("/categories")}
            >
              <Text style={styles.secondaryButtonText}>
                View Categories
              </Text>
            </Pressable>

            <Text style={styles.sectionTitle}>Saved Places</Text>
          </>
        }
        renderItem={({ item }) => (
          <Pressable
            style={styles.placeItem}
            onPress={() =>
              router.push({
                pathname: "/details",
                params: { id: item.id },
              })
            }
          >
            {item.image && (
              <Image
                source={{ uri: item.image }}
                style={styles.placeImage}
              />
            )}

            <Text style={styles.placeName}>{item.name}</Text>

            <Text style={styles.addressText}>{item.address}</Text>

            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{item.category}</Text>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>No places found</Text>

            <Text style={styles.emptyText}>
              Try searching for another place or add a new one.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F4F8FC",
  },

  list: {
    width: "100%",
    backgroundColor: "#F4F8FC",
  },

  content: {
    padding: 20,
    paddingBottom: 30,
  },

  header: {
    marginBottom: 18,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 16,
    color: "#64748B",
  },

  searchInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 14,
    paddingHorizontal: 15,
    paddingVertical: 13,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: "#FFFFFF",
    color: "#1E293B",
  },

  summaryCard: {
    width: "100%",
    padding: 18,
    borderRadius: 16,
    backgroundColor: "#DBEAFE",
    marginBottom: 15,
  },

  summaryLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1E40AF",
    marginBottom: 5,
  },

  totalText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2563EB",
  },

  summaryText: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 2,
  },

  primaryButton: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: "#2563EB",
    alignItems: "center",
    marginBottom: 10,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  secondaryButton: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#2563EB",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    marginBottom: 22,
  },

  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2563EB",
  },

  sectionTitle: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 5,
  },

  placeItem: {
    width: "100%",
    padding: 15,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
  },

  placeName: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 5,
  },

  addressText: {
    fontSize: 15,
    color: "#64748B",
    marginBottom: 10,
  },

  placeImage: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginBottom: 12,
  },

  categoryBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: "#DBEAFE",
  },

  categoryText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#2563EB",
  },

  emptyContainer: {
    alignItems: "center",
    paddingVertical: 30,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 5,
  },

  emptyText: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
  },
});
