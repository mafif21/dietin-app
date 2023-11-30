import admin from "../model/firebase.js";
import { storage } from "../model/storage.js";

const getHistories = async (req, res) => {
  try {
    const userId = req.user.uid;

    const historiesSnapshot = await admin
      .firestore()
      .collection("histories")
      .where("userId", "==", userId)
      .get();

    const histories = [];
    historiesSnapshot.forEach((doc) => {
      const { foodName, lectineStatus, foodPhoto } = doc.data();
      const selectedField = {
        id: doc.id,
        foodName,
        lectineStatus,
        foodPhoto,
      };
      histories.push(selectedField);
    });

    res.status(200).json({
      status: 200,
      message: "all histories scan food",
      datas: histories,
    });
  } catch (error) {
    console.error("Error fetching histories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getHistory = async (req, res) => {
  try {
    const historyId = req.params.historyId;
    const userId = req.user.uid;

    const historyRef = admin.firestore().collection("histories").doc(historyId);

    const historyDoc = await historyRef.get();

    if (!historyDoc.exists) {
      return res.status(404).json({
        status: 404,
        message: "History is not found",
      });
    }

    const historyData = historyDoc.data();

    if (historyData.userId !== userId) {
      return res.status(403).json({
        status: 403,
        message: "Unauthorized access to history",
      });
    }

    res.status(200).json({
      status: 200,
      message: "History detail data",
      data: historyData,
    });
  } catch (error) {
    console.error("Error fetching history:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createHistory = async (req, res) => {
  try {
    const userId = req.user.uid;
    const { foodName, lectineStatus, ingredients } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const bucket = storage.bucket("dietin-capstone.appspot.com");
    const foodPhoto = `food-scan/${new Date().getTime()}-${
      req.file.originalname
    }`;
    const file = bucket.file(foodPhoto);

    const stream = file.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    stream.end(req.file.buffer);
    const imageUrl = `https://storage.googleapis.com/${bucket.name}/${foodPhoto}`;

    await admin.firestore().collection("histories").add({
      userId,
      foodName,
      lectineStatus,
      foodPhoto: imageUrl,
      ingredients,
    });

    res.status(201).json({
      status: 201,
      message: "History created successfully",
      data: { userId, foodName, lectineStatus, foodPhoto, ingredients },
    });
  } catch (error) {
    console.error("Error creating history:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteHistory = async (req, res) => {
  try {
    const historyId = req.params.historyId;
    const userId = req.user.uid;

    const historyRef = admin.firestore().collection("histories").doc(historyId);

    const historyDoc = await historyRef.get();

    if (!historyDoc.exists) {
      return res.status(404).json({
        status: 404,
        message: "History not found",
      });
    }

    const historyData = historyDoc.data();

    if (historyData.userId !== userId) {
      return res.status(403).json({
        status: 403,
        message: "Unauthorized access to delete history",
      });
    }

    await historyRef.delete();

    res.status(200).json({
      status: 200,
      message: "History has been deleted",
    });
  } catch (error) {
    console.error("Error deleting history:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default { getHistories, createHistory, getHistory, deleteHistory };
