import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./config/database.js";
import authRouter from "./routes/authRoutes.js";
import invoiceRouter from "./routes/invoiceRoutes.js";
import aiRouter from "./routes/aiRoutes.js";

const app = express();
dotenv.config();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware to parse JSON bodies
app.use(express.json());

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.use("/api/auth", authRouter);
app.use("/api/invoice", invoiceRouter);
app.use("/api/ai", aiRouter);

// Connect to the database and start the server

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at ${process.env.PORT}`);
  });
});
