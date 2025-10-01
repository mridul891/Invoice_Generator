import Invoice from "../models/invoice.js";

// @desc   Create a new invoice
// @route  POST /api/invoice
// @access Private
export const createInvoice = async (req, res) => {
  try {
    const user = req.user;
    const {
      invoiceNumber,
      date,
      dueDate,
      billFrom,
      billTo,
      items,
      notes,
      paymentTerms,
    } = req.body;

    if (
      !invoiceNumber ||
      !date ||
      !dueDate ||
      !billTo ||
      !items ||
      !billFrom ||
      !paymentTerms
    ) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    let subTotal = 0;
    let taxTotal = 0;

    items.forEach((element) => {
      subTotal += element.quantity * element.unitPrice;
      taxTotal +=
        (element.quantity * element.unitPrice * (element.taxPercentage || 0)) /
        100;
    });

    const total = subTotal + taxTotal;

    const newInvoice = await Invoice.create({
      user: user,
      invoiceNumber,
      date,
      dueDate,
      billTo,
      billFrom,
      items,
      notes,
      paymentTerms,
      subTotal,
      taxTotal,
      totalAmount: total,
      status: "Unpaid",
      notes,
    });

    res.status(201).json(newInvoice);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc   Get all invoices for a user
// @route  GET /api/invoice
// @access Private

export const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find().populate("user", "name email");
    return res.status(201).json(invoices);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc   Get invoice by ID
// @route  GET /api/invoice/:id
// @access Private

export const getInvoiceById = async (req, res) => {
  try {
    const invoices = await Invoice.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (!invoices)
      return res.status(404).json({ message: "Invoice Not Found" });

    res.status(201).json(invoices);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc   Update an invoice
// @route  PUT /api/invoice/:id
// @access Private

export const updateInvoice = async (req, res) => {
  try {
    const {
      invoiceNumber,
      date,
      dueDate,
      billFrom,
      billTo,
      items,
      notes,
      paymentTerms,
      status,
    } = req.body;

    // Recalculate if items Changed
    let subTotal = 0;
    let taxTotal = 0;

    if (items && items.length > 0) {
      items.forEach((item) => {
        subTotal += items.quantity * items.unitPrice;
        taxTotal +=
          (item.quantity * items.unitPrice * (item.taxPercentage || 0)) / 100;
      });
    }

    const totalAmount = subTotal + taxTotal;
    const updateInvoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      {
        invoiceNumber,
        date,
        dueDate,
        billFrom,
        billTo,
        items,
        notes,
        paymentTerms,
        status,
        subTotal,
        taxTotal,
        totalAmount,
      },
      { new: true }
    );

    if (!updateInvoice)
      return res.status(404).json({ message: "Invoice not Found" });

    res.status(201).json(updateInvoice);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc   Delete an invoice
// @route  DELETE /api/invoice/:id
// @access Private

export const deleteInvoice = async (req, res) => {
  try {
    const deletedInvoice = await Invoice.findByIdAndDelete(req.params.id);
    if (!deleteInvoice)
      return res.status(404).json({ message: "Invoice not Found" });

    res.status(201).json({ message: "Invoice Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
