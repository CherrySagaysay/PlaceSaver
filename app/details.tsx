import { View, Text, StyleSheet, Pressable, Image, Modal, Button } from "react-native";
import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { usePlaces } from "../context/PlaceContext";

export default function DetailsScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { places, deletePlace } = usePlaces();
    const [showImage, setShowImage] = useState(false);

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
                <Pressable onPress={() => setShowImage(true)}>
                    <Image
                        source={{ uri: place.image }}
                        style={styles.placeImage}
                    />
                </Pressable>
            )}

            <Modal visible={showImage} transparent animationType="fade">
                <View style={styles.imageModal}>
                    {place?.image && (
                        <Pressable onPress={() => setShowImage(false)}>
                            <Image
                                source={{ uri: place.image }}
                                style={styles.fullImage}
                            />
                        </Pressable>
                    )}
                </View>
            </Modal>

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

            <Pressable
                style={styles.editButton}
                onPress={() =>
                    router.push({
                        pathname: "/edit",
                        params: { id: String(id) },
                    })
                }
            >
                <Text style={styles.editButtonText}>Edit Place</Text>
            </Pressable>

            <Pressable
                style={styles.deleteButton}
                onPress={handleDelete}
            >
                <Text style={styles.deleteButtonText}>Delete Place</Text>
            </Pressable>

            <Pressable
                style={styles.backButton}
                onPress={() => router.replace("/")}
            >
                <Text style={styles.backButtonText}>Back to Home</Text>
            </Pressable>
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

    imageModal: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        justifyContent: "center",
        alignItems: "center",
    },

    fullImage: {
        width: 350,
        height: 350,
        resizeMode: "contain",
    },

    editButton: {
        width: "100%",
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: "#2563eb",
        alignItems: "center",
        marginTop: 20,
        marginBottom: 10,
    },

    editButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },

    deleteButton: {
        width: "100%",
        paddingVertical: 14,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#dc2626",
        alignItems: "center",
        marginBottom: 10,
    },

    deleteButtonText: {
        color: "#dc2626",
        fontSize: 16,
        fontWeight: "bold",
    },

    backButton: {
        width: "100%",
        paddingVertical: 14,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#6b7280",
        alignItems: "center",
    },

    backButtonText: {
        color: "#374151",
        fontSize: 16,
        fontWeight: "bold",
    },

});