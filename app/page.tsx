import Image from "next/image";

/* ============================================================
   NAVBAR
============================================================ */
function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#050A14]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="font-bold text-white text-lg">Agentic Protocol</span>
        </div>
        <div className="hidden sm:flex items-center gap-8 text-sm text-slate-400">
          <a href="#what-youll-learn" className="hover:text-white transition-colors">Learn</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </div>
        {/* Polar.sh checkout — replace data-polar-product-id with real ID */}
        <a href="#pricing" data-polar-checkout="true" data-polar-product-id="REPLACE_POLAR_BUNDLE_ID"
          className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-sm transition-all duration-200 hover:scale-[1.02]">
          Get Access
        </a>
      </div>
    </nav>
  );
}
