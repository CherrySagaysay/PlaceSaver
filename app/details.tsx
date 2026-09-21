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
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Place Details</Text>

        <Text style={styles.subtitle}>
          View information about your saved place.
        </Text>

        {place ? (
          <View style={styles.card}>
            {place.image && (
              <Pressable onPress={() => setShowImage(true)}>
                <Image
                  source={{ uri: place.image }}
                  style={styles.placeImage}
                />

                <Text style={styles.imageHint}>
                  Tap the photo to view it
                </Text>
              </Pressable>
            )}

            <Text style={styles.name}>{place.name}</Text>

            <View style={styles.infoSection}>
              <Text style={styles.infoLabel}>Address</Text>

              <Text style={styles.infoText}>{place.address}</Text>
            </View>

            <View style={styles.infoSection}>
              <Text style={styles.infoLabel}>Category</Text>

              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>
                  {place.category}
                </Text>
              </View>
            </View>

            <View style={styles.infoSection}>
              <Text style={styles.infoLabel}>Notes</Text>

              <Text style={styles.infoText}>
                {place.notes || "No notes added."}
              </Text>
            </View>
          </View>
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

        {place && (
          <View style={styles.actions}>
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
              onPress={() => router.replace("/")}
            >
              <Text style={styles.backButtonText}>
                Back to Home
              </Text>
            </Pressable>
          </View>
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
              <Text style={styles.closeButtonText}>X</Text>
            </Pressable>

            {place?.image && (
              <Image
                source={{ uri: place.image }}
                style={styles.fullImage}
              />
            )}
          </View>
        </Modal>
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

  card: {
    width: "100%",
    padding: 18,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  placeImage: {
    width: "100%",
    height: 210,
    borderRadius: 12,
    marginBottom: 6,
  },

  imageHint: {
    fontSize: 13,
    color: "#64748B",
    textAlign: "center",
    marginBottom: 16,
  },

  name: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 20,
  },

  infoSection: {
    marginBottom: 18,
  },

  infoLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#64748B",
    marginBottom: 5,
  },

  infoText: {
    fontSize: 16,
    color: "#1E293B",
    lineHeight: 23,
  },

  categoryBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#DBEAFE",
  },

  categoryText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2563EB",
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

  actions: {
    marginTop: 16,
  },

  editButton: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: 14,
    backgroundColor: "#2563EB",
    alignItems: "center",
    marginBottom: 10,
  },

  editButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  deleteButton: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#DC2626",
    backgroundColor: "#FEF2F2",
    alignItems: "center",
    marginBottom: 10,
  },

  deleteButtonText: {
    color: "#DC2626",
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
