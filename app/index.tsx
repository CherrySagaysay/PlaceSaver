import { Pressable, View, Text, StyleSheet, FlatList } from "react-native";
import { usePlaces } from "../context/PlaceContext";
import { useRouter } from "expo-router";


export default function HomeScreen() {
  const { places } = usePlaces();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Place Saver</Text>
      <Text style={styles.subtitle}>
        Save and manage your favorite places.
      </Text>

      <Text>Total places: {places.length}</Text>

      <FlatList //FlatList component gi gamit para ma display ang list sa places gikan sa context
        style={{ width: "100%", marginTop: 20 }}
        data={places}
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

});
