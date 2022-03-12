const Invoices = require("../models/Invoices"),
  { db } = require("../connection/db_mysql"),
  { Op } = require("sequelize");

const index = async (req, res) => {
  try {
    const allInvoices = await Invoices.findAll({});
    res.json(allInvoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const show = async (req, res) => {
  const { date, size, page } = req.params;
  try {
    const invoice = await Invoices.findAll({
      where: {
        date: date,
      },
      // limit: size,
    });

    res.json(invoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const store = async (req, res) => {
  const { invoiceNo, date, customerName, salespersonName, paymentType, notes } =
    req.body;

  try {
    const newInvoice = await Invoices.create({
      invoiceNo,
      date,
      customerName,
      salespersonName,
      paymentType,
      notes,
    });

    res.json(newInvoice);
  } catch (err) {
    // const error = errorHandle(err);
    res.status(500).json({ message: err.message });
  }
};

const update = async (req, res) => {
  const { date, customerName, salespersonName, paymentType, notes } = req.body;
  const { invoiceNo } = req.params;
  try {
    const updateInvoice = await Invoices.update(
      {
        date: date,
        customerName: customerName,
        salespersonName: salespersonName,
        paymentType: paymentType,
        notes: notes,
      },
      {
        where: {
          invoiceNo: invoiceNo,
        },
      }
    );

    await updateInvoices;

    res.json({ message: "Update success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const remove = async (req, res) => {
  const { invoiceNo } = req.params;

  try {
    const deletedInvoices = await Invoices.destroy({
      where: { invoiceNo },
    });
    res.json({ message: "Invoices deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const errorHandle = (err) => {
  err.errors.forEach(({ ValidationErrorItem }) => {
    // console.log(ValidationErrorItem.message);
  });
  let errors = {
    invoiceNo: "",
    date: "",
    customerName: "",
    salespersonName: "",
    paymentType: "",
    notes: "",
  };

  Object.values(err.errors).forEach(({ ValidationErrorItem }) => {
    // console.log(ValidationErrorItem);
    // errors[ValidationErrorItem.path] = ValidationErrorItem.message;
  });
};

module.exports = { index, show, store, update, remove };
