import { View, Text, TextInput, StyleSheet, Button } from "react-native";
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
                    >
                        {CATEGORIES.map((item) => (
                            <Picker.Item key={item} label={item} value={item} />
                        ))}
                    </Picker>

                    <Text style={styles.label}>Notes</Text>
                    <TextInput
                        style={[styles.input, styles.notesInput]}
                        value={notes}
                        onChangeText={setNotes}
                        multiline
                    />
                    <Button title="Save Changes" onPress={handleUpdate} />
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

    label: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 6,
    },

    input: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        marginBottom: 18,
        fontSize: 16,
    },

    notesInput: {
        height: 100,
        textAlignVertical: "top",
    },
});