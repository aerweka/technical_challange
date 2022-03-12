const { db } = require("../connection/db_mysql"),
  Products = require("./Products"),
  Invoices = require("./Invoices"),
  { DataTypes } = require("sequelize");

const ListsProductsOfInvoice = db.define("ListsProductsOfInvoice", {
  ProductId: {
    type: DataTypes.INTEGER,
    references: {
      model: Products,
      key: "id",
    },
  },
  InvoiceId: {
    type: DataTypes.TEXT,
    references: {
      model: Invoices,
      key: "invoiceNo",
    },
  },
});
