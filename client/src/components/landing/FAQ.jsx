import { useState } from "react";

const faqs = [
  {
    q: "Is there a free plan?",
    a: "Yes. You can create unlimited invoices and export PDFs on the free plan.",
  },
  {
    q: "Can I add my logo and brand colors?",
    a: "Absolutely. Upload your logo and customize colors and invoice fields.",
  },
  {
    q: "How do taxes and GST work?",
    a: "Add tax rates once and reuse them. We compute totals and show summaries.",
  },
  {
    q: "Do you support online payments?",
    a: "You can attach payment links so clients can pay instantly and we track status.",
  },
];

const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full flex items-center justify-between py-4 text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="font-medium text-gray-900">{q}</span>
        <span className="ml-4 text-gray-500">{open ? "−" : "+"}</span>
      </button>
      {open && <p className="pb-4 text-sm text-gray-600 leading-6">{a}</p>}
    </div>
  );
};

const FAQ = () => {
  return (
    <section id="faq" className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900">FAQs</h2>
          <p className="mt-3 text-gray-600">Answers to common questions.</p>
        </div>
        <div className="mt-8 bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
          {faqs.map((f) => (
            <FAQItem key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;


