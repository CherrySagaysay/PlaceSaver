import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { CATEGORIES } from "../constants/categories";
import { usePlaces } from "../context/PlaceContext";


export default function EditPlaceScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    const { places, updatePlace } = usePlaces();

    const place = places.find((item) => item.id === id);

    const [name, setName] = useState(place?.name ?? "");
    const [address, setAddress] = useState(place?.address ?? "");
    const [category, setCategory] = useState(place?.category ?? CATEGORIES[0]);
    const [notes, setNotes] = useState(place?.notes ?? "");

    const handleUpdate = () => {
        if (!place) return;

        const updatedPlace = {
            ...place,
            name,
            address,
            category,
            notes,
        };

        updatePlace(updatedPlace);
        router.replace({
            pathname: "/details",
            params: { id: place.id },
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Edit Place</Text>

            <Text style={styles.subtitle}>
                Update the information about this place.
            </Text>

            {place ? (
                <>
                    <Text style={styles.label}>Place Name</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                    />

                    <Text style={styles.label}>Address</Text>
                    <TextInput
                        style={styles.input}
                        value={address}
                        onChangeText={setAddress}
                    />

                    <Text style={styles.label}>Category</Text>

                    <Picker
                        selectedValue={category}
                        onValueChange={(value) => setCategory(value)}
                        style={styles.picker}
                    >
                        {CATEGORIES.map((item) => (
                            <Picker.Item
                                key={item}
                                label={item}
                                value={item}
                            />
                        ))}
                    </Picker>

                    <Text style={styles.label}>Notes</Text>
                    <TextInput
                        style={[styles.input, styles.notesInput]}
                        value={notes}
                        onChangeText={setNotes}
                        multiline
                    />
                    <Pressable
                        style={styles.saveButton}
                        onPress={handleUpdate}
                    >
                        <Text style={styles.saveButtonText}>Save Changes</Text>
                    </Pressable>

                    <Pressable
                        style={styles.backButton}
                        onPress={() =>
                            router.replace({
                                pathname: "/details",
                                params: { id: String(id) },
                            })
                        }
                    >
                        <Text style={styles.backButtonText}>Back to Details</Text>
                    </Pressable>
                </>
            ) : (
                <Text>Place not found.</Text>
            )}
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

    subtitle: {
        fontSize: 15,
        marginBottom: 20,
    },

    label: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 6,
    },

    input: {
        width: "100%",
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 12,
        marginBottom: 15,
        fontSize: 16,
        backgroundColor: "#fff",
    },

    notesInput: {
        height: 100,
        textAlignVertical: "top",
    },

    picker: {
        borderWidth: 1,
        borderRadius: 12,
        marginBottom: 18,
        backgroundColor: "#fff",
    },

    saveButton: {
        width: "100%",
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: "#2563eb",
        alignItems: "center",
        marginTop: 5,
    },

    saveButtonText: {
        color: "#fff",
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
        marginTop: 10,
    },

    backButtonText: {
        color: "#374151",
        fontSize: 16,
        fontWeight: "bold",
    },
});