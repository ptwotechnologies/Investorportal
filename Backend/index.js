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

const app = express();

// Middlewares
const allowedOrigins = [
  "http://localhost:5173",
  "https://copteno.com",
  "https://www.copteno.com"
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  console.log(`DEBUG: Incoming request from origin: ${origin}, method: ${req.method}`);
  
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else if (!origin) {
    // Allow non-CORS requests
  } else {
    console.log(`DEBUG: Origin ${origin} not in allowedOrigins`);
  }

  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, Accept");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

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
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export for Vercel
export default app;