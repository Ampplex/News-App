require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const userRouter = require("./routes/user");

const { connectMongoDB } = require("./connection");

const PORT = process.env.PORT || 8080;

// Middleware to parse JSON request body
app.use(bodyParser.json());

// Connection
connectMongoDB(process.env.MONGO_URL).then(() => {
  console.log("MongoDB connected!");
});

// Middleware - Plugin
app.use(express.urlencoded({ extended: false }));
// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}/`);
});
