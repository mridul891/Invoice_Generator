import { FileText, Clock, ShieldCheck, Sparkles, Download, CreditCard } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Templates that impress",
    desc: "Professional layouts with your logo, brand colors, and localized fields.",
  },
  {
    icon: Sparkles,
    title: "AI‑assisted filling",
    desc: "Auto‑complete line items, taxes, and client details with smart suggestions.",
  },
  {
    icon: Clock,
    title: "Faster workflows",
    desc: "Save clients, products, and taxes to generate invoices in under a minute.",
  },
  {
    icon: Download,
    title: "1‑click export",
    desc: "Send as PDF via email or download with perfect formatting every time.",
  },
  {
    icon: CreditCard,
    title: "Get paid online",
    desc: "Attach payment links and track status—paid, pending, or overdue.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & private",
    desc: "Your data is encrypted at rest and in transit with strict access controls.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900">Everything you need</h2>
          <p className="mt-3 text-gray-600">
            Powerful features wrapped in a delightful, simple interface.
          </p>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-10 w-10 rounded-lg bg-blue-900/10 text-blue-900 flex items-center justify-center">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">{title}</h3>
              <p className="mt-2 text-sm text-gray-600 leading-6">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;


