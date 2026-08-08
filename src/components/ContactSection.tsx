"use client";

import { useState, useRef, FormEvent, ChangeEvent } from "react";
import EarthCanvas from "./canvas/EarthCanvas";
import StarsCanvas from "./canvas/StarsCanvas";
import { config } from "../config";
import { FaGithub, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { MdEmail, MdLocationOn, MdSend, MdCheckCircle, MdErrorOutline } from "react-icons/md";

export const ContactSection = () => {
  const formRef = useRef<HTMLFormElement | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    message: false,
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const validateForm = () => {
    const { name, email, message } = form;
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const nameInvalid = name.trim().length < 3;
    const emailInvalid = !email.trim().toLowerCase().match(emailRegex);
    const messageInvalid = message.trim().length < 5;

    setErrors({
      name: nameInvalid,
      email: emailInvalid,
      message: messageInvalid,
    });

    return !nameInvalid && !emailInvalid && !messageInvalid;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setErrorMessage("");

    try {
      // Simulate form submission delay or Webmail dispatch
      await new Promise((resolve) => setTimeout(resolve, 1200));

      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });

      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (err) {
      setErrorMessage("Something went wrong while sending message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0b080c] text-white overflow-hidden py-16 sm:py-24 px-4 sm:px-8 flex items-center justify-center">
      {/* 3D Stars Floating Background */}
      <StarsCanvas />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Form Card */}
        <div className="lg:col-span-6 w-full rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl p-6 sm:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
          {/* Subtitle & Title */}
          <div className="space-y-1 mb-8">
            <p className="text-xs uppercase tracking-widest text-accent font-semibold font-geist">
              Get in Touch
            </p>
            <h2 className="text-3xl sm:text-5xl font-bold uppercase tracking-wider text-white font-geist leading-none">
              Contact<span className="text-accent">.</span>
            </h2>
          </div>

          {/* Submitted Success Notification */}
          {submitted ? (
            <div className="p-6 rounded-2xl bg-accent/15 border border-accent/40 text-accent flex flex-col items-center gap-3 text-center animate-fadeIn">
              <MdCheckCircle className="text-4xl text-accent" />
              <h4 className="text-lg font-bold">Message Sent Successfully!</h4>
              <p className="text-xs text-slate-300 font-light">
                Thank you for reaching out! Khadeer Shaik will get back to you shortly.
              </p>
            </div>
          ) : (
            /* Contact Form */
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* Name Field */}
              <div className="space-y-2">
                <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Your Name*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  disabled={loading}
                  className={`w-full px-5 py-3.5 rounded-xl bg-white/5 border ${
                    errors.name ? "border-rose-500/80" : "border-white/10 focus:border-accent/60"
                  } text-sm text-white placeholder:text-slate-500 focus:outline-none transition-colors backdrop-blur-sm`}
                />
                {errors.name && (
                  <span className="text-xs text-rose-400 flex items-center gap-1">
                    <MdErrorOutline /> Please enter at least 3 characters.
                  </span>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Your Email*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="johndoe@email.com"
                  disabled={loading}
                  className={`w-full px-5 py-3.5 rounded-xl bg-white/5 border ${
                    errors.email ? "border-rose-500/80" : "border-white/10 focus:border-accent/60"
                  } text-sm text-white placeholder:text-slate-500 focus:outline-none transition-colors backdrop-blur-sm`}
                />
                {errors.email && (
                  <span className="text-xs text-rose-400 flex items-center gap-1">
                    <MdErrorOutline /> Please enter a valid email address.
                  </span>
                )}
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Your Message*
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Hello Khadeer, I'd like to talk about a project..."
                  disabled={loading}
                  className={`w-full px-5 py-3.5 rounded-xl bg-white/5 border ${
                    errors.message ? "border-rose-500/80" : "border-white/10 focus:border-accent/60"
                  } text-sm text-white placeholder:text-slate-500 focus:outline-none transition-colors backdrop-blur-sm resize-none`}
                />
                {errors.message && (
                  <span className="text-xs text-rose-400 flex items-center gap-1">
                    <MdErrorOutline /> Please enter at least 5 characters message.
                  </span>
                )}
              </div>

              {errorMessage && (
                <p className="text-xs text-rose-400 font-medium">{errorMessage}</p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-accent text-black font-bold text-sm uppercase tracking-wider hover:bg-accent/80 transition-all flex items-center justify-center gap-2 shadow-lg shadow-accent/20 disabled:opacity-50"
                data-cursor="disable"
              >
                {loading ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <MdSend className="text-base" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Quick Contact & Socials Bar */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <MdEmail className="text-accent text-base shrink-0" />
              <a href={`mailto:${config.contact.email}`} className="hover:text-accent transition-colors">
                {config.contact.email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MdLocationOn className="text-accent text-base shrink-0" />
              <span>{config.social.location}</span>
            </div>
            <div className="flex items-center gap-3">
              <a href={config.contact.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                <FaGithub />
              </a>
              <a href={config.contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                <FaLinkedinIn />
              </a>
              <a href={config.contact.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                <FaXTwitter />
              </a>
              <a href={config.contact.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Earth Globe Canvas */}
        <div className="lg:col-span-6 w-full flex items-center justify-center relative">
          <EarthCanvas />
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
