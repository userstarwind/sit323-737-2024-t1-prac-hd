const express = require("express");
const cors = require("cors");
require('dotenv').config();
const app = express();
const { connectDB } = require("./db");
const { ObjectId } = require("mongodb");
const PORT = process.env.PORT || 8080;
const secureServerURL =
  process.env.SECURE_SERVER_API_URL || "http://localhost:8081";
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

let db;
connectDB().then((database) => {
  db = database;
});
app.get('/', (req, res) => {
  res.send('Welcome to User Server!');
});
app.post("/user_service/create_new_user", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const userExists = await db.collection("users").findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    const response = await fetch(`${secureServerURL}/secure_service/hash_encryption`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: password,
      }),
    });

    const { encypText } = await response.json();
    let hashedPassword = encypText;
    const newUser = await db.collection("users").insertOne({
      firstName,
      lastName,
      email,
      hashedPassword,
    });
    res.status(201).json(newUser);
  } catch (e) {
    res.status(500).json({ error: "An unexpected error occurred." });
    console.log(e);
  }
});

app.post("/user_service/login_with_email", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const response = await fetch(`${secureServerURL}/secure_service/hash_encryption`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: password,
      }),
    });

    const { encypText } = await response.json();
    let hashedInputPassword = encypText;
    if (hashedInputPassword !== user.hashedPassword) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const jwtResponse = await fetch(`${secureServerURL}/secure_service/sign_token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user._id,
      }),
    });

    if (!jwtResponse.ok) {
      throw new Error("Failed to sign JWT");
    }

    const { token } = await jwtResponse.json();

    res.status(200).json({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      token,
    });
  } catch (e) {
    res.status(500).json({ error: e });
    console.log(e);
  }
});

app.post("/user_service/publish_new_event", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "No token provided." });
    }
    const authResponse = await fetch(`${secureServerURL}/secure_service/verify_token`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!authResponse.ok) {
      throw new Error("Failed to verify user identity, please login again");
    }
    const newEvent = await db.collection("events").insertOne(req.body);
    res.status(201).json(newEvent);
  } catch (e) {
    res.status(500).json({ error: e });
    console.log(e);
  }
});

app.get("/user_service/fetch_events", async (req, res) => {
  try {
    const documents = await db.collection("events").find({}).toArray();
    res.status(200).json(documents);
  } catch (e) {
    res.status(500).json({ error: "An unexpected error occurred." });
    console.log(e);
  }
});

app.post("/user_service/delete_event", async (req, res) => {
  try {
    const { eventID } = req.body;
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "No token provided." });
    }
    const authResponse = await fetch(`${secureServerURL}/secure_service/verify_token`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!authResponse.ok) {
      throw new Error("Failed to verify user identity, please login again");
    }
    const response = await db
      .collection("events")
      .deleteOne({ _id: new ObjectId(eventID) });
    res.status(201).json(response);
  } catch (e) {
    res.status(500).json({ error: e });
    console.log(e);
  }
});

app.post("/user_service/add_participant", async (req, res) => {
  try {
    const { userID, eventID } = req.body;
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "No token provided." });
    }
    const authResponse = await fetch(`${secureServerURL}/secure_service/verify_token`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!authResponse.ok) {
      throw new Error("Failed to verify user identity, please login again");
    }
    const response = await db
      .collection("events")
      .updateOne(
        { _id: new ObjectId(eventID) },
        { $push: { participantIDs: userID }, $inc: { participantNumber: 1 } }
      );
    res.status(201).json(response);
  } catch (e) {
    res.status(500).json({ error: e });
    console.log(e);
  }
});

app.post("/user_service/remove_participant", async (req, res) => {
  try {
    const { userID, eventID } = req.body;
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "No token provided." });
    }
    const authResponse = await fetch(`${secureServerURL}/secure_service/verify_token`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!authResponse.ok) {
      throw new Error("Failed to verify user identity, please login again");
    }
    const response = await db
      .collection("events")
      .updateOne(
        { _id: new ObjectId(eventID) },
        { $pull: { participantIDs: userID }, $inc: { participantNumber: -1 } }
      );
    res.status(201).json(response);
  } catch (e) {
    res.status(500).json({ error: e });
    console.log(e);
  }
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
