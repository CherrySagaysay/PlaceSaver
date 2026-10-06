import {
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
  const [category, setCategory] = useState(
    place?.category ?? CATEGORIES[0],
  );
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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Edit Place</Text>

        <Text style={styles.subtitle}>
          Update the information about this place.
        </Text>

        {place ? (
          <>
            <View style={styles.formCard}>
              <Text style={styles.label}>Place Name</Text>

              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter place name"
                placeholderTextColor="#94A3B8"
              />

              <Text style={styles.label}>Address</Text>

              <TextInput
                style={styles.input}
                value={address}
                onChangeText={setAddress}
                placeholder="Enter address or location"
                placeholderTextColor="#94A3B8"
              />

              <Text style={styles.label}>Category</Text>

              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={category}
                  onValueChange={(value) =>
                    setCategory(value)
                  }
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

              <Text style={styles.label}>Notes</Text>

              <TextInput
                style={[styles.input, styles.notesInput]}
                value={notes}
                onChangeText={setNotes}
                placeholder="Add some notes about this place..."
                placeholderTextColor="#94A3B8"
                multiline
              />
            </View>

            <Pressable
              style={styles.saveButton}
              onPress={handleUpdate}
            >
              <Text style={styles.saveButtonText}>
                Save Changes
              </Text>
            </Pressable>

            <Pressable
              style={styles.backButton}
              onPress={() =>
                router.replace({
                  pathname: "/details",
                  params: {
                    id: String(id),
                  },
                })
              }
            >
              <Text style={styles.backButtonText}>
                Back to Details
              </Text>
            </Pressable>
          </>
        ) : (
          <View style={styles.notFoundCard}>
            <Text style={styles.notFoundTitle}>
              Place not found
            </Text>

            <Text style={styles.notFoundText}>
              This place may have been deleted or is no longer
              available.
            </Text>
          </View>
        )}
      </ScrollView>
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

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 15,
    color: "#64748B",
    marginBottom: 18,
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

  saveButton: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: 14,
    backgroundColor: "#2563EB",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 10,
  },

  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  backButton: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },

  backButtonText: {
    color: "#475569",
    fontSize: 16,
    fontWeight: "bold",
  },

  notFoundCard: {
    width: "100%",
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  notFoundTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 6,
  },

  notFoundText: {
    fontSize: 14,
    color: "#64748B",
    lineHeight: 20,
  },
});
