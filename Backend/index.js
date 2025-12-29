import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongoose from 'mongoose'
import userRoutes from './Routes/User.Routes.js';
import profileRoutes from './Routes/Profile.Routes.js';
import cors from "cors";
import path from "path";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors({
  origin: "*", // sirf aapke frontend ka URL allow kare
  methods: ["GET","POST","PUT","DELETE"],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(
  "/uploads",
  express.static("uploads", {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith(".pdf")) {
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "inline");
      }
    },
  })
);


dotenv.config() 
const MONGODB_URI = process.env.MONGODB_URI;


// DB Connect
mongoose.connect(MONGODB_URI)
  .then(() => console.log('connected to mongoDB'))
  .catch((error) => console.log('MongoDB connection error:', error));

// Test Route
app.get("/", (req, res) => {
  res.send("Backend running with ES Modules!");
});

app.use("/user", userRoutes);
app.use("/profile", profileRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
