"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  ArrowRight, Check, ChevronRight, Activity, Zap, 
  Shield, Beaker, Pill, Droplet, Sparkles, Calendar, Stethoscope
} from 'lucide-react';

// --- Types & Data ---
type Med = { id: string; name: string; tag: string; desc: string };

const MED_LIBRARY: Record<string, Med[]> = {
  "Longevity": [
    { id: 'nad_inj', name: 'NAD+ Injection', tag: 'Cellular Fuel', desc: 'Direct mitochondrial support for cognitive clarity.' },
    { id: 'nad_nasal', name: 'NAD+ Nasal', tag: 'Rapid Uptake', desc: 'Immediate neuro-optimization via nasal mucosa.' },
    { id: 'nad_oral', name: 'NAD+ Next-Gen Oral', tag: 'Bio-Available', desc: 'Sublingual dropper for sustained daily energy.' },
    { id: 'sermorelin', name: 'Sermorelin Injection', tag: 'GH Secretagogue', desc: 'Stimulate natural growth hormone production.' },
    { id: 'b12_mic', name: 'B12 MIC Injection', tag: 'Metabolic', desc: 'Fat-burning lipotropics and B12 for energy.' },
  ],
  "Testosterone": [
    { id: 'trt_inj', name: 'Injectable TRT', tag: 'Gold Standard', desc: 'Clinical precision for energy and muscle recovery.' },
    { id: 'trt_oral', name: 'Oral TRT', tag: 'Non-Invasive', desc: 'Daily oral administration for hormone optimization.' },
    { id: 'enclo', name: 'Enclomiphene', tag: 'Fertility Safe', desc: 'Boost natural T while preserving spermatogenesis.' },
  ],
  "Menopause (HRT)": [
    { id: 'est_pill', name: 'Estradiol Pill', tag: 'Systemic', desc: 'Foundational estrogen replacement therapy.' },
    { id: 'prog', name: 'Progesterone', tag: 'Balance', desc: 'Essential for sleep quality and uterine health.' },
    { id: 'est_patch', name: 'Estradiol Patch', tag: 'Steady State', desc: 'Consistent transdermal delivery.' },
    { id: 'est_cream', name: 'Estradiol Cream', tag: 'Targeted', desc: 'Absorbs through skin for localized optimization.' },
    { id: 'non_h_parox', name: 'Paroxetine Pill', tag: 'Non-Hormonal', desc: 'Symptom relief for those avoiding hormones.' },
  ]
};

const DIAGNOSTIC_QUIZ = [
  {
    id: 'lifestyle',
    title: "Biological Friction",
    question: "Where do you feel the most 'drag' in your daily life?",
    options: [
      { id: 'physical', label: 'Physical Recovery', sub: 'Muscles feel sore longer than usual', rec: 'sermorelin' },
      { id: 'mental', label: 'Cognitive Fog', sub: 'Processing speed is down midday', rec: 'nad_inj' },
      { id: 'drive', label: 'Diminished Drive', sub: 'Low motivation and low libido', rec: 'trt_inj' }
    ]
  },
  {
    id: 'goal',
    title: "Target Output",
    question: "What is your primary optimization target?",
    options: [
      { id: 'longevity', label: 'Lifespan & Cellular Health', sub: 'Focusing on the long-term', rec: 'nad_inj' },
      { id: 'strength', label: 'Peak Physical Force', sub: 'Muscle density and power', rec: 'trt_inj' },
      { id: 'wellbeing', label: 'Hormonal Equilibrium', sub: 'Emotional and physical balance', rec: 'est_pill' }
    ]
  },
  {
    id: 'activity',
    title: "Exercise Load",
    question: "Describe your current physical training intensity:",
    options: [
      { id: 'heavy', label: 'High Intensity', sub: '4-6 days of heavy lifting/cardio', rec: 'trt_inj' },
      { id: 'moderate', label: 'Moderate Active', sub: 'Maintenance movement', rec: 'sermorelin' },
      { id: 'low', label: 'Sedentary / Recovery', sub: 'Focusing on base health', rec: 'b12_mic' }
    ]
  }
];

const containerVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      ease: [0.16, 1, 0.3, 1] as const 
    } 
  },
  exit: { opacity: 0, scale: 0.98, transition: { duration: 0.3 } }
};

