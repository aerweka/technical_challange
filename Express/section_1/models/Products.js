const { db } = require("../connection/db_mysql"),
  { DataTypes } = require("sequelize");
const Invoices = require("./Invoices");

const Products = db.define("product", {
  itemName: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      min: 5,
    },
  },
  quantity: {
    type: DataTypes.NUMBER,
    allowNull: false,
    validate: {
      isGreaterThanOne(value) {
        if (parseInt(value) < 1) throw new Error("Must have minimum 1 value");
      },
    },
  },
  totalCostOfGoodSold: {
    type: DataTypes.NUMBER,
    allowNull: false,
    validate: {
      isGreaterThanZero(value) {
        if (parseInt(value) < 0) throw new Error("Must have minimum 1 value");
      },
    },
  },
  totalPriceSold: {
    type: DataTypes.NUMBER,
    allowNull: false,
    validate: {
      isGreaterThanZero(value) {
        if (parseInt(value) < 0) throw new Error("Must have minimum 1 value");
      },
    },
  },
});

// Products.belongsToMany(Invoices, { through: "ListsProductsOfInvoice" });
Products.sync({ force: true });

module.exports = Products;
