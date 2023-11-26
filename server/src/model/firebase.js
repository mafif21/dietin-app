import dotenv from "dotenv";
dotenv.config();
import firebase from "firebase-admin";
import serviceAccount from "../../key.json" assert { type: "json" };

export default firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});
