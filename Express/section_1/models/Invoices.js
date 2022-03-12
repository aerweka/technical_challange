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
      isDate: {
        args: true,
        msg: "Please insert valid date",
      },
    },
  },
  customerName: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      min: 2,
      // {
      //   args: 2,
      //   msg: "Must have minmimum 2 character",
      // },
      isLengthCorrect(value) {
        if (value.length < 2) throw new Error("Must have minmimum 2 character");
      },
    },
  },
  salespersonName: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      // min: {
      //   args: 2,
      //   msg: "Must have minmimum 2 character",
      // },
      isLengthCorrect(value) {
        if (value.length < 2) throw new Error("Must have minmimum 2 character");
      },
    },
  },
  paymentType: {
    type: DataTypes.ENUM({
      values: ["CASH", "CREDIT"],
    }),
    validate: {
      isIn: {
        args: [["CASH", "CREDIT"]],
        msg: "Choose Cash or Credit",
      },
    },
  },
  notes: {
    type: DataTypes.TEXT,
    validate: {
      min: {
        args: 5,
        msg: "Must have minmimum 5 character",
      },
    },
  },
  // list_of_products_sold: {},
});

Invoices.belongsToMany(Products, { through: "ListsProductsOfInvoice" });

// Invoices.sync({ force: true });

module.exports = Invoices;
