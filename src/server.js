//Modules
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 5000;
//Router
const routes = require("./routes/router");

//Middleware to parse body
app.use(express.json());

//Connect to mongoose
mongoose.connect(
  "mongodb+srv://christiancan:ksquare2021@cluster0.5htjj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Define routes
app.use(routes);
app.use("/", function (req, res) {
  res.send("ToDo List API - Christian Can");
});
app.use((req, res) => {
  res.status(404).json({
    message: "Ups!!! Resource not found.",
  });
});

app.listen(port);
console.log("server on port", port);
