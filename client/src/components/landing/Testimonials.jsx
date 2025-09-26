const testimonials = [
  {
    name: "Aarav Mehta",
    role: "Freelance Designer",
    quote:
      "I send invoices in under two minutes now. The templates look stunning and clients pay faster.",
  },
  {
    name: "Sarah Khan",
    role: "Agency Owner",
    quote:
      "Our team finally stopped fighting spreadsheets. Exports are accurate and on-brand.",
  },
  {
    name: "Rohit Sharma",
    role: "Consultant",
    quote:
      "The tax handling is painless. I love the quick PDF and email share.",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-16 lg:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900">Loved by independents</h2>
          <p className="mt-3 text-gray-600">What our users say about their invoicing workflow.</p>
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t) => (
            <figure key={t.name} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <blockquote className="text-gray-700 leading-7">“{t.quote}”</blockquote>
              <figcaption className="mt-4">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-200 to-amber-200" />
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{t.name}</div>
                    <div className="text-xs text-gray-600">{t.role}</div>
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;


