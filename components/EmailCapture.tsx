"use client";

import { useState } from "react";

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setMessage(data.message || "Check your inbox - Chapter 1 is on its way!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  };

  return (
    <section id="free-chapter" className="py-20 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-600/8 rounded-full blur-[100px]" />
      </div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-6">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          </svg>
          Free Download
        </div>

        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
          Get <span className="gradient-text">Chapter 1</span> Free
        </h2>
        <p className="text-slate-400 text-xl mb-3 max-w-2xl mx-auto leading-relaxed">
          See the depth before you buy. Chapter 1 covers the full OpenClaw architecture -- agents, skills, memory, and orchestration.
        </p>
        <p className="text-slate-500 text-sm mb-10">
          No spam. Just the chapter, plus occasional updates as the book evolves.
        </p>

        {status === "success" ? (
          <div className="bg-[#0D1526] border border-green-500/30 rounded-2xl p-8">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-white font-bold text-xl mb-2">Chapter 1 is yours!</h3>
            <p className="text-slate-400 mb-6">Download it now &mdash; an email with the link is also on its way.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/downloads/TheAgenticProtocol.pdf"
                download="TheAgenticProtocol-Chapter1.pdf"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-sm transition-all duration-200 hover:scale-[1.02]"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
                Download PDF
              </a>
              <a
                href="/downloads/TheAgenticProtocol.md"
                download="TheAgenticProtocol-Chapter1.md"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-600 hover:border-blue-500/50 text-slate-300 hover:text-white font-semibold text-sm transition-all duration-200 hover:bg-blue-500/5"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
                Download Markdown
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                disabled={status === "loading"}
                className="flex-1 px-5 py-4 rounded-xl bg-[#0D1526] border border-[#1E2D4A] text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 transition-all text-base disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={status === "loading" || !email.trim()}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-base transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 whitespace-nowrap flex items-center justify-center gap-2 min-w-[160px]"
              >
                {status === "loading" ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3" />
                    </svg>
                    Get Chapter 1
                  </>
                )}
              </button>
            </div>

            {status === "error" && (
              <p className="mt-3 text-red-400 text-sm text-center">{message}</p>
            )}

            <p className="mt-4 text-slate-600 text-xs">
              Free. No credit card. Unsubscribe anytime.
            </p>
          </form>
        )}

        {/* Trust signals */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-slate-500">
          {[
            { icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", text: "Delivered instantly" },
            { icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", text: "No spam, ever" },
            { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", text: "PDF format" },
          ].map(({ icon, text }) => (
            <span key={text} className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={icon} />
              </svg>
              {text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
