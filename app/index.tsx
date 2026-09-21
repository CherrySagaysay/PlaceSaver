import { Pressable, View, Text, StyleSheet, FlatList, Image, Button, TextInput } from "react-native";
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
    <View style={styles.container}>
      <Text style={styles.title}>Place Saver</Text>
      <Text style={styles.subtitle}>
        Save and manage your favorite places.
      </Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search places..."
        value={search}
        onChangeText={setSearch}
      />

      <Text style={styles.totalText}>
        Total places: {places.length}
      </Text>

      <Pressable
        style={styles.primaryButton}
        onPress={() => router.push("/add")}
      >
        <Text style={styles.buttonText}>Add New Place</Text>
      </Pressable>

      <Pressable
        style={styles.secondaryButton}
        onPress={() => router.push("/categories")}
      >
        <Text style={styles.secondaryButtonText}>View Categories</Text>
      </Pressable>

      <FlatList //FlatList component gi gamit para ma display ang list sa places gikan sa context
        style={{ width: "100%", marginTop: 20 }}
        data={filteredPlaces}
        keyExtractor={(item) => item.id}
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
            <Text>{item.address}</Text>
            <Text>{item.category}</Text>
          </Pressable>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: "center",
  },

  placeItem: {
    width: "100%",
    padding: 15,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: "#fff",
  },

  placeName: {
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 5,
  },

  placeImage: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginBottom: 12,
  },

  searchInput: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginTop: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#fff",
  },

  totalText: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },

  primaryButton: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#2563eb",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 10,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  secondaryButton: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2563eb",
    alignItems: "center",
    marginBottom: 15,
  },

  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2563eb",
  },

});
