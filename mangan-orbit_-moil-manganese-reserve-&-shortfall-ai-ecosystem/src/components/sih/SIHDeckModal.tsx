import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight, Presentation, CheckCircle, ShieldAlert, Award, FileText, Layers, TrendingUp, Sparkles, ExternalLink } from "lucide-react";
import { SIH_PPT_SLIDES } from "../../data/mockData.ts";

interface SIHDeckModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SIHDeckModal: React.FC<SIHDeckModalProps> = ({ isOpen, onClose }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  if (!isOpen) return null;

  const currentSlide = SIH_PPT_SLIDES[currentSlideIndex];

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : SIH_PPT_SLIDES.length - 1));
  };

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev < SIH_PPT_SLIDES.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg border border-amber-500/20">
              <Presentation className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white tracking-wide">
                  Smart India Hackathon 2026 Presentation Deck
                </h2>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono font-semibold border border-amber-500/30">
                  SIH26009
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Team NeuroSpark Astra (CSPIT-SIH-951352) • MOIL Limited
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 text-xs text-slate-300">
              <span>Slide {currentSlideIndex + 1} of {SIH_PPT_SLIDES.length}</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Slide Canvas Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-6 sm:p-8 shadow-inner min-h-[480px] flex flex-col justify-between">
            {/* Top Slide Meta */}
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-950/40 border border-amber-500/30 px-2.5 py-1 rounded">
                    {currentSlide.badge}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    Team NeuroSpark Astra
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-slate-500">
                    SLIDE 0{currentSlide.slideNumber} / 06
                  </span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-1">
                {currentSlide.title}
              </h1>
              <p className="text-sm sm:text-base font-medium text-amber-300/90 mb-6">
                {currentSlide.subtitle}
              </p>

              {/* Sections render */}
              <div className="space-y-6">
                {currentSlide.sections.map((section, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/90"
                  >
                    <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wide flex items-center gap-2 mb-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                      {section.heading}
                    </h3>
                    {section.content && (
                      <p className="text-xs sm:text-sm text-slate-300 mb-3 leading-relaxed font-mono bg-slate-950/60 p-2.5 rounded border border-slate-800/60">
                        {section.content}
                      </p>
                    )}
                    {section.bullets && (
                      <ul className="space-y-1.5">
                        {section.bullets.map((bullet, bIdx) => (
                          <li
                            key={bIdx}
                            className="text-xs sm:text-sm text-slate-300 flex items-start gap-2 leading-relaxed"
                          >
                            <span className="text-amber-400 font-bold mt-0.5">•</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {section.highlights && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mt-3 pt-3 border-t border-slate-800/60">
                        {section.highlights.map((hl, hIdx) => (
                          <div
                            key={hIdx}
                            className="bg-slate-950 p-2 rounded-lg border border-slate-800 text-center"
                          >
                            <span className="block text-[10px] uppercase text-slate-400 font-mono">
                              {hl.label}
                            </span>
                            <span className="text-xs font-bold text-amber-300">
                              {hl.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Slide Footer */}
            {currentSlide.footerNote && (
              <div className="mt-8 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
                <span>{currentSlide.footerNote}</span>
                <span className="font-mono text-[11px] text-amber-400/70">
                  SMART INDIA HACKATHON 2026 • MOIL LIMITED
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Controls Bottom Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-t border-slate-800">
          <div className="flex items-center gap-1 sm:gap-2">
            {SIH_PPT_SLIDES.map((slide, idx) => (
              <button
                key={slide.slideNumber}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`w-7 h-7 sm:w-8 sm:h-8 text-xs font-mono font-bold rounded-lg border transition-all ${
                  idx === currentSlideIndex
                    ? "bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20"
                    : "bg-slate-800/80 text-slate-400 border-slate-700 hover:bg-slate-800 hover:text-white"
                }`}
                title={slide.title}
              >
                0{slide.slideNumber}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-slate-700 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous</span>
            </button>
            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg border border-amber-400 transition-all shadow-md shadow-amber-500/10"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
