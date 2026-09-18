//nag create ug PlaceContext.tsx nga file sa sulod sa context folder
//
import { createContext, useContext, useState, ReactNode } from "react";
import { Place } from "../types/place";
import { samplePlaces } from "../data/samplePlaces";

type PlaceContextType = {
  places: Place[];
  addPlace: (place: Place) => void;
};

const PlaceContext = createContext<PlaceContextType | undefined>(undefined);

export function PlaceProvider({ children }: { children: ReactNode }) {
  const [places, setPlaces] = useState<Place[]>(samplePlaces);

  const addPlace = (place: Place) => {
    setPlaces((currentPlaces) => [...currentPlaces, place]);
  };

  return (
    <PlaceContext.Provider value={{ places, addPlace }}>
      {children}
    </PlaceContext.Provider>
  );
}

// This custom hook allows components to access the PlaceContext easily.
export function usePlaces() {
  const context = useContext(PlaceContext);

  if (!context) {
    throw new Error("usePlaces must be used inside PlaceProvider");
  }

  return context;
}
