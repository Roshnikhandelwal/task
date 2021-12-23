const express = require("express");
const app = express();
const port = process.env.port||5000

require('./db/connection')

const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");

const multer = require("multer");
const path = require("path");


app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, abc.jpg);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);


app.listen("5000", () => {
  console.log(`listen on port ${port}`);
});
