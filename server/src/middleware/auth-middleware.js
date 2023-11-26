// Import Firebase Admin initialized instance to middleware
import firebase from "../model/firebase.js";

export const isAuthenticated = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "unauthorized: invalid credentials" });
  }

  const idToken = authHeader.split("Bearer ")[1];

  firebase
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      req.user = decodedToken;
      next();
    })
    .catch((error) => {
      console.error("Error verifying Firebase ID token:", error);
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    });
};
