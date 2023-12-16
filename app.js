require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const mongo = require("./config/mongo");
const mainRoute = require("./routes/main");

app.use(express.json());
app.use(cors());
app.use(mainRoute);

// Connect to database and then start the server
mongo.connect((err) => {
  if (err) throw err;
  app.listen(port, () => {
    console.log(`Database connected and Server listening on port ${port}`);
  });
});
