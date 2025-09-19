const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD
);

// connecting to the ONLINE database sha
mongoose.connect(DB).then((con) => {
  console.log("DB CONNECTION IS SUCCESSFUL");
});

// connecting to the db locally
// mongoose
//   .connect(process.env.DATABASE_LOCAL)
//   .then(() => console.log("Hi you are connected!"));

const port = 8000;

app.listen(port, () => {
  console.log("the app is responding!");
});
