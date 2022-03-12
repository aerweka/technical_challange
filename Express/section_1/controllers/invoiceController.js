const Invoice = require("../models/Invoice"),
  { db } = require("../connection/db_mysql"),
  { Op } = require("sequelize");

const index = async (req, res) => {
  try {
    const allInvoices = await Invoice.findAll({});
    res.json(allInvoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const show = async (req, res) => {
  const { date, size, page } = req.params;
  try {
    const invoice = await Invoice.findAll({
      attribute: {
        include: [[db.fn("COUNT", db.col("payment_type"), "cash")]],
      },
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
  const {
    invoice_no,
    date,
    customer_name,
    salesperson_name,
    payment_type,
    notes,
  } = req.body;

  try {
    const newInvoice = await Invoice.create({
      invoice_no,
      date,
      customer_name,
      salesperson_name,
      payment_type,
      notes,
    });

    res.json(newInvoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const update = async (req, res) => {
  const { date, customer_name, salesperson_name, payment_type, notes } =
    req.body;
  const { invoice_no } = req.params;
  try {
    const updateInvoice = await Invoice.update(
      {
        date: date,
        customer_name: customer_name,
        salesperson_name: salesperson_name,
        payment_type: payment_type,
        notes: notes,
      },
      {
        where: {
          invoice_no: invoice_no,
        },
      }
    );

    await updateInvoice;

    res.json({ message: "Update success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const remove = async (req, res) => {
  const { invoice_no } = req.params;

  try {
    const deletedInvoice = await Invoice.destroy({
      where: { invoice_no },
    });
    res.json({ message: "Invoice deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { index, show, store, update, remove };
