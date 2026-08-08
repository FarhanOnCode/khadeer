"use client";

import { useState, useRef, FormEvent, ChangeEvent, useEffect } from "react";
import EarthCanvas from "./canvas/EarthCanvas";
import StarsCanvas from "./canvas/StarsCanvas";
import { config } from "../config";
import { FaGithub, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { MdEmail, MdLocationOn, MdCheckCircle, MdErrorOutline } from "react-icons/md";

export const ContactSection = () => {
  const formRef = useRef<HTMLFormElement | null>(null);

  // Hide 3D human character avatar when Contact section is active so it never overlaps the 3D Earth globe
  useEffect(() => {
    const hideAvatar = () => {
      const charModels = document.querySelectorAll<HTMLElement>(".character-model, .character-container");
      charModels.forEach((el) => {
        el.style.display = "none";
      });
    };

    hideAvatar();
    const t1 = setTimeout(hideAvatar, 50);
    const t2 = setTimeout(hideAvatar, 300);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      const charModels = document.querySelectorAll<HTMLElement>(".character-model, .character-container");
      charModels.forEach((el) => {
        el.style.display = "block";
      });
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
    <section id="contact" className="relative w-full min-h-screen bg-[#050816] text-white overflow-hidden py-8 sm:py-16 px-4 sm:px-8 lg:px-12 flex items-center justify-center">
      {/* Space Stars Floating Background */}
      <StarsCanvas />

      {/* Main Section Content Wrapper (Centred 50-50 desktop grid layout) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col-reverse xl:flex-row gap-8 lg:gap-12 items-center justify-between">
        {/* Left Column: Form Card */}
        <div className="w-full xl:w-[48%] max-w-[540px] bg-[#100d25] p-6 sm:p-10 rounded-2xl border border-white/5 shadow-2xl mx-auto xl:mx-0">
          <p className="text-xs uppercase tracking-widest text-[#aaa6c3] font-semibold mb-1 font-geist">
            Get in Touch
          </p>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-wider mb-6 font-geist">
            Contact<span className="text-[#915eff]">.</span>
          </h2>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-[#151030] border border-[#915eff]/40 text-[#915eff] flex flex-col items-center gap-3 text-center animate-fadeIn">
              <MdCheckCircle className="text-4xl text-[#915eff]" />
              <h4 className="text-lg font-bold text-white">Thanks for contacting me.</h4>
              <p className="text-xs text-slate-300">
                Khadeer Shaik will get back to you soon!
              </p>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="mt-4 flex flex-col gap-5" noValidate>
              <label htmlFor="name" className="flex flex-col gap-2">
                <span className="text-white font-medium text-sm">Your Name*</span>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  disabled={loading}
                  className={`bg-[#151030] py-3.5 px-5 placeholder:text-slate-500 text-white rounded-lg outline-none border ${
                    errors.name ? "border-rose-500" : "border-transparent focus:border-[#915eff]/50"
                  } font-medium text-sm transition-all`}
                />
                {errors.name && (
                  <span className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                    <MdErrorOutline /> Invalid Name! (Min 3 characters)
                  </span>
                )}
              </label>

              <label htmlFor="email" className="flex flex-col gap-2">
                <span className="text-white font-medium text-sm">Your Email*</span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="johndoe@email.com"
                  disabled={loading}
                  className={`bg-[#151030] py-3.5 px-5 placeholder:text-slate-500 text-white rounded-lg outline-none border ${
                    errors.email ? "border-rose-500" : "border-transparent focus:border-[#915eff]/50"
                  } font-medium text-sm transition-all`}
                />
                {errors.email && (
                  <span className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                    <MdErrorOutline /> Invalid E-mail!
                  </span>
                )}
              </label>

              <label htmlFor="message" className="flex flex-col gap-2">
                <span className="text-white font-medium text-sm">Your Message*</span>
                <textarea
                  rows={5}
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Hello there!"
                  disabled={loading}
                  className={`bg-[#151030] py-3.5 px-5 placeholder:text-slate-500 text-white rounded-lg outline-none border ${
                    errors.message ? "border-rose-500" : "border-transparent focus:border-[#915eff]/50"
                  } font-medium text-sm transition-all resize-none`}
                />
                {errors.message && (
                  <span className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                    <MdErrorOutline /> Invalid Message! (Min 5 characters)
                  </span>
                )}
              </label>

              {errorMessage && (
                <p className="text-xs text-rose-400 font-medium">{errorMessage}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="bg-[#151030] border border-white/10 hover:bg-[#211a45] py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl cursor-pointer transition-all disabled:opacity-50 mt-1"
                data-cursor="disable"
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </form>
          )}

          {/* Quick Contact Footer Bar */}
          <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-[#aaa6c3]">
            <div className="flex items-center gap-2">
              <MdEmail className="text-[#915eff] text-base shrink-0" />
              <a href={`mailto:${config.contact.email}`} className="hover:text-white transition-colors truncate">
                {config.contact.email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MdLocationOn className="text-[#915eff] text-base shrink-0" />
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

        {/* Right Column: 3D Earth Globe Canvas (xl:w-[48%]) */}
        <div className="w-full xl:w-[48%] h-[320px] sm:h-[450px] xl:h-[580px] flex items-center justify-center relative">
          <EarthCanvas />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
