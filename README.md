### RingPlan Progressive Web App

This is a ReactJs project with Progressive Web App

## Getting Started

First install the project with
npm install

Run the development server:
npm run start

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## UI Structure

There is a Pages folder inside components folder which contain all the pages like dashboard, contact, conference, recents, voicemail.

These page contain other small component which is necessary to show on the respective screen.

These all the components should be shown conditionally according to the state.

All the small components which is necessary for respective page, you will find in folder like components/LoginPage, components/dashboard, components/contact, components/voicemail etc.

## API

The API call is in Effects folder.

Hard code token is passed in API to check the results

## Styling

All the colors variable and typography is defined in src/styles folder.

Please use exact color variable which is written in Figma for color and background.

## Utils Folder

API instances is defined in utils/axios file but its not correctly managed for development environment so we are doing API call by passing hard coded access token in API.

For any function, we will use utils/index file

## REDUX toolkit

For global state management we will, use Redux toolkit.
