require("dotenv").config();
const express = require("express"),
  cors = require("cors"),
  { db } = require("./connection/db_mysql"),
  app = express();

const invoiceRoutes = require("./routes/invoice");

app.use(express.json());
app.use(cors());

db.authenticate().then(() => console.log("db connected"));

// routes
app.use("/invoice", invoiceRoutes);

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
