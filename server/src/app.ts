import express from "express";
import cors from "cors";
import diagnosisRouter from "./routes/diagnosisRouter";
import { errorHandler } from "./lib/ErrorHandler";
import authRouter from "./routes/authRouter";
const app = express();

// Enable fetching from localhost
app.use(cors());

// Middle to parse body request
app.use(express.json({ limit: "1mb" }));

app.use((request, response, next) => {
  setTimeout(() => {
    next();
  }, 2000);
});

app.use("/diagnosis", diagnosisRouter);
app.use("/auth", authRouter);

app.use(errorHandler);

export default app;
