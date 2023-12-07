import admin from "../model/firebase.js";
import { storage } from "../model/storage.js";

const getHistories = async (req, res) => {
  try {
    const userId = req.user.uid;
    const { status, date } = req.query;

    let query = await admin
      .firestore()
      .collection("histories")
      .where("userId", "==", userId);

    if (status) {
      query = query.where("lectineStatus", "==", status);
    }

    if (date === "latest") {
      query = query.orderBy("createdAt", "desc");
    } else if (date === "oldest") {
      query = query.orderBy("createdAt", "asc");
    } else {
      query = query.orderBy("createdAt", "desc");
    }

    const historiesSnapshot = await query.get();

    const histories = [];
    historiesSnapshot.forEach((doc) => {
      const { foodName, lectineStatus, foodPhoto, createdAt } = doc.data();
      const selectedField = {
        id: doc.id,
        foodName,
        lectineStatus,
        foodPhoto,
        createdAt,
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

// const queryParams = (datas, {status, })

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
    const createdAt = new Date().toISOString();

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
      createdAt,
    });

    res.status(201).json({
      status: 201,
      message: "History created successfully",
      data: {
        userId,
        foodName,
        lectineStatus,
        foodPhoto,
        ingredients,
        createdAt,
      },
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

    const imageUrl = historyData.foodPhoto;
    console.log(imageUrl);

    await historyRef.delete();

    if (imageUrl) {
      const bucket = storage.bucket("dietin-capstone.appspot.com");
      const fileName = imageUrl.split("/").pop();
      const file = bucket.file(`food-scan/${fileName}`);
      await file.delete();
    }

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
