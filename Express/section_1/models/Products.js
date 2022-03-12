const { db } = require("../connection/db_mysql"),
  { DataTypes } = require("sequelize");

const Products = db.define("product", {
  item_name: {
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
  total_cost_of_good_sold: {
    type: DataTypes.NUMBER,
    allowNull: false,
    validate: {
      isGreaterThanZero(value) {
        if (parseInt(value) < 0) throw new Error("Must have minimum 1 value");
      },
    },
  },
  total_price_sold: {
    type: DataTypes.NUMBER,
    allowNull: false,
    validate: {
      isGreaterThanZero(value) {
        if (parseInt(value) < 0) throw new Error("Must have minimum 1 value");
      },
    },
  },
});
