"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "general",
    message: "",
    honeypot: "", // Spam prevention field
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Spam honeypot check
    if (formData.honeypot) {
      setStatus("success");
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setErrorMessage("Please complete all required fields.");
      return;
    }

    setStatus("submitting");

    // Simulated / documented workflow:
    // In production, this can send to an API endpoint or email webhook like Formspree or Resend
    try {
      // Simulate network request
      await new Promise((resolve) => setTimeout(resolve, 800));
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Unable to transmit message. Please try again later.");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-xl border border-forest-200 bg-forest-50/70 p-6 text-center space-y-3">
        <div className="inline-flex items-center justify-center rounded-full bg-forest-100 p-3 text-forest-800">
          <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
        </div>
        <h3 className="font-serif font-bold text-lg text-stone-900">
          Message Received
        </h3>
        <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
          Thank you for reaching out to Air Crafted Home. A member of our
          editorial or technical team will review your message within 2 business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* Honeypot for automated spam bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="hp-field">Leave this empty</label>
        <input
          id="hp-field"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={formData.honeypot}
          onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
        />
      </div>

      {status === "error" && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-800 flex items-center gap-2"
        >
          <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Name */}
      <div className="space-y-1">
        <label
          htmlFor="contact-name"
          className="block text-xs font-semibold text-stone-700"
        >
          Your Name <span className="text-red-500">*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-900 focus:border-forest-700 focus:ring-1 focus:ring-forest-700"
          placeholder="Jane Doe"
        />
      </div>

      {/* Email */}
      <div className="space-y-1">
        <label
          htmlFor="contact-email"
          className="block text-xs font-semibold text-stone-700"
        >
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          id="contact-email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-900 focus:border-forest-700 focus:ring-1 focus:ring-forest-700"
          placeholder="jane@example.com"
        />
      </div>

      {/* Subject */}
      <div className="space-y-1">
        <label
          htmlFor="contact-subject"
          className="block text-xs font-semibold text-stone-700"
        >
          Inquiry Category
        </label>
        <select
          id="contact-subject"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-900 focus:border-forest-700 focus:ring-1 focus:ring-forest-700 bg-white"
        >
          <option value="general">General Editorial Question</option>
          <option value="correction">Technical Correction or Sourcing Feedback</option>
          <option value="product-data">Product Specification Discrepancy</option>
          <option value="affiliate">Affiliate / Partnership Inquiry</option>
        </select>
      </div>

      {/* Message */}
      <div className="space-y-1">
        <label
          htmlFor="contact-message"
          className="block text-xs font-semibold text-stone-700"
        >
          Your Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="contact-message"
          rows={5}
          required
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-900 focus:border-forest-700 focus:ring-1 focus:ring-forest-700"
          placeholder="Please describe your question, observation, or feedback with as much detail as possible..."
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-forest-800 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-forest-900 focus:outline-none focus:ring-2 focus:ring-forest-800 transition disabled:opacity-50"
      >
        <Send className="h-4 w-4" aria-hidden="true" />
        <span>{status === "submitting" ? "Transmitting..." : "Send Message"}</span>
      </button>

      <p className="text-[11px] text-stone-500">
        We respect your privacy. We never sell your contact details or subscribe
        you to unsolicited mailing lists. See our{" "}
        <a href="/privacy-policy" className="underline">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
