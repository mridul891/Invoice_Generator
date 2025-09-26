import { Link } from "react-router-dom";
import { FileText, ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-white to-blue-50/60" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 lg:pt-36 pb-16 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <div className="inline-flex items-center space-x-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-600 shadow-sm">
              <span className="inline-flex h-2 w-2 rounded-full bg-green-500" />
              <span>No more manual formatting</span>
            </div>

            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-gray-900">
              Create beautiful invoices in seconds
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-600 leading-7">
              Generate, send, and track invoices with an elegant, AI‑assisted workflow.
              Spend less time on paperwork and more on growing your business.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3">
              <Link
                to="/invoices/new"
                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-900 to-blue-950 px-6 py-3 text-white font-medium shadow-lg shadow-blue-900/20 hover:scale-[1.02] hover:shadow-xl transition-transform"
              >
                Get started free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-gray-800 font-medium hover:bg-gray-50 transition-colors"
              >
                See features
              </a>
            </div>

            <div className="mt-8 flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="h-6 w-6 rounded-full bg-blue-100 ring-2 ring-white flex items-center justify-center text-[10px] font-semibold text-blue-900">
                    A
                  </div>
                  <div className="h-6 w-6 rounded-full bg-amber-100 ring-2 ring-white flex items-center justify-center text-[10px] font-semibold text-amber-900">
                    B
                  </div>
                  <div className="h-6 w-6 rounded-full bg-emerald-100 ring-2 ring-white flex items-center justify-center text-[10px] font-semibold text-emerald-900">
                    C
                  </div>
                </div>
                <span>1,000+ freelancers onboard</span>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <FileText className="h-4 w-4 text-blue-900" />
                <span>Unlimited invoices</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative mx-auto max-w-md">
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-tr from-blue-200/30 via-transparent to-amber-200/30 blur-2xl" />
              <div className="relative rounded-xl border border-gray-200 bg-white/80 backdrop-blur p-4 shadow-xl">
                <div className="rounded-lg bg-gray-50 border border-dashed border-gray-200 aspect-[4/3] flex items-center justify-center">
                  <div className="text-center px-6">
                    <FileText className="mx-auto h-10 w-10 text-blue-900" />
                    <p className="mt-3 text-sm text-gray-600">
                      Preview your polished invoice layout here
                    </p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-gray-600">
                  <div className="rounded-md bg-gray-100 px-2 py-1">PDF export</div>
                  <div className="rounded-md bg-gray-100 px-2 py-1">GST/Tax</div>
                  <div className="rounded-md bg-gray-100 px-2 py-1">Branding</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
