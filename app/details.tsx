import { View, Text, StyleSheet, Pressable, Image, Modal, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                contentContainerStyle={styles.container}
            >
                {place?.image && (
                    <Pressable
                        onPress={() => setShowImage(true)}
                    >
                        <Image
                            source={{ uri: place.image }}
                            style={styles.placeImage}
                        />
                    </Pressable>
                )}

                <Modal
                    visible={showImage}
                    transparent
                    animationType="fade"
                >
                    <View style={styles.imageModal}>
                        <Pressable
                            style={styles.closeButton}
                            onPress={() => setShowImage(false)}
                        >
                            <Text style={styles.closeButtonText}>
                                X
                            </Text>
                        </Pressable>

                        {place?.image && (
                            <Image
                                source={{ uri: place.image }}
                                style={styles.fullImage}
                            />
                        )}
                    </View>
                </Modal>

                <Text style={styles.title}>Place Details</Text>

                {place ? (
                    <>
                        <Text style={styles.name}>
                            {place.name}
                        </Text>

                        <Text style={styles.infoLabel}>
                            Address
                        </Text>

                        <Text style={styles.infoText}>
                            {place.address}
                        </Text>

                        <Text style={styles.infoLabel}>
                            Category
                        </Text>

                        <Text style={styles.infoText}>
                            {place.category}
                        </Text>

                        <Text style={styles.infoLabel}>
                            Notes
                        </Text>

                        <Text style={styles.infoText}>
                            {place.notes || "No notes added."}
                        </Text>
                    </>
                ) : (
                    <Text>Place not found.</Text>
                )}

                {place && (
                    <>
                        <Pressable
                            style={styles.editButton}
                            onPress={() =>
                                router.push({
                                    pathname: "/edit",
                                    params: {
                                        id: String(id),
                                    },
                                })
                            }
                        >
                            <Text style={styles.editButtonText}>
                                Edit Place
                            </Text>
                        </Pressable>

                        <Pressable
                            style={styles.deleteButton}
                            onPress={handleDelete}
                        >
                            <Text style={styles.deleteButtonText}>
                                Delete Place
                            </Text>
                        </Pressable>

                        <Pressable
                            style={styles.backButton}
                            onPress={() =>
                                router.replace("/")
                            }
                        >
                            <Text style={styles.backButtonText}>
                                Back to Home
                            </Text>
                        </Pressable>
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },

    container: {
        padding: 20,
        paddingBottom: 30,
    },

    placeImage: {
        width: "100%",
        height: 200,
        borderRadius: 12,
        marginBottom: 20,
    },

    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 20,
    },

    name: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
    },

    infoLabel: {
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 4,
    },

    infoText: {
        fontSize: 16,
        marginBottom: 18,
    },

    editButton: {
        width: "100%",
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: "#2563eb",
        alignItems: "center",
        marginTop: 10,
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

    closeButton: {
        position: "absolute",
        top: 50,
        right: 20,
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
    },

    closeButtonText: {
        fontSize: 20,
        fontWeight: "bold",
    },
});