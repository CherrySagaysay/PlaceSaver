export type PlaceCategory =
  | "Home"
  | "School"
  | "Work"
  | "Shop"
  | "Church"
  | "Favorite"
  | "Other";

export type Place = {
  id: string;
  name: string;
  address: string;
  category: PlaceCategory;
  notes: string;
  image?: string;
}; // Every Place object in our app should have these properties.
