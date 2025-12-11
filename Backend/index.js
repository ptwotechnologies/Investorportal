import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongoose from 'mongoose'
import userRoutes from './Routes/User.Routes.js';
import cors from "cors";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors({
  origin: "http://localhost:5173", // sirf aapke frontend ka URL allow kare
  methods: ["GET","POST","PUT","DELETE"],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

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

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
