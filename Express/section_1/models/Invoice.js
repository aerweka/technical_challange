const { db } = require("../connection/db_mysql"),
  { DataTypes } = require("sequelize");

const Invoice = db.define("invoice", {
  invoice_no: {
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
  customer_name: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      min: 2,
    },
  },
  salesperson_name: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      min: 2,
    },
  },
  payment_type: {
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
});

// Invoice.sync({ alter: true });

module.exports = Invoice;
