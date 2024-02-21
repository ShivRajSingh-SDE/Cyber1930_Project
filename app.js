const express = require("express");
const User = require("./mongo");
const cors = require("cors");

const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
const formEntrySchema = new mongoose.Schema({
  name: String,
  mobileNumber: String,
  position: String,
  message: String,
  date: String,
  address: String,

  status: {
    type: String,
    default: "Pending",
  },

  status2: {
    type: String,
    default: "Didn't Started",
  },

  description: String,
  description2: String,
  descriptionNew: String,

  id: String,
  attachment: String,
  attachmentType: { type: String, default: "image" },
  image: {
    data: Buffer,
    contentType: String,
  },
});

const FormEntry = mongoose.model("FormEntry", formEntrySchema);

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post(
  "/submit-form",
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "image", maxCount: 1 }, // Use "image" as the field name
  ]),
  async (req, res) => {
    const { id, name, date, address, mobileNumber, email, position, message } =
      req.body;

    try {
      let attachmentData = null;
      let imageData = null;

      // Handle attachment
      if (req.files && req.files.file) {
        attachmentData = req.files.file[0].buffer.toString("base64");
      }

      // Handle image
      if (req.files && req.files.image) {
        imageData = {
          data: req.files.image[0].buffer,
          contentType: req.files.image[0].mimetype,
        };
      }

      await FormEntry.create({
        id,
        name,
        date,
        address,
        mobileNumber,
        email,
        position,
        message,
        attachment: attachmentData,
        image: imageData,
      });

      const tokenID = uuidv4(); // Generate a unique token ID

      res
        .status(200)
        .json({ message: "Form submitted successfully", id, tokenID });
    } catch (error) {
      console.error("Error submitting form:", error.message);
      res.status(500).json({ error: "An error occurred" });
    }
  }
);

