const { db } = require("../connection/db_mysql"),
  Products = require("./Products"),
  { DataTypes } = require("sequelize");

const Invoices = db.define("invoice", {
  invoiceNo: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      isGreaterThanOne(value) {
        if (parseInt(value) < 1) throw new Error("Must have minimum 1 value");
      },
    },
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: true,
    },
  },
  customerName: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      min: 2,
    },
  },
  salespersonName: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      min: 2,
    },
  },
  paymentType: {
    type: DataTypes.ENUM({
      values: ["CASH", "CREDIT"],
    }),
    validate: {
      isIn: [["CASH", "CREDIT"]],
    },
  },
  notes: {
    type: DataTypes.TEXT,
    validate: {
      min: 5,
    },
  },
  // list_of_products_sold: {},
});

Invoices.belongsToMany(Products, { through: "ListsProductsOfInvoice" });

// Invoices.sync({ force: true });

module.exports = Invoices;
