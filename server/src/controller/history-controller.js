import { getFirestore, collection, getDocs } from "firebase/firestore";
import admin from "../model/firebase.js";

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
      histories.push(doc.data());
    });

    res.status(200).json({
      status: 200,
      message: "all histories for the user",
      datas: histories,
    });
  } catch (error) {
    console.error("Error fetching histories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
try {
  const userId = req.user.uid;
  const { description, image } = req.body;

  const newHistoryRef = await admin.firestore().collection("histories").add({
    userId,
    description,
  });

  const historyId = newHistoryRef.id;

  const imageBuffer = Buffer.from(image, "base64");
  const file = admin.storage().bucket().file(fileName);

  await file.save(imageBuffer, {
    metadata: {
      contentType: "image/jpeg",
    },
  });

  const imageUrl = `https://storage.googleapis.com/${file.bucket.name}/${file.name}`;

  await newHistoryRef.update({ imageUrl });

  res.status(201).json({
    status: 201,
    message: "History created successfully",
    data: { historyId, imageUrl },
  });
} catch (error) {
  console.error("Error creating history:", error);
  res.status(500).json({ error: "Internal server error" });
}

const getHistory = async (req, res) => {
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
        message: "Unauthorized access to history",
      });
    }

    res.status(200).json({
      status: 200,
      message: "History retrieved successfully",
      data: historyData,
    });
  } catch (error) {
    console.error("Error fetching history:", error);
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
      message: "History deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting history:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default { getHistories, createHistory, getHistory, deleteHistory };
