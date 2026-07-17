// index.js
import dotenv from "dotenv";

dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import userRoutes from './Routes/User.Routes.js';
import profileRoutes from './Routes/Profile.Routes.js';
import connectionsRoutes from './Routes/connection.Routes.js';
import requestRoutes from './Routes/request.Routes.js';
import connectDB from './lib/db.js';
import helpRoutes from './Routes/help.Routes.js';
import paymentRoutes from './Routes/payment.Routes.js';
import channelPartnerRoutes from './Routes/ChannelPartner.Routes.js';
import contactUsRoutes from './Routes/ContactUs.Routes.js';
import partnerReferralRoutes from './Routes/PartnerReferral.Routes.js';
import dealRoutes from './Routes/deal.routes.js';
import disputeRoutes from './Routes/dispute.routes.js';

import { createServer } from "http";
import { Server } from "socket.io";
import { initSocket } from "./lib/socket.js";
import { startCronJobs } from "./lib/cron.js";

const app = express();

// ✅ PERMANENT FIX FOR VERCEL CORS PREFLIGHT
// Explicitly handle all OPTIONS requests before ANYTHING else so Vercel doesn't drop them
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    const allowed = [
      "http://localhost:5173",
      "https://copteno.com",
      "https://www.copteno.com"
    ];
    const origin = req.headers.origin;
    if (allowed.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    } else {
      res.setHeader("Access-Control-Allow-Origin", "https://copteno.com");
    }
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, Accept");
    return res.status(200).end();
  }
  next();
});

// Middlewares
import cors from "cors";

const allowedOrigins = [
  "http://localhost:5173",
  "https://copteno.com",
  "https://www.copteno.com"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"]
}));

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
  }
});

// INITIALIZE BACKGROUND JOBS AND SOCKETS ONLY IF NOT ON VERCEL
// Vercel serverless functions crash (FUNCTION_INVOCATION_FAILED) if background timers (cron/socket.io) block the event loop
if (!process.env.VERCEL) {
  initSocket(io);
  startCronJobs();
}

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

// Database connection middleware
app.use(async (req, res, next) => {
  // Skip DB connection for OPTIONS requests
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(503).json({ message: 'Database connection failed' });
  }
});

// Test Route
app.get("/", (req, res) => {
  res.send("Backend running with ES Modules!");
});

app.use("/user", userRoutes);
app.use("/profile", profileRoutes);
app.use("/connections", connectionsRoutes);
app.use("/requests", requestRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/help", helpRoutes);
app.use("/api/channel-partner", channelPartnerRoutes);
app.use("/api/contact-us", contactUsRoutes);
app.use("/api/partner-referral", partnerReferralRoutes);
app.use("/api/deals", dealRoutes);
app.use("/api/disputes", disputeRoutes);


// ✅ GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  console.error("--- SERVER ERROR ---");
  console.error("Message:", err.message);
  console.error("Stack:", err.stack);
  console.error("---------------------");

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err : {}
  });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export for Vercel
export { io, server };
export default app;