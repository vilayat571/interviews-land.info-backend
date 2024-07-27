const mongoose = require("mongoose");

const url =
  "mongodb+srv://vilayat571:V43D4kWJVToXugfo@cluster0.fi5ebfv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
db = () => {
  mongoose
    .connect(url)
    .then(() => console.log("DB connected"))
    .catch((err) => console.log(err.message));
};

module.exports = db;
