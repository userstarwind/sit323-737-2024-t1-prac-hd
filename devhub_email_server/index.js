const sgMail = require("@sendgrid/mail");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const app = express();
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Welcome to Email Server!');
});
app.post("/email_service/send_welcome_email", async (req, res) => {
  const { receiverEmail } = req.body;
  if (!receiverEmail) {
    return res.status(400).send({ error: "Receiver email is required." });
  }
  const msg = {
    to: receiverEmail,
    from: "jiangjunkai21@gmail.com",
    subject: "Welcome to DevHub – Your Gateway to Innovation and Learning!",
    html: `We're thrilled to welcome you to DevHub, your new home for all things tech.<br><strong>Connect and Innovate</strong><br>
  At DevHub, you join a vibrant network of tech enthusiasts and professionals from around the globe. Dive into discussions, share your insights, and stay on the cutting edge of technology with like-minded peers. Your journey towards making significant tech contributions starts here!<br><br>
  <strong>Commitment to Learning</strong><br>
  Whether you're taking your first steps in coding or diving into advanced technologies, DevHub is equipped to guide you through. With our extensive resources and learning tools, we're committed to supporting your development at every stage of your tech journey.<br><br>
  <strong>Global Collaboration</strong><br>
  Get ready to collaborate on groundbreaking projects. At DevHub, we bring together diverse talents to work on innovations that pave the way for future technological advancements. Your ideas and skills are invaluable as we build these next-generation technologies together.<br><br>
  We're excited to see the contributions you will make and the milestones you will achieve.<br>Welcome aboard,<br>
  The DevHub Team`,
  };
  sgMail
    .send(msg)
    .then(() => {
      res.status(200).send({ message: "Email sent successfully!" });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send({ error: "Failed to send email." });
    });
});

const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
