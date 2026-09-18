import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { CATEGORIES } from "../constants/categories";
import { useRouter } from "expo-router";
import { usePlaces } from "../context/PlaceContext";

export default function AddPlaceScreen() {

    const router = useRouter();
    const { addPlace } = usePlaces();

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [notes, setNotes] = useState("");
    const [category, setCategory] = useState(CATEGORIES[0]);

    const handleSave = () => {
        const newPlace = {
            id: Date.now().toString(),
            name,
            address,
            category,
            notes,
        };

        addPlace(newPlace);
        router.replace({ pathname: "/" });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add New Place</Text>

            <Text style={styles.label}>Place Name</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter place name"
                value={name}
                onChangeText={setName}
            />

            <Text style={styles.label}>Address</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter address or location"
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
                    <Picker.Item key={item} label={item} value={item} />
                ))}
            </Picker>

            <Text style={styles.label}>Notes</Text>
            <TextInput
                style={[styles.input, styles.notesInput]}
                placeholder="Optional notes"
                value={notes}
                onChangeText={setNotes}
                multiline
            />

            <Button title="Save Place" onPress={handleSave} />


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

    picker: {
        borderWidth: 1,
        marginBottom: 18,
    },


});