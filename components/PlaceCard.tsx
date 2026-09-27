import {
  Pressable,
  Text,
  StyleSheet,
  Image,
  View,
} from "react-native";
import { Place } from "../types/place";

type PlaceCardProps = {
  place: Place;
  onPress: () => void;
};

export default function PlaceCard({
  place,
  onPress,
}: PlaceCardProps) {
  return (
    <Pressable
      style={styles.placeItem}
      onPress={onPress}
    >
      {place.image && (
        <Image
          source={{ uri: place.image }}
          style={styles.placeImage}
        />
      )}

      <Text style={styles.placeName}>
        {place.name}
      </Text>

      <Text style={styles.addressText}>
        {place.address}
      </Text>

      <View style={styles.categoryBadge}>
        <Text style={styles.categoryText}>
          {place.category}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  placeItem: {
    width: "100%",
    padding: 15,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
  },

  placeName: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 5,
  },

  addressText: {
    fontSize: 15,
    color: "#64748B",
    marginBottom: 10,
  },

  placeImage: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginBottom: 12,
  },

  categoryBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: "#DBEAFE",
  },

  categoryText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#2563EB",
  },
});
