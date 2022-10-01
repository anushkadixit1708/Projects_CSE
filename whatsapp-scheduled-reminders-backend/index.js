const express = require("express");
const app = express();
const cors = require("cors");
const requests = require("./routes/requests");
app.use(express.json());
app.use(cors());

app.use("/requests", requests);

app.get("/", (req, res) => {
  console.log("Hello");
});

app.listen(8080, (req, res) => {
  console.log("Hello World ")
});
