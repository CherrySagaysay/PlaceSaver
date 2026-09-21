import { View, Text, StyleSheet, Button, Image } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { usePlaces } from "../context/PlaceContext";

export default function DetailsScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { places, deletePlace } = usePlaces();

    const place = places.find((item) => item.id === id);
    const handleDelete = () => {
        if (place) {
            deletePlace(place.id);
            router.replace("/");
        }
    };

    return (
        <View style={styles.container}>

            {place?.image && (
                <Image
                    source={{ uri: place.image }}
                    style={styles.placeImage}
                />
            )}

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

            <Button
                title="Edit Place"
                onPress={() =>
                    router.push({
                        pathname: "/edit",
                        params: { id: String(id) },
                    })
                }
            />
            <Button title="Delete Place" onPress={handleDelete} />
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

    placeImage: {
        width: "100%",
        height: 200,
        borderRadius: 10,
        marginBottom: 15,
    },

});