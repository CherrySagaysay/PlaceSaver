import { View, Text, StyleSheet, Button } from "react-native";
import { CATEGORIES } from "../constants/categories";
import { useState } from "react";
import { usePlaces } from "../context/PlaceContext";
import { useRouter } from "expo-router";

export default function CategoriesScreen() {

    const { places } = usePlaces();
    const router = useRouter();

    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null,
    );

    const filteredPlaces = selectedCategory
        ? places.filter((place) => place.category === selectedCategory)
        : [];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Categories</Text>

            {CATEGORIES.map((category) => (
                <Button
                    key={category}
                    title={category}
                    onPress={() => setSelectedCategory(category)}
                />
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
                            <View key={place.id} style={styles.placeItem}>
                                <Text style={styles.placeName}>{place.name}</Text>
                                <Text>{place.address}</Text>
                                <Text>{place.category}</Text>
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
        marginBottom: 20,
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
        padding: 15,
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
    },

    placeName: {
        fontSize: 18,
        fontWeight: "bold",
    },

});