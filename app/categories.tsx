import { View, Text, StyleSheet, Pressable, } from "react-native";
import { CATEGORIES } from "../constants/categories";
import { useState } from "react";
import { usePlaces } from "../context/PlaceContext";

export default function CategoriesScreen() {
    const { places } = usePlaces();

    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null,
    );

    const filteredPlaces = selectedCategory
        ? places.filter((place) => place.category === selectedCategory)
        : [];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Categories</Text>

            <Text style={styles.subtitle}>
                Choose a category to view your saved places.
            </Text>

            {CATEGORIES.map((category) => (
                <Pressable
                    key={category}
                    style={[
                        styles.categoryButton,
                        selectedCategory === category &&
                        styles.selectedCategoryButton,
                    ]}
                    onPress={() => setSelectedCategory(category)}
                >
                    <Text
                        style={[
                            styles.categoryButtonText,
                            selectedCategory === category &&
                            styles.selectedCategoryButtonText,
                        ]}
                    >
                        {category}
                    </Text>
                </Pressable>
            ))}

            {selectedCategory && (
                <View style={styles.results}>
                    <Text style={styles.resultTitle}>
                        {selectedCategory} Places
                    </Text>

                    {filteredPlaces.length === 0 ? (
                        <Text>No places saved in this category.</Text>
                    ) : (
                        filteredPlaces.map((place) => (
                            <View
                                key={place.id}
                                style={styles.placeItem}
                            >
                                <Text style={styles.placeName}>
                                    {place.name}
                                </Text>

                                <Text style={styles.placeAddress}>
                                    {place.address}
                                </Text>

                                <Text style={styles.placeCategory}>
                                    {place.category}
                                </Text>
                            </View>
                        ))
                    )}
                </View>
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
        marginBottom: 8,
    },

    subtitle: {
        fontSize: 15,
        marginBottom: 20,
    },

    categoryButton: {
        width: "100%",
        paddingVertical: 14,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#2563eb",
        alignItems: "center",
        marginBottom: 10,
    },

    categoryButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#2563eb",
    },

    selectedCategoryButton: {
        backgroundColor: "#2563eb",
    },

    selectedCategoryButtonText: {
        color: "#fff",
    },

    results: {
        marginTop: 25,
    },

    resultTitle: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
    },

    placeItem: {
        width: "100%",
        padding: 15,
        borderWidth: 1,
        borderRadius: 12,
        marginBottom: 10,
        backgroundColor: "#fff",
    },

    placeName: {
        fontSize: 18,
        fontWeight: "bold",
    },

    placeAddress: {
        fontSize: 15,
        marginTop: 5,
        marginBottom: 6,
    },

    placeCategory: {
        fontSize: 14,
        fontWeight: "600",
    },
});