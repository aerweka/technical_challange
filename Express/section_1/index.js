require("dotenv").config();
const express = require("express"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  { db } = require("./connection/db_mysql"),
  app = express();

const invoiceRoutes = require("./routes/invoice"),
  productRoutes = require("./routes/product");

app.use(express.json());
app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));

db.authenticate().then(() => console.log("db connected"));

// routes
app.use("/invoice", invoiceRoutes);

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