// form user data map
app.get("/form-entries/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const formEntry = await FormEntry.findOne({ id });

    if (!formEntry) {
      return res.status(404).json({ error: "Form entry not found" });
    }

    res.status(200).json(formEntry);
  } catch (error) {
    console.error("Error fetching form entry:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/form-entries", async (req, res) => {
  try {
    const formEntries = await FormEntry.find();
    res.status(200).json(formEntries);
  } catch (error) {
    console.error("Error fetching form entries:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Update form entry status and description
app.put("/form-entries/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status, description, description2, status2, descriptionNew } =
      req.body;

    // Update the status, description, and description2 in MongoDB
    const updatedEntry = await FormEntry.findByIdAndUpdate(
      id,
      { $set: { status, description, description2, status2, descriptionNew } },
      { new: true }
    );

    if (updatedEntry) {
      res.status(200).json(updatedEntry);
    } else {
      res.status(404).json({ error: "Form entry not found" });
    }
  } catch (error) {
    console.error(
      "Error updating status, description, and description2:",
      error
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// post
app.get("/form-entries/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find the form entry by ID
    const formEntry = await FormEntry.findById(id);

    if (!formEntry) {
      return res.status(404).json({ error: "Form entry not found" });
    }

    // Respond with the found form entry
    res.status(200).json(formEntry);
  } catch (error) {
    console.error("Error fetching form entry:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// user find
app.get("/users/:email", async (req, res) => {
  const userEmail = req.params.email;

  try {
    const user = await User.findOne({ email: userEmail });

    if (user) {
      res.json({ roleadmin: user.roleadmin });
    } else {
      res.status(404).json({ error: "User not found" });
      console.log("User not found");
    }
  } catch (e) {
    res.status(500).json({ error: "An error occurred" });
    console.error("Error fetching user data:", e);
  }
});

// login
app.post("/login", async (req, res) => {
  const { email, password, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      if (
        user.resetPasswordOTP &&
        user.resetPasswordOTP.trim() === otp.trim()
      ) {
        // Clear the OTP after successful verification
        user.resetPasswordOTP = null;
        await user.save();
        res.json("exist");
      } else {
        res.status(400).json("Invalid OTP");
      }
    } else {
      res.status(400).json("User not found or incorrect password");
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json("An error occurred");
  }
});

// signup
app.post("/signup", async (req, res) => {
  const { email, password, name, roleadmin } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (user) {
      res.json("exist");
    } else {
      await User.create({
        email,
        password,
        name,
        roleadmin,
      });

      res.json("not exist");
    }
  } catch (e) {
    res.status(500).json(`Error creating user: ${e.message}`);
  }
});

// Define a route for fetching all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();

    if (users.length > 0) {
      res.json(users);
    } else {
      res.json("No users found");
    }
  } catch (e) {
    res.status(500).json("An error occurred");
  }
});

// reset pass
app.post("/reset-password", async (req, res) => {
  const { email, password, confirmPassword, otp } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.json("user not found");
    }

    if (!user.resetPasswordOTP) {
      return res.json("stored OTP is undefined");
    }

    if (password !== confirmPassword) {
      return res.json("passwords do not match");
    }

    if (user.resetPasswordOTP.trim() !== otp.trim()) {
      return res.json("invalid OTP");
    }

    user.password = password;
    user.resetPasswordOTP = null;
    await user.save();

    res.json("success");
  } catch (e) {
    res.status(500).json("An error occurred");
  }
});

// generate otp

app.post("/generate-otp", async (req, res) => {
  const { email } = req.body;

  try {
    const otp = generateOTP();

    const user = await User.findOne({ email });

    if (!user) {
      return res.json("user not found");
    }

    const userEmail = user.email;
    const username = user.name;

    await User.findOneAndUpdate(
      { email },
      { $set: { resetPasswordOTP: otp, department: "defaultDepartment" } },
      { new: true, upsert: true }
    );

    await sendOTPEmail(email, otp, userEmail, username);

    res.json("OTP sent successfully");
  } catch (e) {
    res.status(500).json("An error occurred");
  }
});

const sendOTPEmail = async (to, otp, userEmail, username) => {
  try {
    const mailOptions = {
      from: "gitamapptech@gmail.com",
      to,
      subject: "Password Reset OTP",
      text: `Dear ${username},


      
      OTP: ${otp}
      
    
    `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Error sending email");
  }
};

const sendDataEmail = async (to, userdata) => {
  console.log("Sending email to:", userdata);
  try {
    const mailOptions = {
      from: "gitamapptech@gmail.com",
      to,
      subject: "Data from Final Submit",
      text: `Dear User,
      
      Here is the data submitted:
      
      Name: ${userdata.name}
      Mobile Number: ${userdata.mobileNumber}
      Position: ${userdata.position}
      Message: ${userdata.message}
      Status: ${userdata.status}
      Description: ${userdata.description}
      Description2: ${userdata.description2}
      DescriptionNew: ${userdata.descriptionNew}
      
      
    
    `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Error sending email");
  }
};

// final-submit
app.post("/final-submit", async (req, res) => {
  const data = req.body;
  console.log("data -------", data);
  const email = "kidore2936@minhlun.com";

  try {
    await sendDataEmail(email, data);

    res.json("Data sent successfully");
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json("An error occurred");
  }
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "gitamapptech@gmail.com",
    pass: "ajza yvpi ptur jinv",
  },
});

// admin verify otp
app.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.json("user not found");
    }

    if (!user.resetPasswordOTP) {
      return res.json("stored OTP is undefined");
    }

    if (user.resetPasswordOTP.trim() !== otp.trim()) {
      return res.json("invalid OTP");
    }

    // Clear the OTP after successful verification
    user.resetPasswordOTP = null;
    await user.save();

    res.json("OTP verified");
  } catch (e) {
    res.status(500).json("An error occurred");
  }
});

// fraud-any
app.post("/fraud-analyze", (req, res) => {
  const { subject, facilitation, body, hasAttachment, salutation } = req.body;

  if (
    subject == null ||
    subject === "" ||
    subject.includes("subject") ||
    (facilitation &&
      (facilitation.includes("user") ||
        facilitation.includes("candidate") ||
        facilitation.includes("subscriber"))) ||
    ((body == null || body === "") && hasAttachment === true) ||
    body.includes("urgent") ||
    body.includes("send") ||
    body.includes("whatsapp me") ||
    body.includes("pay") ||
    body.includes("candidate") ||
    body.includes("user") ||
    body.includes("granted") ||
    body.includes("jobs") ||
    body.includes("internship") ||
    body.includes("free") ||
    body.includes("weekly") ||
    body.includes("urgent") ||
    salutation.includes("user") ||
    salutation.includes("candidate") ||
    salutation.includes("subscriber") ||
    subject.includes("urgent") ||
    subject.includes("send") ||
    subject.includes("whatsapp me") ||
    subject.includes("pay") ||
    subject.includes("candidate") ||
    subject.includes("user") ||
    salutation.includes("Dear") ||
    salutation.includes("candidate") ||
    salutation.includes("subscriber")
  ) {
    res.json({ result: true });
  } else {
    res.json({ result: false });
  }
});

app.get("/form-entries", async (req, res) => {
  try {
    const formEntries = await FormEntry.find();
    res.json(formEntries);
  } catch (error) {
    console.error("Error fetching form entries:", error);
    res.status(500).json("Internal Server Error");
  }
});

const generateOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  console.log("Generated OTP:", otp);
  return otp;
};

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
