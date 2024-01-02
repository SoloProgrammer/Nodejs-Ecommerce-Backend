import express from "express";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send(`Server is live... on PORT: ${PORT}`);
});

import userRoutes from "./routes/user.js";
import { connectToDB } from "./utils/features.js";
import { errorMiddleWare } from "./middlewares/error.js";

app.use("/api/v1/user", userRoutes);

app.use(errorMiddleWare);

app.listen(PORT, () => {
  console.log(`Server is live on http://localhost:${PORT}`);
});

connectToDB();
