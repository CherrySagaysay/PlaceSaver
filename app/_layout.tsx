// Root layout component for the Expo Router
import { Stack } from "expo-router";
import { PlaceProvider } from "../context/PlaceContext";

export default function RootLayout() {
  return (
    <PlaceProvider>
      <Stack />
    </PlaceProvider>
  );
}