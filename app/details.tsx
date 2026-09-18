import { View, Text, StyleSheet, Button } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { usePlaces } from "../context/PlaceContext";

export default function DetailsScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { places } = usePlaces();

    const place = places.find((item) => item.id === id);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Place Details</Text>

            {place ? (
                <>
                    <Text style={styles.name}>{place.name}</Text>
                    <Text>Address: {place.address}</Text>
                    <Text>Category: {place.category}</Text>
                    <Text>Notes: {place.notes}</Text>
                </>
            ) : (
                <Text>Place not found.</Text>
            )}

            <Button title="Back to Home" onPress={() => router.replace("/")} />
        </View>
    );


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },

    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 25,
    },

    name: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
    },
});