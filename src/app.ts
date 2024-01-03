import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send(`Server is live... on PORT: ${PORT}`);
});

import userRoutes from "./routes/user.js";
import productRoutes from "./routes/product.js";
import { connectToDB } from "./utils/features.js";
import { errorMiddleWare } from "./middlewares/error.js";

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);

app.use(errorMiddleWare);
app.use("/uploads", express.static("uploads"));

app.listen(PORT, () => {
  console.log(`Server is live on http://localhost:${PORT}`);
});

connectToDB();
