"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Mail, MessageCircle, Phone } from "lucide-react";
import { FORMSPREE_URL, FORM_NAME } from "../config/form.config";
import { siteConfig } from "../config/site.config";

type ContactFormProps = {
  eyebrow?: string;
  heading?: string;
  description?: string;
  formTitle?: string;
  submitLabel?: string;
  subjectLabel?: string;
};

export default function ContactForm({
  eyebrow = `Contact ${siteConfig.shortName}`,
  heading = "Share your Chennai safety requirement.",
  description = "Send your area, service, floor level, and photos if available. We will review the requirement and contact you with the next step.",
  formTitle = "Get a Free Quote",
  submitLabel = "Send Enquiry",
  subjectLabel = FORM_NAME,
}: ContactFormProps = {}) {
  const [formData, setFormData] = useState({
    name: "",
    purpose: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      setErrorMessage("Please fill in all required fields: name, email, and phone.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          purpose: formData.purpose,
          message: formData.message,
          _subject: `${subjectLabel} - New Enquiry from ${formData.name}`,
          _replyto: formData.email,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setStatus("success");
      setFormData({ name: "", purpose: "", email: "", phone: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
      setErrorMessage("Failed to send enquiry. Please try again or contact us directly.");
    }
  };

  return (
    <section id="quote" className="mx-auto max-w-7xl rounded-lg bg-secondary-100 p-4 shadow-soft sm:p-6 lg:p-8">
      <div className="grid gap-5 lg:grid-cols-[0.88fr_1.12fr]">
        <div className="rounded-lg bg-white p-5 shadow-soft sm:p-6">
          <div className="relative h-48 overflow-hidden rounded-lg bg-slate-100">
            <Image
              src={siteConfig.defaultImage}
              alt={`${siteConfig.name} safety installation`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 38vw"
              unoptimized
            />
          </div>

          <p className="mt-5 text-xs font-black uppercase tracking-[0.22em] text-secondary">
            {eyebrow}
          </p>
          <h2 className="mt-3 text-2xl font-semibold leading-tight text-primary-900 sm:text-3xl">
            {heading}
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>

          <div className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <a
              href={siteConfig.contact.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-950"
            >
              <Phone size={17} />
              Call
            </a>
            <a
              href={siteConfig.contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-4 py-3 text-sm font-semibold text-white transition hover:bg-accent-600"
            >
              <MessageCircle size={17} />
              WhatsApp
            </a>
            <a
              href={siteConfig.contact.emailHref}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-primary px-4 py-3 text-sm font-semibold text-primary transition hover:border-secondary hover:bg-secondary hover:text-white"
            >
              <Mail size={17} />
              Email
            </a>
          </div>
        </div>

        <div className="rounded-lg bg-white p-5 shadow-soft sm:p-6 lg:p-8">
          <div className="mb-5 border-b border-slate-100 pb-4">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-secondary">
              Quote Request
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-primary-900">{formTitle}</h3>
          </div>

          <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                name="name"
                placeholder="Full Name *"
                value={formData.name}
                onChange={handleChange}
                required
                className="rounded-md border border-slate-200 bg-neutral-50 px-4 py-3 text-sm outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary-100"
              />
              <input
                name="phone"
                placeholder="Phone Number *"
                value={formData.phone}
                onChange={handleChange}
                required
                className="rounded-md border border-slate-200 bg-neutral-50 px-4 py-3 text-sm outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary-100"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                name="email"
                type="email"
                placeholder="Email Address *"
                value={formData.email}
                onChange={handleChange}
                required
                className="rounded-md border border-slate-200 bg-neutral-50 px-4 py-3 text-sm outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary-100"
              />
              <input
                name="purpose"
                placeholder="Service Needed"
                value={formData.purpose}
                onChange={handleChange}
                className="rounded-md border border-slate-200 bg-neutral-50 px-4 py-3 text-sm outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary-100"
              />
            </div>

            <textarea
              name="message"
              rows={5}
              placeholder="Project details, location, or notes..."
              value={formData.message}
              onChange={handleChange}
              className="resize-none rounded-md border border-slate-200 bg-neutral-50 px-4 py-3 text-sm outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary-100"
            />

            {status === "success" ? (
              <div className="rounded-md border border-accent-300 bg-accent-50 p-3 text-sm text-accent-700">
                Enquiry sent successfully. We will contact you soon.
              </div>
            ) : null}

            {status === "error" ? (
              <div className="rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-700">
                {errorMessage}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-secondary py-3 font-semibold text-white shadow-[0_10px_24px_rgba(143,99,44,0.22)] transition hover:bg-secondary-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === "loading" ? "Sending..." : submitLabel}
              <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
