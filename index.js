const db = require("./config/db.js");
const express = require("express");
const cors = require("cors");
const Question = require("./routes/question.js");
const Category = require("./routes/categories.js");
const Shares = require("./routes/share.js");

db();
const app = express();
app.use(cors());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use("/", Question);
app.use("/", Category);
app.use("/", Shares);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend started to listen on port ${PORT}`);
});
