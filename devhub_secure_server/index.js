const crypto = require("crypto");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const fs = require("fs");
const cron = require("node-cron");

const app = express();
const PORT = process.env.PORT || 8081;
app.use(express.json());
app.use(cors());

const updateSecret = () => {
  const newSecret = crypto.randomBytes(64).toString("hex");
  const envPath = ".env";
  if (!fs.existsSync(envPath)) {
    console.log(".env file does not exist, creating one...");
    fs.writeFileSync(envPath, `JWT_SECRET=${newSecret}\n`, {
      encoding: "utf8",
    });
  } else {
    let envContent = fs.readFileSync(envPath, { encoding: "utf8" });
    if (envContent.match(/^JWT_SECRET=.*$/m)) {
      envContent = envContent.replace(
        /^JWT_SECRET=.*$/m,
        `JWT_SECRET=${newSecret}`
      );
    } else {
      envContent += `JWT_SECRET=${newSecret}\n`;
    }
    fs.writeFileSync(envPath, envContent, { encoding: "utf8" });
  }

  console.log("JWT secret updated.");
};
updateSecret();

cron.schedule("0 0 1 * *", updateSecret, {
  scheduled: true,
  timezone: "Australia/Melbourne",
});

function hashText(text) {
  const hash = crypto.createHash("sha256");
  hash.update(text);
  return hash.digest("hex");
}

app.post("/secure_service/hash_encryption", async (req, res) => {
  const { text } = req.body;
  try {
    let encypText = await hashText(text);
    if (encypText) {
      res.status(200).json({ encypText });
    } else {
      res.status(500).json({ error: "Failed to generate hash." });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

app.post("/secure_service/sign_token", (req, res) => {
  const user = req.body;
  const secret = process.env.JWT_SECRET;
  const token = jwt.sign({ user }, secret, { expiresIn: "1h" });
  res.status(200).json({ token });
});

app.get("/secure_service/verify_token", (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: "No token provided." });
  }
  const secret = process.env.JWT_SECRET;
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(200).json({ valid: false });
    } else {
      return res.status(200).json({ valid: true });
    }
  });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
