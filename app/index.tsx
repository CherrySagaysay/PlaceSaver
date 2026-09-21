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

      <Text>Total places: {places.length}</Text>

      <Button
        title="Add New Place"
        onPress={() => router.push("/add")}
      />

      <Button
        title="View Categories"
        onPress={() => router.push("/categories")}
      />

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
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    marginTop: 8,
    textAlign: "center",
  },

  placeItem: {
    width: "100%",
    padding: 15,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10,
  },

  placeName: {
    fontSize: 18,
    fontWeight: "bold",
  },

  placeImage: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
  },

  searchInput: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginTop: 15,
    marginBottom: 10,
    fontSize: 16,
  },

});
