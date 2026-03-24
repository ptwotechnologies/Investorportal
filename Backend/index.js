import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from './lib/db.js';

import userRoutes from './Routes/User.Routes.js';
import profileRoutes from './Routes/Profile.Routes.js';
import connectionsRoutes from './Routes/connection.Routes.js';
import requestRoutes from './Routes/request.Routes.js';
import helpRoutes from './Routes/help.Routes.js';
import paymentRoutes from './Routes/payment.Routes.js';

const app = express();

// ✅ CORS — must be first
const allowedOrigins = [
  "https://artestor.copteno.com",
  "http://localhost:3000",
  "http://localhost:5173",
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error(`CORS blocked: ${origin}`));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
  credentials: true,
}));

app.options("*", cors()); // preflight

if (!process.env.MONGODB_URI) {
  console.warn("WARNING: MONGODB_URI is not defined");
}

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads", {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith(".pdf")) {
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "inline");
    }
  },
}));

// DB middleware
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(503).json({ message: 'Database connection failed' });
  }
});

app.get("/", (req, res) => res.send("Backend running!"));

app.use("/user", userRoutes);
app.use("/profile", profileRoutes);
app.use("/connections", connectionsRoutes);
app.use("/requests", requestRoutes);
app.use("/help", helpRoutes);
app.use("/api/payment", paymentRoutes);

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;