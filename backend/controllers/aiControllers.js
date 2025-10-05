import { GoogleGenAI } from "@google/genai";
import Invoice from "../models/invoice.js";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const parseInvoiceFromText = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      res.status(400).json({ error: "Text is required" });
      return;
    }
    const prompt = `You are an expert invoice data extraction AI .  Analyze the following invoice text and extract the relevant fields. The output must be in JSON Format
    
    The output object should have the following structure:
    {
    "clientName" : "string",
    "email" : "string (if available)",
    "address" : "string (if available)",
    "items : [{
        "name": "string",
        "quantity": number,
        "unitPrice": number,
    }]
    }
    Here is the text to parse : 
    ---TEXT START---
    ${text}
    ---TEXT END---
    Extract the data and provide only the JSON object as output. If any field is missing in the input, use null or empty array as appropriate.
    }
    `;

    // const response = await ai.models.generateContent({
    //   model: "gemini-2.5-flash",
    //   contents: prompt,
    // });

    // const responseText = response.text;

    const geminiRes = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" +
        process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            thinkingConfig: {
              thinkingBudget: 0,
            },
          },
        }),
      }
    );
    const geminiData = await geminiRes.json();

    let content = "";
    if (geminiData.candidates && geminiData.candidates.length > 0) {
      // Try the most common structure
      const candidate = geminiData.candidates[0];
      if (
        candidate.content &&
        candidate.content.parts &&
        candidate.content.parts.length > 0 &&
        candidate.content.parts[0].text
      ) {
        content = candidate.content.parts[0].text;
      } else if (candidate.output) {
        content = candidate.output;
      } else if (candidate.content && candidate.content.text) {
        content = candidate.content.text;
      }
    }

    if (typeof content !== "string") {
      if (typeof content.text === "function") {
        content = content.text();
      } else {
        throw new Error("Could not parse response text with the ai model");
      }
    }

    const cleanedJson = content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsedData = JSON.parse(cleanedJson);

    res.status(200).json(parsedData);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to parse invoice", details: error.message });
  }
};

export const generateReminderEmail = async (req, res) => {
  try {
    const { invoiceId } = req.body;

    if (!invoiceId) {
      res.status(400).json({ error: "invoiceId is required" });
      return;
    }

    const invoice = await Invoice.findById(invoiceId);

    if (!invoice) {
      res.status(404).json({ error: "Invoice not found" });
      return;
    }

    const prompt = `You are an professional and polite accounting assistant.  Write a friendly reminder email to a client about an overdue or upcoming invoice payment.
    
    Use the following invoice details to personalize the email:
    - Client Name: ${invoice.billTo.clientName}
    - Invoice Number: ${invoice.invoiceNumber}
    - Due Date: ${invoice.dueDate.toDateString()}
    - Amount Due: $${invoice.items
      .reduce((total, item) => total + item.quantity * item.unitPrice, 0)
      .toFixed(2)}
    - Sender Details: ${invoice.billFrom.clientName}, ${
      invoice.billFrom.email
    }, ${invoice.billFrom.address}

    The tone should be friendly but clear. Keep the email concise and to the point. End with a courteous closing. Start the email with "Subject: Reminder - Invoice #${
      invoice.invoiceNumber
    }".
    `;

    const geminiRes = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" +
        process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            thinkingConfig: {
              thinkingBudget: 0,
            },
          },
        }),
      }
    );
    const geminiData = await geminiRes.json();

    let content = "";
    if (geminiData.candidates && geminiData.candidates.length > 0) {
      // Try the most common structure
      const candidate = geminiData.candidates[0];
      if (
        candidate.content &&
        candidate.content.parts &&
        candidate.content.parts.length > 0 &&
        candidate.content.parts[0].text
      ) {
        content = candidate.content.parts[0].text;
      } else if (candidate.output) {
        content = candidate.output;
      } else if (candidate.content && candidate.content.text) {
        content = candidate.content.text;
      }
    }

    res.status(200).json({ reminderText: content });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to parse invoice", details: error.message });
  }
};

export const getDashboardSummary = async (req, res) => {
  try {
    const invoices = await Invoice.find({ user: req.user._id });

    if (invoices.length === 0) {
      return res
        .status(200)
        .json({ message: "No invoices found for the user" });
    }

    const totalInvoice = invoices.length;
    const paidInvoices = invoices.filter((inv) => inv.status === "Paid");
    const unpaidInvoices = invoices.filter((inv) => inv.status === "Unpaid");
    const totalRevenue = paidInvoices.reduce(
      (sum, inv) => (sum += inv.totalAmount),
      0
    );
    const totalOutstanding = unpaidInvoices.reduce(
      (sum, inv) => (sum += inv.totalAmount),
      0
    );

    const dataSummary = `
      - Total Number Of Invoices: ${totalInvoice}
      - Total Paid Invoices: ${paidInvoices.length}
      - Total Unpaid Invoices: ${unpaidInvoices.length}
      - Total Revenue from Paid Invoices: $${totalRevenue.toFixed(2)}
      - Total Outstanding Amount from Unpaid Invoices: $${totalOutstanding.toFixed(
        2
      )}
      - Recent Invoices (last 5) : ${invoices
        .slice(0, 5)
        .map(
          (inv) =>
            `Invoice #${inv.invoiceNumber} for ${inv.totalAmount.toFixed(
              2
            )} with Status ${inv.status}`
        )
        .join(", ")}

    `;

    const prompt = `
    you are a friendly and insightful financial analyst for a small business owner. Based on the following summary of their invoice data , provide a 2-3 concise and actionable insights that can help them manage their finances better.
    Each insight should be short string in a JSON Array . Use a positive and encouraging tone. 
    The insights  should be encouraging and Helpfull . Do not just repeat the data points.
    For example , if there is high outstanding amount , suggest sending reminders . If revenue is high , be. enchouraging about growth and suggest some investment ideas.

    Data Summary : 
    ${dataSummary}

    Return your response as a valid JSON object with a single key "insights" which is an array of strings.

    Example format : {"insights": ["Your revenue are looking strong this month.", "You have a 5 overdue invoices. Consider sending reminders to get paid faster"]}
    `;

    const geminiRes = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" +
        process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            thinkingConfig: {
              thinkingBudget: 0,
            },
          },
        }),
      }
    );
    const geminiData = await geminiRes.json();

    let content = "";
    if (geminiData.candidates && geminiData.candidates.length > 0) {
      // Try the most common structure
      const candidate = await geminiData.candidates[0];
      if (candidate.content && candidate.content.parts) {
        content = await candidate.content.parts[0].text;
      }
    }
    const cleanedJson = content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsedData = await JSON.parse(cleanedJson);

    if (!parsedData.insights) {
      throw new Error("No insights found in the AI response");
    }

    res.status(200).json(parsedData);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to generate insights", details: error.message });
  }
};
