# Google Maps API 
**Task for KUMPAN - Stockholm**

This is a web application that allows users to add places to a list from a Google Map. 


**How to run it**

After cloning the project go to the terminal and navigate to the folder containing the project. When you are in the correct dir run the command bellow. This will install all the dependencies. 

`yarn install`

This project uses Firebase. To be able to work properly you need to create an account in firebase and make a db. To get started with firebase please follow the link. 

https://firebase.google.com/?gclid=EAIaIQobChMI9ryUzbuW4AIVlYKyCh0wywbdEAAYASAAEgJZr_D_BwE 

After you have that up and running create a file with a name _.env.development_ in the root folder. The content of the file should be:

`FIREBASE_API_KEY= your info from firebase

FIREBASE_AUTH_DOMAIN=your info from firebase

FIREBASE_DATABASE_URL=your info from firebase

FIREBASE_PROJECT_ID=your info from firebase

FIREBASE_STORAGE_BUCKET=your info from firebase

FIREBASE_MESSAGING_SENDER_ID=your info from firebase`

Next in the file _SpaMapContainer.js_ navigate to the bottom and replace the value for the _apiKey_ with your own which you need to obtain.
 
**Running the dev-server**

To run the dev-server type the command bellow in the terminal while you are in the dir of the project.

 `yarn dev-server`
 
 **Tools used for the development**
 
 React 
 
 Redux - For managing the state
 
 google-maps-react - Useful dependency that helps to work with Google maps in React 
 
 Maps JavaScript API - Do not copy paste! -> the examples are not for react
 
 **Guides used**

To work with the google-maps-react the following guide was followed:

https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/#adding-state-to-the-map-component
