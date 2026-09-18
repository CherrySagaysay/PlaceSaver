//nag create ug samplePlaces.ts nga file sa sulod sa data folder with sample data para ma test

import { Place } from "../types/place";

export const samplePlaces: Place[] = [
  // Sample data gi call ang Place type gikan sa place.ts nga file
  {
    id: "1",
    name: "Northeastern Cebu Colleges",
    address: "P.G Almendras Street, Danao, Cebu",
    category: "School",
    notes: "My school",
  },
  {
    id: "2",
    name: "Sto. Tomas de Villanueva Parish Church",
    address: "Danao City, Cebu",
    category: "Church",
    notes: "This is the danao church",
  },
];
