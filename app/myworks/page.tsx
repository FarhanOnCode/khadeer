"use client";

import { config } from "@/src/config";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";

export default function MyWorksPage() {
  return (
    <div className="myworks-page min-h-screen bg-[#0b080c] text-white flex flex-col justify-between relative overflow-hidden pt-28">
      <Navbar />

      <div className="p-6 sm:p-12 flex-1">
        <div className="myworks-header max-w-6xl mx-auto space-y-4 mb-12">
          <h1 className="text-4xl sm:text-6xl font-bold uppercase tracking-wider font-geist">
            All <span className="text-accent">Works</span>
          </h1>
          <p className="text-lg text-slate-300 font-light">A collection of all my projects and creations</p>
        </div>

        <div className="myworks-grid max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {config.projects.map((project, index) => (
            <div className="myworks-card group relative p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-accent/50 transition-all duration-300 backdrop-blur-sm flex flex-col justify-between" key={project.id} data-cursor="disable">
              <div className="myworks-card-number text-3xl font-bold text-accent font-geist mb-4">0{index + 1}</div>
              <div className="myworks-card-image w-full h-48 sm:h-64 rounded-2xl overflow-hidden mb-6">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="myworks-card-info space-y-2">
                <h3 className="text-2xl font-bold text-white font-geist">{project.title}</h3>
                <p className="myworks-card-category text-xs uppercase tracking-widest text-accent font-semibold">{project.category}</p>
                <p className="myworks-card-description text-sm text-slate-300 font-light">{project.description}</p>
                <p className="myworks-card-tech text-xs text-slate-400 font-mono pt-2">{project.technologies}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
