const express = require("express");
const mongoose = require("mongoose");
// Routes 👇:
const usersRoutes = require("./routes/users-routes");
const authRoutes = require("./routes/auth-routes");
const coursesRoutes = require("./routes/courses-routes");
const myCoursesRoutes = require("./routes/myCourses-routes");
const wordsRoutes = require("./routes/words-routes");
const HttpError = require("./models/http-error");
const cookieParser = require("cookie-parser");
const cors = require("cors");ko
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://funguage.onrender.com"],
    credentials: true,
  })
);

// THE CODE BELOW ABOUT CORS MIGHT NOT BE NEEDED WITHOUT USING REACT-ROUTER-DOM, BUT WHEN USING REACT-ROUTER-DOM, WE NEED IT, UNLESS WE GET CORS ERROR IN THE BROWSER.
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

//   next();
// });

//   FOR THE EXPRESS.JS TO SERVE STATIC FILES, PLEASE PAY ATTENTION TO THE FOLLOWING TIPS:
// 1) THE VIDEO OR SUBTITLE SRC MUST BE SOME THING LIKE THE STRING BELOW:
// <source src="http://localhost:5000/api/static-files/courses-data/A/section_1/A1.mp4" />
// 2) AS YOU SEE THE PART "/api" IS NEEDED AND THE "epress.static" METHOD SHOULD BE USED LIKE THIS:
// app.use("/api/static-files", express.static("static-files"));
// 3) THIS LINE OF CODE MUST BE PLACED AFTER THE ABOVE CODE ABOUT CORS.
app.use("/api/static-files", express.static("static-files"));

app.use("/api/courses", coursesRoutes);
app.use("/api/mycourses", myCoursesRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/words", wordsRoutes);
app.use("/api/awake", (req, res) => res.json("okay"));

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});
app.use((err, req, res, next) => {
  console.log("An ERRoR happened:", err);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

//* For connecting to MongoDB Atlas use this block of code 👇:
// mongoose.set("strictQuery", true);
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.mgycx.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`
  )
  // .connect(
  //   `mongodb+srv://Fardin:fardin72@cluster0.mgycx.mongodb.net/funguage?retryWrites=true&w=majority&appName=Cluster0`
  // )
  .then(() => {
    app.listen(process.env.PORT || 5000, () =>
      console.log("connected to port")
    );
    // app.listen(5000);
    // console.log("connected to port 5000");
    // app.listen(5000, "0.0.0.0", () => console.log("connected to port 5000"));
  })
  .catch((err) => {
    console.log("Mongo DB Error: \n", err);
  });

//* For connecting to MongoDB locally use this block of code 👇:

// mongoose.set("strictQuery", true);
// mongoose
//   .connect("mongodb://0.0.0.0:27017/funguage")
//   .then(() => {
//     // app.listen(process.env.PORT || 5000);
//     // app.listen(5000);
//     // console.log("connected to port 5000");
//     app.listen(5000, "0.0.0.0", () => console.log("connected to port 5000"));
//   })
//   .catch((err) => {
//     console.log("Mongo DB Error: \n", err);
//   });
