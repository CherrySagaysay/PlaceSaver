import { View, Text, TextInput, StyleSheet, Pressable, Image, Modal, ScrollView, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { CATEGORIES } from "../constants/categories";
import { useRouter } from "expo-router";
import { usePlaces } from "../context/PlaceContext";
import * as ImagePicker from "expo-image-picker";

export default function AddPlaceScreen() {
    const router = useRouter();
    const { addPlace } = usePlaces();

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [notes, setNotes] = useState("");
    const [category, setCategory] = useState(CATEGORIES[0]);
    const [image, setImage] = useState<string | undefined>();
    const [showImage, setShowImage] = useState(false);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
            base64: true,
        });

        if (!result.canceled) {
            const asset = result.assets[0];

            if (asset.base64) {
                const mimeType = asset.mimeType || "image/jpeg";
                setImage(`data:${mimeType};base64,${asset.base64}`);
            }
        }
    };

    const handleSave = () => {
        const newPlace = {
            id: Date.now().toString(),
            name,
            address,
            category,
            notes,
            image,
        };

        addPlace(newPlace);
        router.replace({ pathname: "/" });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
            >
                <Text style={styles.title}>Add New Place</Text>

                <Text style={styles.subtitle}>
                    Save a place you want to remember.
                </Text>

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
                        <Picker.Item
                            key={item}
                            label={item}
                            value={item}
                        />
                    ))}
                </Picker>

                <Pressable
                    style={styles.photoButton}
                    onPress={pickImage}
                >
                    <Text style={styles.photoButtonText}>
                        Choose Photo
                    </Text>
                </Pressable>

                {image && (
                    <Pressable
                        onPress={() => setShowImage(true)}
                    >
                        <Image
                            source={{ uri: image }}
                            style={styles.previewImage}
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

                        {image && (
                            <Image
                                source={{ uri: image }}
                                style={styles.fullImage}
                            />
                        )}
                    </View>
                </Modal>

                <Text style={styles.label}>Notes</Text>

                <TextInput
                    style={[styles.input, styles.notesInput]}
                    placeholder="Add some notes about this place..."
                    value={notes}
                    onChangeText={setNotes}
                    multiline
                />

                <Pressable
                    style={styles.saveButton}
                    onPress={handleSave}
                >
                    <Text style={styles.saveButtonText}>
                        Save Place
                    </Text>
                </Pressable>
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

    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 8,
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

    photoButton: {
        width: "100%",
        paddingVertical: 14,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#2563eb",
        alignItems: "center",
        marginBottom: 10,
    },

    photoButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#2563eb",
    },

    previewImage: {
        width: "100%",
        height: 200,
        borderRadius: 12,
        marginTop: 10,
        marginBottom: 18,
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