"use client";

import { useState, useRef, FormEvent, ChangeEvent, useEffect } from "react";
import EarthCanvas from "./canvas/EarthCanvas";
import StarsCanvas from "./canvas/StarsCanvas";
import { config } from "../config";
import { FaGithub, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { MdEmail, MdLocationOn, MdCheckCircle, MdErrorOutline } from "react-icons/md";

export const ContactSection = () => {
  const formRef = useRef<HTMLFormElement | null>(null);

  // Hide 3D character avatar when Contact section is active so it doesn't overlap the Earth globe
  useEffect(() => {
    const charModel = document.querySelector(".character-model") as HTMLElement;
    if (charModel) {
      charModel.style.opacity = "0";
      charModel.style.pointerEvents = "none";
    }
    return () => {
      if (charModel) {
        charModel.style.opacity = "1";
        charModel.style.pointerEvents = "auto";
      }
    };
  }, []);

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
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setErrorMessage("Something went wrong while sending message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#050816] text-white overflow-hidden py-12 sm:py-20 px-4 sm:px-12 flex items-center justify-center">
      {/* Floating Space Stars Background */}
      <StarsCanvas />

      {/* Main Grid Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Dark Purple Form Card (Matching Reference Image 2) */}
        <div className="xl:col-span-6 w-full rounded-2xl bg-[#100d25] border border-white/5 p-8 sm:p-10 shadow-2xl">
          {/* Header Subtitle & Title */}
          <div className="space-y-1 mb-8">
            <p className="text-xs uppercase tracking-widest text-[#aaa6c3] font-semibold">
              Get in Touch
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-wider">
              Contact<span className="text-[#915eff]">.</span>
            </h2>
          </div>

          {/* Form / Submitted Notice */}
          {submitted ? (
            <div className="p-6 rounded-2xl bg-[#151030] border border-[#915eff]/40 text-[#915eff] flex flex-col items-center gap-3 text-center animate-fadeIn">
              <MdCheckCircle className="text-4xl text-[#915eff]" />
              <h4 className="text-lg font-bold text-white">Thanks for contacting me.</h4>
              <p className="text-xs text-slate-300">
                Khadeer Shaik will get back to you soon!
              </p>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* Name Field */}
              <div className="flex flex-col gap-2">
                <span className="text-white font-medium text-sm">Your Name*</span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  disabled={loading}
                  className={`bg-[#151030] py-4 px-6 placeholder:text-slate-500 text-white rounded-lg outline-none border ${
                    errors.name ? "border-rose-500" : "border-transparent focus:border-[#915eff]/50"
                  } font-medium text-sm transition-all`}
                />
                {errors.name && (
                  <span className="text-xs text-rose-400 flex items-center gap-1">
                    <MdErrorOutline /> Invalid Name! (Min 3 characters)
                  </span>
                )}
              </div>

              {/* Email Field */}
              <div className="flex flex-col gap-2">
                <span className="text-white font-medium text-sm">Your Email*</span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="johndoe@email.com"
                  disabled={loading}
                  className={`bg-[#151030] py-4 px-6 placeholder:text-slate-500 text-white rounded-lg outline-none border ${
                    errors.email ? "border-rose-500" : "border-transparent focus:border-[#915eff]/50"
                  } font-medium text-sm transition-all`}
                />
                {errors.email && (
                  <span className="text-xs text-rose-400 flex items-center gap-1">
                    <MdErrorOutline /> Invalid E-mail!
                  </span>
                )}
              </div>

              {/* Message Field */}
              <div className="flex flex-col gap-2">
                <span className="text-white font-medium text-sm">Your Message*</span>
                <textarea
                  rows={6}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Hello there!"
                  disabled={loading}
                  className={`bg-[#151030] py-4 px-6 placeholder:text-slate-500 text-white rounded-lg outline-none border ${
                    errors.message ? "border-rose-500" : "border-transparent focus:border-[#915eff]/50"
                  } font-medium text-sm transition-all resize-none`}
                />
                {errors.message && (
                  <span className="text-xs text-rose-400 flex items-center gap-1">
                    <MdErrorOutline /> Invalid Message! (Min 5 characters)
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
                className="bg-[#151030] border border-white/10 hover:bg-[#211a45] py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl cursor-pointer transition-all disabled:opacity-50"
                data-cursor="disable"
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </form>
          )}

          {/* Contact Details Footer */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-[#aaa6c3]">
            <div className="flex items-center gap-2">
              <MdEmail className="text-[#915eff] text-base" />
              <a href={`mailto:${config.contact.email}`} className="hover:text-white transition-colors">
                {config.contact.email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MdLocationOn className="text-[#915eff] text-base" />
              <span>{config.social.location}</span>
            </div>
            <div className="flex items-center gap-3">
              <a href={config.contact.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <FaGithub />
              </a>
              <a href={config.contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <FaLinkedinIn />
              </a>
              <a href={config.contact.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <FaXTwitter />
              </a>
              <a href={config.contact.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Earth Planet Model */}
        <div className="xl:col-span-6 w-full flex items-center justify-center h-[400px] sm:h-[500px] xl:h-[600px] relative">
          <EarthCanvas />
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
