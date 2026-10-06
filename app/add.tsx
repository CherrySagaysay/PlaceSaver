import { View, Text, TextInput, StyleSheet, Pressable, Image, Modal, ScrollView, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { CATEGORIES } from "../constants/categories";
import { useRouter } from "expo-router";
import { usePlaces } from "../context/PlaceContext";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";

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
        });

        if (!result.canceled) {
            const asset = result.assets[0];

            const optimizedImage = await ImageManipulator.manipulateAsync(
                asset.uri,
                [{ resize: { width: 800 } }],
                {
                    compress: 0.6,
                    format: ImageManipulator.SaveFormat.JPEG,
                    base64: true,
                }
            );

            if (optimizedImage.base64) {
                setImage(
                    `data:image/jpeg;base64,${optimizedImage.base64}`
                );
            }
        }
    };

    const handleSave = () => {
      if (!name.trim() || !address.trim()) {
        alert("Please enter the place name and address.");
        return;
      }
    
      const newPlace = {
        id: Date.now().toString(),
        name: name.trim(),
        address: address.trim(),
        category,
        notes: notes.trim(),
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
                <View style={styles.header}>
                    <Text style={styles.title}>Add New Place</Text>

                    <Text style={styles.subtitle}>
                        Save a place you want to remember.
                    </Text>
                </View>

                <View style={styles.formCard}>
                    <Text style={styles.label}>Place Name</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Enter place name"
                        placeholderTextColor="#94A3B8"
                        value={name}
                        onChangeText={setName}
                    />

                    <Text style={styles.label}>Address</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Enter address or location"
                        placeholderTextColor="#94A3B8"
                        value={address}
                        onChangeText={setAddress}
                    />

                    <Text style={styles.label}>Category</Text>

                    <View style={styles.pickerContainer}>
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
                    </View>

                    <Text style={styles.label}>Photo</Text>

                    <Pressable
                        style={styles.photoButton}
                        onPress={pickImage}
                    >
                        <Text style={styles.photoButtonText}>
                            Choose Photo
                        </Text>
                    </Pressable>

                    {image && (
                        <Pressable onPress={() => setShowImage(true)}>
                            <Image
                                source={{ uri: image }}
                                style={styles.previewImage}
                            />

                            <Text style={styles.previewText}>
                                Tap the photo to view it
                            </Text>
                        </Pressable>
                    )}

                    <Text style={styles.label}>Notes</Text>

                    <TextInput
                        style={[styles.input, styles.notesInput]}
                        placeholder="Add some notes about this place..."
                        placeholderTextColor="#94A3B8"
                        value={notes}
                        onChangeText={setNotes}
                        multiline
                    />
                </View>

                <Pressable
                    style={styles.saveButton}
                    onPress={handleSave}
                >
                    <Text style={styles.saveButtonText}>
                        Save Place
                    </Text>
                </Pressable>
            </ScrollView>

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
                        <Text style={styles.closeButtonText}>X</Text>
                    </Pressable>

                    {image && (
                        <Image
                            source={{ uri: image }}
                            style={styles.fullImage}
                        />
                    )}
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#F4F8FC",
    },

    container: {
        padding: 20,
        paddingBottom: 30,
    },

    header: {
        marginBottom: 18,
    },

    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#1E293B",
        marginBottom: 6,
    },

    subtitle: {
        fontSize: 15,
        color: "#64748B",
    },

    formCard: {
        width: "100%",
        padding: 18,
        borderRadius: 16,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },

    label: {
        fontSize: 15,
        fontWeight: "600",
        color: "#1E293B",
        marginBottom: 6,
    },

    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 12,
        marginBottom: 16,
        fontSize: 16,
        backgroundColor: "#F8FAFC",
        color: "#1E293B",
    },

    notesInput: {
        height: 100,
        textAlignVertical: "top",
        marginBottom: 0,
    },

    pickerContainer: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 12,
        marginBottom: 16,
        backgroundColor: "#F8FAFC",
        overflow: "hidden",
    },

    picker: {
        width: "100%",
    },

    photoButton: {
        width: "100%",
        paddingVertical: 13,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#2563EB",
        backgroundColor: "#EFF6FF",
        alignItems: "center",
        marginBottom: 12,
    },

    photoButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#2563EB",
    },

    previewImage: {
        width: "100%",
        height: 200,
        borderRadius: 12,
        marginBottom: 5,
    },

    previewText: {
        fontSize: 13,
        color: "#64748B",
        textAlign: "center",
        marginBottom: 16,
    },

    saveButton: {
        width: "100%",
        paddingVertical: 15,
        borderRadius: 14,
        backgroundColor: "#2563EB",
        alignItems: "center",
        marginTop: 16,
    },

    saveButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },

    imageModal: {
        flex: 1,
        backgroundColor: "rgba(15, 23, 42, 0.95)",
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
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
    },

    closeButtonText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#1E293B",
    },
});