export default function EnhancedFunnelV2() {
  const [step, setStep] = useState<'decision' | 'catalog' | 'quiz' | 'recommendation' | 'intake'>('decision');
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);
  const [selectedMed, setSelectedMed] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans overflow-x-hidden selection:bg-[#0033FF]/10">
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#0033ff05_1px,transparent_1px),linear-gradient(to_bottom,#0033ff05_1px,transparent_1px)] bg-[size:60px_60px]" />
      
      <main className="relative z-10 max-w-2xl mx-auto px-6 pt-20 pb-32">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: INITIAL DECISION */}
          {step === 'decision' && (
            <motion.div key="decision" variants={containerVariants} initial="initial" animate="animate" exit="exit" className="text-center">
              <h1 className="text-7xl font-black mb-12 tracking-tighter uppercase leading-[0.9]">
                Precision <br/><span className="text-[#0033FF]">Protocols</span>
              </h1>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#64748B] mb-12">Do you know what you want?</p>
              
              <div className="grid grid-cols-1 gap-4">
                <button 
                  onClick={() => setStep('catalog')}
                  className="group bg-white border border-slate-200 p-10 rounded-[2.5rem] hover:border-[#0033FF] transition-all flex items-center justify-between shadow-sm active:scale-[0.98]"
                >
                  <div className="text-left">
                    <span className="block text-2xl font-black uppercase tracking-tighter">Yes</span>
                    <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">I know my specific medication</span>
                  </div>
                  <ChevronRight className="text-[#0033FF] group-hover:translate-x-2 transition-transform" />
                </button>

                <button 
                  onClick={() => setStep('quiz')}
                  className="group bg-white border border-slate-200 p-10 rounded-[2.5rem] hover:border-[#0033FF] transition-all flex items-center justify-between shadow-sm active:scale-[0.98]"
                >
                  <div className="text-left">
                    <span className="block text-2xl font-black uppercase tracking-tighter">No</span>
                    <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Run the Diagnostic Quiz</span>
                  </div>
                  <ChevronRight className="text-[#0033FF] group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2A: CATALOG FLOW */}
          {step === 'catalog' && (
            <motion.div key="catalog" variants={containerVariants} initial="initial" animate="animate" exit="exit" className="space-y-12">
              <div className="flex justify-between items-end">
                <h2 className="text-4xl font-black uppercase tracking-tighter">Medication <br/><span className="text-[#0033FF]">Library</span></h2>
                <button onClick={() => setStep('decision')} className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Back</button>
              </div>

              <div className="space-y-16 pb-24">
                {Object.entries(MED_LIBRARY).map(([category, meds]) => (
                  <div key={category} className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="h-px flex-1 bg-slate-200" />
                      <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#64748B] whitespace-nowrap">{category}</h3>
                    </div>
                    <div className="grid gap-3">
                      {meds.map((med) => (
                        <button 
                          key={med.id}
                          onClick={() => setSelectedMed(med.id)}
                          className={`p-6 rounded-3xl border text-left transition-all ${selectedMed === med.id ? 'bg-[#0033FF] border-[#0033FF] text-white shadow-xl' : 'bg-white border-slate-100 hover:border-slate-300'}`}
                        >
                          <div className="flex justify-between items-start mb-1">
                            <span className="text-lg font-black uppercase tracking-tight">{med.name}</span>
                            <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-full ${selectedMed === med.id ? 'bg-white/20' : 'bg-[#0033FF]/5 text-[#0033FF]'}`}>{med.tag}</span>
                          </div>
                          <p className={`text-[11px] font-medium leading-relaxed ${selectedMed === med.id ? 'text-white/70' : 'text-slate-400'}`}>{med.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="fixed bottom-10 left-0 right-0 px-6 max-w-2xl mx-auto z-50">
                <button 
                  disabled={!selectedMed}
                  onClick={() => setStep('intake')}
                  className="w-full py-8 bg-[#0F172A] text-white rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-2xl disabled:opacity-20 active:scale-95 transition-all flex items-center justify-center gap-4"
                >
                  Initialize Intake <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2B: QUIZ FLOW */}
          {step === 'quiz' && (
            <motion.div key={`quiz-${currentQuizIdx}`} variants={containerVariants} initial="initial" animate="animate" exit="exit" className="space-y-12">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0033FF]">Metric 0{currentQuizIdx + 1}</span>
                  <div className="h-px flex-1 bg-slate-100" />
                </div>
                <h2 className="text-5xl font-black uppercase tracking-tighter leading-none">{DIAGNOSTIC_QUIZ[currentQuizIdx].title}</h2>
                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">{DIAGNOSTIC_QUIZ[currentQuizIdx].question}</p>
              </div>

              <div className="grid gap-4">
                {DIAGNOSTIC_QUIZ[currentQuizIdx].options.map((opt) => (
                  <button 
                    key={opt.id}
                    onClick={() => {
                      const newAnswers = [...quizAnswers, opt.rec];
                      setQuizAnswers(newAnswers);
                      if (currentQuizIdx < DIAGNOSTIC_QUIZ.length - 1) {
                        setCurrentQuizIdx(currentQuizIdx + 1);
                      } else {
                        setSelectedMed(opt.rec);
                        setStep('recommendation');
                      }
                    }}
                    className="p-8 bg-white border border-slate-200 rounded-3xl text-left hover:border-[#0033FF] transition-all group"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="block text-xl font-black uppercase tracking-tight mb-1">{opt.label}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{opt.sub}</span>
                      </div>
                      <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center group-hover:bg-[#0033FF] group-hover:text-white transition-all">
                        <ChevronRight size={16} />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* RECOMMENDATION PAGE */}
          {step === 'recommendation' && (
            <motion.div key="rec" variants={containerVariants} initial="initial" animate="animate" exit="exit" className="text-center space-y-10">
              <div className="inline-flex p-4 rounded-full bg-[#0033FF]/5 text-[#0033FF] mb-4">
                <Beaker size={32} />
              </div>
              <h1 className="text-5xl font-black uppercase tracking-tighter">Your Optimization <br/><span className="text-[#0033FF]">Foundry</span></h1>
              
              <div className="bg-white border-2 border-[#0033FF] p-10 rounded-[3rem] text-left relative overflow-hidden shadow-2xl">
                 <div className="relative z-10">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0033FF] mb-4 block">Recommended Protocol</span>
                    <h3 className="text-4xl font-black uppercase tracking-tighter mb-4">
                        {Object.values(MED_LIBRARY).flat().find(m => m.id === selectedMed)?.name}
                    </h3>
                    <p className="text-slate-500 font-medium leading-relaxed mb-8">
                        Based on your biological markers, this protocol is designed to eliminate drag and restore peak baseline efficiency.
                    </p>
                    <button 
                        onClick={() => setStep('intake')}
                        className="w-full py-6 bg-[#0033FF] text-white rounded-2xl font-black text-xs uppercase tracking-widest"
                    >
                        Accept Protocol & Begin Intake
                    </button>
                 </div>
                 <Zap className="absolute -bottom-8 -right-8 w-40 h-40 text-[#0033FF]/5" />
              </div>

              <button 
                onClick={() => setStep('catalog')}
                className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-[#0F172A] transition-colors"
              >
                Explore All Medications
              </button>
            </motion.div>
          )}

          {/* MEDICAL INTAKE START */}
          {step === 'intake' && (
            <motion.div key="intake" variants={containerVariants} initial="initial" animate="animate" exit="exit" className="space-y-8 text-center py-10">
              <div className="w-20 h-20 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/20">
                <Shield size={32} />
              </div>
              <h1 className="text-6xl font-black uppercase tracking-tighter">Clinical <br/>Verification.</h1>
              <p className="text-slate-500 font-medium max-w-sm mx-auto">
                We must verify your clinical suitability before proceeding with your protocol.
              </p>
              
              <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] space-y-4">
                <div className="flex items-center gap-4 text-left p-4 bg-slate-50 rounded-2xl">
                    <div className="w-8 h-8 rounded-full bg-[#0033FF] text-white flex items-center justify-center text-[10px] font-bold">01</div>
                    <span className="text-[10px] font-black uppercase tracking-widest">Personal Identification</span>
                </div>
                <div className="flex items-center gap-4 text-left p-4 bg-slate-50 rounded-2xl opacity-40">
                    <div className="w-8 h-8 rounded-full bg-slate-300 text-white flex items-center justify-center text-[10px] font-bold">02</div>
                    <span className="text-[10px] font-black uppercase tracking-widest">Medical History Sequence</span>
                </div>
              </div>

              <button className="w-full py-8 bg-[#0F172A] text-white rounded-full font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-4 transition-all hover:scale-[1.01] active:scale-[0.98]">
                Start Verification <ArrowRight size={18} />
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}