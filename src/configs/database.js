const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("DATABASE connect success !!!");
    })
    .catch((error) => {
      console.log("DATABASE connect failed !!!",error);
    });
};

module.exports = { connectDatabase };
