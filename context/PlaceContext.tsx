//nag create ug PlaceContext.tsx nga file sa sulod sa context folder
//
import { createContext, useContext, useState, ReactNode } from "react";
import { Place } from "../types/place";
import { samplePlaces } from "../data/samplePlaces";

type PlaceContextType = {
  places: Place[];
  addPlace: (place: Place) => void;
  deletePlace: (id: string) => void;
};

const PlaceContext = createContext<PlaceContextType | undefined>(undefined);

export function PlaceProvider({ children }: { children: ReactNode }) {
  const [places, setPlaces] = useState<Place[]>(samplePlaces);

  const addPlace = (place: Place) => {
    setPlaces((currentPlaces) =>
      [...currentPlaces, place]
    ); //nag gamit ug spread operator para ma add ang bag-ong place sa existing list sa places
  };

  const deletePlace = (id: string) => {
    setPlaces((currentPlaces) =>
      currentPlaces.filter((place) => place.id !== id)
    ); //nag gamit ug filter method para ma remove ang place nga naay specific id gikan sa list sa places
  };

  return (
    <PlaceContext.Provider value={{ places, addPlace, deletePlace }}>
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
