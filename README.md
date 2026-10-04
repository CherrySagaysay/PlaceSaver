# Place Saver

## Project Overview

Place Saver is a mobile application developed using React Native and Expo. It allows users to save and manage important places in one organized collection.

The application is designed for users who want to remember places along with their address, category, notes, and optional photo. Users can search their saved places, organize them into categories, view details, edit information, and delete places when they are no longer needed.

## Key Features

- Add and save places
- Search saved places by name, address, category, or notes
- Organize places using categories
- Favorite category for important places
- Add optional photos to saved places
- Add notes and address information
- View detailed information about a saved place
- Edit saved places
- Delete saved places
- Persistent local storage using AsyncStorage
- Reusable PlaceCard component for displaying saved places
- Responsive interface for mobile and web

## Technologies Used

- React Native
- Expo
- TypeScript
- Expo Router
- React Native Context API
- AsyncStorage
- Expo Image Picker
- Expo Image Manipulator
- React Native Picker

## Getting Started

### Requirements

Before running the project, make sure the following are installed:

- Node.js
- npm
- Expo Go (for mobile testing)
- Git

### Installation

Clone the repository:

```bash
git clone https://github.com/CherrySagaysay/PlaceSaver.git

```
## How to Run

Navigate to the project folder

```bash
cd PlaceSaver

```
Install the project dependencies

```bash
npm install

```
Start the Expo development server 

```bash
npx expo start

```
If you need to clear the Expo cache

```bash
npx expo start -c

```
## Project Structure

PlaceSaver/
├── app/
│   ├── _layout.tsx
│   ├── index.tsx
│   ├── add.tsx
│   ├── details.tsx
│   ├── edit.tsx
│   └── categories.tsx
│
├── components/
│   └── PlaceCard.tsx
│
├── constants/
│   └── categories.ts
│
├── context/
│   └── PlaceContext.tsx
│
├── data/
│   └── samplePlaces.ts
│
├── types/
│   └── place.ts
│
├── assets/
├── App.tsx
├── app.json
└── package.json

## Folder & File Description

• app/ – Contains the main screens and routes of the application.
• components/ – Contains reusable UI components such as PlaceCard.
• constants/ – Contains shared values such as the available place categories.
• context/ – Contains the PlaceContext used for managing shared place data.
• data/ – Contains the initial sample place data.
• types/ – Contains TypeScript type definitions used by the application.
• assets/ – Contains images and other application assets.
• App.tsx – Main application entry point.
• app.json – Expo application configuration.
• package.json – Contains project dependencies and scripts.

## Application Architecture

Place Saver uses a component-based architecture with React Native, Expo Router, and React Context API.
The main screens are located inside the app folder. Expo Router automatically uses these files as application routes.
The PlaceContext manages the shared place data and provides functions for adding, updating, and deleting places.
Reusable components, such as PlaceCard, are stored separately to make the interface more organized and maintainable.

The general data flow of the application is:

User Interaction
     ↓
Screen Component
     ↓
PlaceContext
     ↓
Places State
     ↓
AsyncStorage 

The PlaceContext allows different screens to access and update the same place data without manually passing the data between every screen.

## Data Storage 

Place Saver uses AsyncStorage for local data persistence.
Saved place information is stored locally so that the user's saved places can remain available after the application is reloaded.
The application currently does not use an external database or external API. Place information is managed through the application's local storage system.




