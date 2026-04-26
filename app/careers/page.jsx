'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Loader2, Sparkles, Upload, X,
  FileText, AlertCircle, CheckCircle2, ChevronRight, ChevronLeft,
} from 'lucide-react';

// ─── Constants ────────────────────────────────────────────────────────────────

const TOTAL_SECONDS = 20 * 60;
const STEP_NAMES = ['Who you are', 'Your background', 'How you think', 'Proof of work', 'Logistics'];

const STATIC_QUESTIONS = [
  { question: "A client's GBP just dropped from the local 3-pack. Walk us through your first 48 hours.", hint: 'Up to 200 words.' },
  { question: "A client's money page is stuck on page 2 for the target keyword. What are your first 3 moves?", hint: 'Up to 200 words.' },
  { question: 'How do you decide between building a new city or neighborhood page versus strengthening one that already exists?', hint: 'Up to 200 words.' },
  { question: 'A competitor with weaker backlinks is outranking your client locally. What is going on, and what do you do?', hint: 'Up to 200 words.' },
  { question: 'For a multi-location service business, how do you find and fix weak coverage zones?', hint: 'Up to 200 words.' },
];

const ROLES = [
  'Local SEO Specialist (GBP, citations, local rankings)',
  'Backlink Specialist (link building, outreach, digital PR)',
  'Content and On-page SEO',
  'Technical SEO',
  'SEO Generalist (full stack)',
  'Other',
];

const YEARS = ['Less than 1 year', '1 to 2 years', '3 to 4 years', '5 to 7 years', '8 or more years'];
const HOURS = ['Less than 10', '10 to 20', '20 to 30', '30 to 40', 'Full time — 40+'];

const INDUSTRIES = [
  'Roofing', 'Home Remodeling', 'Locksmith', 'HVAC / Plumbing',
  'Garage Doors', 'Medical / NEMT', 'Home Builders', 'Restaurants / Hospitality',
  'Legal', 'Ecommerce', 'B2B SaaS', 'Other local services',
];

const TOOLS = [
  'Ahrefs', 'Semrush', 'Local Falcon', 'BrightLocal',
  'Google Search Console', 'GA4', 'Screaming Frog', 'Surfer SEO',
  'Frase', 'GBP Manager', 'Looker Studio', 'Other',
];

// ─── Helper UI components ─────────────────────────────────────────────────────

function Field({ label, required, hint, error, children, className = '' }) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-200 mb-2">
        {label}
        {required && <span className="text-pink-400 ml-1">*</span>}
        {hint && <span className="block text-xs text-gray-500 mt-1 font-normal leading-relaxed">{hint}</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
          <AlertCircle className="w-3 h-3 flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass = (error) =>
  `w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 outline-none transition-all
   bg-white/[0.04] border focus:ring-2 focus:ring-[#667eea]/20 focus:border-[#667eea]
   ${error ? 'border-red-500/40' : 'border-white/[0.09]'}`;

function StyledInput({ error, ...props }) {
  return <input className={inputClass(error)} {...props} />;
}

function StyledTextarea({ error, minH = 120, ...props }) {
  return (
    <textarea
      className={inputClass(error)}
      style={{ minHeight: minH, resize: 'vertical', lineHeight: 1.6 }}
      {...props}
    />
  );
}

const ARROW_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none' stroke='%236b7280' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M1 1l5 5 5-5'/%3E%3C/svg%3E")`;

function StyledSelect({ error, children, ...props }) {
  return (
    <select
      className={inputClass(error)}
      style={{
        appearance: 'none',
        backgroundImage: ARROW_SVG,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 14px center',
        paddingRight: '36px',
      }}
      {...props}
    >
      {children}
    </select>
  );
}

function CheckItem({ checked, onChange, children }) {
  return (
    <label
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all text-sm select-none
        ${checked
          ? 'bg-[#667eea]/10 border-[#667eea]/50 text-white'
          : 'bg-white/[0.02] border-white/[0.08] text-gray-300 hover:border-white/20 hover:bg-white/[0.04]'}`}
    >
      <span
        className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-all ${
          checked ? 'bg-gradient-to-br from-[#667eea] to-[#764ba2]' : 'border border-gray-600'
        }`}
      >
        {checked && (
          <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
            <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      {children}
    </label>
  );
}

function WordCounter({ text, max }) {
  const count = text.trim() ? text.trim().split(/\s+/).length : 0;
  return (
    <div className={`flex justify-end mt-1.5 text-xs ${count > max ? 'text-amber-400' : 'text-gray-600'}`}>
      {count} / {max} words
    </div>
  );
}

function formatTime(s) {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

function formatBytes(b) {
  if (b < 1024) return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(0)} KB`;
  return `${(b / (1024 * 1024)).toFixed(1)} MB`;
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function CareersPage() {
  const [step, setStep] = useState(1);
  const [timeLeft, setTimeLeft] = useState(TOTAL_SECONDS);
  const [expired, setExpired] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [aiQuestions, setAiQuestions] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiUsed, setAiUsed] = useState(false);
  const [errors, setErrors] = useState({});
  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', locationTz: '',
    role: '', years: '', industries: [], tools: [], hours: '',
    q1: '', q2: '', q3: '', q4: '', q5: '',
    projectContext: '', timeline: '', storyFull: '', biggestUnlock: '',
    rate: '', startDate: '', links: '', other: '', confirmed: false,
  });

  // Timer countdown
  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { clearInterval(id); setExpired(true); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const setField = useCallback((key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => { const next = { ...prev }; delete next[key]; return next; });
  }, []);

  const toggleArray = useCallback((key, value) => {
    setForm((prev) => {
      const arr = prev[key];
      return { ...prev, [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value] };
    });
    setErrors((prev) => { const next = { ...prev }; delete next[key]; return next; });
  }, []);

  const validate = (stepNum) => {
    const errs = {};
    if (stepNum === 1) {
      if (!form.firstName.trim()) errs.firstName = 'Required';
      if (!form.lastName.trim()) errs.lastName = 'Required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Valid email required';
      if (!form.phone.trim()) errs.phone = 'Required';
      if (!form.locationTz.trim()) errs.locationTz = 'Required';
    } else if (stepNum === 2) {
      if (!form.role) errs.role = 'Please select one';
      if (!form.years) errs.years = 'Please select one';
      if (!form.industries.length) errs.industries = 'Pick at least one';
      if (!form.tools.length) errs.tools = 'Pick at least one';
      if (!form.hours) errs.hours = 'Please select one';
    } else if (stepNum === 3) {
      if (!form.q1.trim()) errs.q1 = 'Required';
      if (!form.q2.trim()) errs.q2 = 'Required';
      if (!form.q3.trim()) errs.q3 = 'Required';
      if (!form.q4.trim()) errs.q4 = 'Required';
      if (!form.q5.trim()) errs.q5 = 'Required';
    } else if (stepNum === 4) {
      if (!form.projectContext.trim()) errs.projectContext = 'Required';
      if (!form.timeline.trim()) errs.timeline = 'Required';
      if (!form.storyFull.trim()) errs.storyFull = 'Required';
      if (!form.biggestUnlock.trim()) errs.biggestUnlock = 'Required';
      if (!files.length) errs.files = 'Upload at least one proof file';
    } else if (stepNum === 5) {
      if (!form.rate.trim()) errs.rate = 'Required';
      if (!form.startDate.trim()) errs.startDate = 'Required';
      if (!form.confirmed) errs.confirmed = 'You need to confirm to submit';
    }
    return errs;
  };

  const addFiles = useCallback((incoming) => {
    const valid = incoming.filter((f) => f.size <= 25 * 1024 * 1024);
    setFiles((prev) => [...prev, ...valid]);
    setErrors((prev) => { const next = { ...prev }; delete next.files; return next; });
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    addFiles(Array.from(e.dataTransfer.files));
  }, [addFiles]);

  const handleNext = async () => {
    const errs = validate(step);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    // After step 2, fetch AI-tailored questions
    if (step === 2 && !aiQuestions) {
      setAiLoading(true);
      try {
        const res = await fetch('/api/ai-questions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ role: form.role, years: form.years, industries: form.industries, tools: form.tools }),
        });
        const data = await res.json();
        if (data.questions && Array.isArray(data.questions) && data.questions.length === 5) {
          setAiQuestions(data.questions);
          setAiUsed(true);
        }
      } catch {
        // Fall back to static questions silently
      } finally {
        setAiLoading(false);
      }
    }

    if (step < 5) {
      setStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      await handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((s) => s - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (Array.isArray(value)) value.forEach((v) => fd.append(key, v));
        else fd.append(key, String(value));
      });
      const qs = (aiQuestions || STATIC_QUESTIONS).map((q) =>
        typeof q === 'string' ? q : q.question
      );
      fd.append('questions', JSON.stringify(qs));
      files.forEach((f) => fd.append('files', f));

      const res = await fetch('/api/apply', { method: 'POST', body: fd });
      if (!res.ok) throw new Error('failed');
      setSubmitted(true);
    } catch {
      setSubmitError('Something went wrong. Email us directly at yarden@jzsmartmedia.com');
    } finally {
      setSubmitting(false);
    }
  };

  const activeQuestions = aiQuestions || STATIC_QUESTIONS;
  const qFields = ['q1', 'q2', 'q3', 'q4', 'q5'];

  const timerStyle =
    timeLeft <= 60
      ? { background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.5)', color: '#f87171' }
      : timeLeft <= 300
      ? { background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.4)', color: '#fbbf24' }
      : { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#9ca3af' };

  // ─── Expired screen ──────────────────────────────────────────────────────────
  if (expired) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{ background: '#0a0a0a', fontFamily: 'var(--font-dm-sans), sans-serif' }}>
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <h2 className="text-3xl font-black text-white mb-3" style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}>Time is up.</h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            This application link has expired. The 20-minute window helps us see how you work under real conditions.
            If you would still like to apply, reach out for a fresh link.
          </p>
          <a
            href="mailto:yarden@jzsmartmedia.com?subject=Fresh Application Link Request"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}
          >
            Request a fresh link
          </a>
        </div>
      </div>
    );
  }

  // ─── Submitted screen ────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{ background: '#0a0a0a', fontFamily: 'var(--font-dm-sans), sans-serif' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="text-center max-w-md"
        >
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)' }}>
            <CheckCircle2 className="w-7 h-7 text-emerald-400" />
          </div>
          <h2 className="text-3xl font-black text-white mb-3" style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}>Application received.</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            We review every application personally. You will hear from us within 5 business days — usually faster.
            Check your email and WhatsApp.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link
              href="/"
              className="px-6 py-3 rounded-full text-sm font-medium text-gray-400 hover:text-white transition-colors"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              Back to site
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // ─── Main form ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen text-white" style={{ background: '#0a0a0a', fontFamily: 'var(--font-dm-sans), sans-serif' }}>

      {/* Header */}
      <header className="py-5 px-6 flex items-center justify-between max-w-3xl mx-auto border-b border-gray-800/60">
        <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        <div className="flex items-baseline gap-1.5 select-none">
          <span
            className="text-2xl font-black bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#f093fb] bg-clip-text text-transparent leading-none"
            style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}
          >
            JZ.
          </span>
          <span className="text-xs font-medium tracking-wide text-gray-400">Smart Media</span>
        </div>

        {/* Timer */}
        <div
          className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold tabular-nums transition-all ${timeLeft <= 60 ? 'animate-pulse' : ''}`}
          style={timerStyle}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          {formatTime(timeLeft)}
        </div>
      </header>

      <main className="px-6 pt-10 pb-24 max-w-3xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-10">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#a5b4fc] mb-3">SEO Specialist Application</p>
          <h1 className="text-4xl md:text-5xl font-black mb-3" style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}>
            Show us how you{' '}
            <span className="bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#f093fb] bg-clip-text text-transparent">actually</span>
            {' '}work.
          </h1>
          <p className="text-gray-400 text-sm max-w-lg mx-auto leading-relaxed">
            We hire people who can prove what they say. This takes about 15–20 minutes.
            The timer starts now — don't leave the tab.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-10">
          <div className="flex justify-between items-center text-xs text-gray-500 mb-2.5 font-medium uppercase tracking-wide">
            <span>Step {step} of 5</span>
            <span>{STEP_NAMES[step - 1]}</span>
          </div>
          <div className="h-px w-full rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #667eea, #764ba2, #f093fb)' }}
              initial={false}
              animate={{ width: `${(step / 5) * 100}%` }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            />
          </div>
        </div>

        {/* Form card */}
        <div className="rounded-2xl p-8 mb-8" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
            >

              {/* ── Step 1: Contact ──────────────────────────────────────────── */}
              {step === 1 && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}>First, the basics.</h2>
                  <p className="text-gray-400 text-sm mb-8">So we know who we're talking to and how to reach you.</p>

                  <div className="grid grid-cols-2 gap-4 mb-5">
                    <Field label="First name" required error={errors.firstName}>
                      <StyledInput
                        value={form.firstName} placeholder="Jordan"
                        onChange={(e) => setField('firstName', e.target.value)}
                        error={errors.firstName}
                      />
                    </Field>
                    <Field label="Last name" required error={errors.lastName}>
                      <StyledInput
                        value={form.lastName} placeholder="Smith"
                        onChange={(e) => setField('lastName', e.target.value)}
                        error={errors.lastName}
                      />
                    </Field>
                  </div>

                  <Field label="Email" required error={errors.email} className="mb-5">
                    <StyledInput
                      type="email" value={form.email} placeholder="you@domain.com"
                      onChange={(e) => setField('email', e.target.value)}
                      error={errors.email}
                    />
                  </Field>

                  <Field label="WhatsApp or phone (with country code)" required error={errors.phone} className="mb-5">
                    <StyledInput
                      type="tel" value={form.phone} placeholder="+1 555 555 5555"
                      onChange={(e) => setField('phone', e.target.value)}
                      error={errors.phone}
                    />
                  </Field>

                  <Field
                    label="Country and timezone" required error={errors.locationTz}
                    hint="Example: India (IST, UTC+5:30) or Philippines (PHT, UTC+8)"
                  >
                    <StyledInput
                      value={form.locationTz} placeholder="United States (EST, UTC-5)"
                      onChange={(e) => setField('locationTz', e.target.value)}
                      error={errors.locationTz}
                    />
                  </Field>
                </div>
              )}

              {/* ── Step 2: Background ───────────────────────────────────────── */}
              {step === 2 && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}>Your background.</h2>
                  <p className="text-gray-400 text-sm mb-8">Tell us what you actually do and where you've done it.</p>

                  <Field label="Role you are applying for" required error={errors.role} className="mb-5">
                    <StyledSelect
                      value={form.role} onChange={(e) => setField('role', e.target.value)}
                      error={errors.role}
                    >
                      <option value="">Select one...</option>
                      {ROLES.map((r) => <option key={r}>{r}</option>)}
                    </StyledSelect>
                  </Field>

                  <Field label="Years doing SEO professionally" required error={errors.years} className="mb-5">
                    <StyledSelect
                      value={form.years} onChange={(e) => setField('years', e.target.value)}
                      error={errors.years}
                    >
                      <option value="">Select one...</option>
                      {YEARS.map((y) => <option key={y}>{y}</option>)}
                    </StyledSelect>
                  </Field>

                  <Field
                    label="Industries you have actually worked in" required error={errors.industries}
                    hint="Pick everything you have hands-on experience with. We will ask for proof."
                    className="mb-5"
                  >
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      {INDUSTRIES.map((ind) => (
                        <CheckItem
                          key={ind}
                          checked={form.industries.includes(ind)}
                          onChange={() => toggleArray('industries', ind)}
                        >
                          {ind}
                        </CheckItem>
                      ))}
                    </div>
                  </Field>

                  <Field label="Tools you use day to day" required error={errors.tools} className="mb-5">
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      {TOOLS.map((tool) => (
                        <CheckItem
                          key={tool}
                          checked={form.tools.includes(tool)}
                          onChange={() => toggleArray('tools', tool)}
                        >
                          {tool}
                        </CheckItem>
                      ))}
                    </div>
                  </Field>

                  <Field label="Hours per week you can commit" required error={errors.hours}>
                    <StyledSelect
                      value={form.hours} onChange={(e) => setField('hours', e.target.value)}
                      error={errors.hours}
                    >
                      <option value="">Select one...</option>
                      {HOURS.map((h) => <option key={h}>{h}</option>)}
                    </StyledSelect>
                  </Field>
                </div>
              )}

              {/* ── Step 3: How you think ────────────────────────────────────── */}
              {step === 3 && (
                <div>
                  <div className="flex items-start justify-between gap-4 mb-1">
                    <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}>How you think.</h2>
                    {aiUsed && (
                      <div
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium flex-shrink-0"
                        style={{ background: 'rgba(102,126,234,0.12)', border: '1px solid rgba(102,126,234,0.25)', color: '#a5b4fc' }}
                      >
                        <Sparkles className="w-3 h-3" />
                        AI-tailored
                      </div>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm mb-8">
                    {aiUsed
                      ? `Five questions tailored to your ${form.role.split(' ')[0]} background and ${form.industries.slice(0, 2).join(' / ')} experience. Be specific — generic answers will not pass.`
                      : 'Five scenario questions. Be specific — generic answers will not pass this stage.'}
                  </p>

                  {activeQuestions.map((q, i) => {
                    const field = qFields[i];
                    const question = typeof q === 'string' ? q : q.question;
                    const hint = typeof q === 'string' ? 'Up to 200 words.' : q.hint;
                    return (
                      <Field
                        key={i}
                        label={`${i + 1}. ${question}`}
                        required
                        hint={hint}
                        error={errors[field]}
                        className="mb-7"
                      >
                        <StyledTextarea
                          value={form[field]}
                          onChange={(e) => setField(field, e.target.value)}
                          error={errors[field]}
                          minH={140}
                        />
                        <WordCounter text={form[field]} max={200} />
                      </Field>
                    );
                  })}
                </div>
              )}

              {/* ── Step 4: Proof of work ────────────────────────────────────── */}
              {step === 4 && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}>Proof of work.</h2>
                  <p className="text-gray-400 text-sm mb-8">
                    Pick one project from the last 60 days. We want the full picture, not the highlights reel.
                    If you have an NDA, anonymize the client name but keep the data real.
                  </p>

                  <Field
                    label="Project context" required error={errors.projectContext}
                    hint='Example: "Roofing company in Atlanta, 12 location service area"'
                    className="mb-5"
                  >
                    <StyledInput
                      value={form.projectContext}
                      placeholder='Locksmith in Phoenix, single-location'
                      onChange={(e) => setField('projectContext', e.target.value)}
                      error={errors.projectContext}
                    />
                  </Field>

                  <Field
                    label="Engagement timeline" required error={errors.timeline}
                    hint="When did you start, and what date are the most recent results from?"
                    className="mb-5"
                  >
                    <StyledInput
                      value={form.timeline}
                      placeholder="Started Feb 12 2025, results pulled Apr 22 2026"
                      onChange={(e) => setField('timeline', e.target.value)}
                      error={errors.timeline}
                    />
                  </Field>

                  <Field
                    label="The full story: BEFORE, WHAT YOU DID, AFTER"
                    required error={errors.storyFull}
                    hint="Use this exact structure. Include real numbers — rankings, organic traffic, GBP views, leads, calls. Up to 500 words."
                    className="mb-2"
                  >
                    <StyledTextarea
                      value={form.storyFull}
                      placeholder={"BEFORE\nDescribe the starting state with specific metrics.\n\nWHAT YOU DID\nWalk through your actual actions. Strategy, tactics, tools. Be specific.\n\nAFTER\nCurrent state with the same metrics as your BEFORE."}
                      onChange={(e) => setField('storyFull', e.target.value)}
                      error={errors.storyFull}
                      minH={200}
                    />
                  </Field>
                  <WordCounter text={form.storyFull} max={500} />

                  <Field
                    label="The single biggest unlock that moved the needle"
                    required error={errors.biggestUnlock}
                    hint="One or two sentences — the thing you did that mattered most."
                    className="mt-5 mb-6"
                  >
                    <StyledTextarea
                      value={form.biggestUnlock}
                      onChange={(e) => setField('biggestUnlock', e.target.value)}
                      error={errors.biggestUnlock}
                      minH={80}
                    />
                  </Field>

                  {/* File upload */}
                  <Field
                    label="Upload proof files" required error={errors.files}
                    hint="Rank tracker screenshots, GSC, GA4, Local Falcon scans, Ahrefs charts, GBP insights. Multiple files OK. PDF, PNG, JPG, DOC. Max 25 MB each."
                  >
                    <div
                      className={`mt-1 rounded-xl border-2 border-dashed p-8 text-center cursor-pointer transition-all ${
                        dragging
                          ? 'border-[#667eea]/70 bg-[#667eea]/05'
                          : errors.files
                          ? 'border-red-500/40 hover:border-red-500/60'
                          : 'border-white/10 hover:border-white/20 hover:bg-white/[0.02]'
                      }`}
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                      onDragLeave={() => setDragging(false)}
                      onDrop={handleDrop}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept=".pdf,.png,.jpg,.jpeg,.doc,.docx,.xlsx,.csv,.webp"
                        className="hidden"
                        onChange={(e) => { if (e.target.files) addFiles(Array.from(e.target.files)); }}
                      />
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                        style={{ background: 'rgba(102,126,234,0.12)', border: '1px solid rgba(102,126,234,0.2)' }}
                      >
                        <Upload className="w-5 h-5 text-[#a5b4fc]" />
                      </div>
                      <p className="text-sm text-gray-300 font-medium mb-1">Drop files or click to upload</p>
                      <p className="text-xs text-gray-600">Max 25 MB per file</p>
                    </div>

                    {files.length > 0 && (
                      <div className="mt-3 flex flex-col gap-2">
                        {files.map((file, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl"
                            style={{ background: 'rgba(102,126,234,0.08)', border: '1px solid rgba(102,126,234,0.15)' }}
                          >
                            <FileText className="w-4 h-4 text-[#a5b4fc] flex-shrink-0" />
                            <span className="text-sm text-white flex-1 truncate">{file.name}</span>
                            <span className="text-xs text-gray-500 flex-shrink-0">{formatBytes(file.size)}</span>
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); setFiles((prev) => prev.filter((_, idx) => idx !== i)); }}
                              className="text-gray-600 hover:text-gray-300 transition-colors flex-shrink-0"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </Field>
                </div>
              )}

              {/* ── Step 5: Logistics ────────────────────────────────────────── */}
              {step === 5 && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}>Last bit. Logistics.</h2>
                  <p className="text-gray-400 text-sm mb-8">Almost done. This decides if we're aligned on rate and timing.</p>

                  <div className="grid grid-cols-2 gap-4 mb-5">
                    <Field label="Expected hourly rate (USD)" required error={errors.rate}>
                      <StyledInput
                        value={form.rate} placeholder="e.g. $15 per hour"
                        onChange={(e) => setField('rate', e.target.value)}
                        error={errors.rate}
                      />
                    </Field>
                    <Field label="Earliest start date" required error={errors.startDate}>
                      <StyledInput
                        value={form.startDate} placeholder="Apr 28 2026 or immediately"
                        onChange={(e) => setField('startDate', e.target.value)}
                        error={errors.startDate}
                      />
                    </Field>
                  </div>

                  <Field
                    label="Portfolio, LinkedIn, or case study links"
                    hint="One per line. Optional but helpful."
                    className="mb-5"
                  >
                    <StyledTextarea
                      value={form.links}
                      placeholder={"https://linkedin.com/in/yourprofile\nhttps://yourportfolio.com"}
                      onChange={(e) => setField('links', e.target.value)}
                      minH={80}
                    />
                  </Field>

                  <Field label="Anything else we should know" hint="Optional." className="mb-6">
                    <StyledTextarea
                      value={form.other}
                      onChange={(e) => setField('other', e.target.value)}
                      minH={80}
                    />
                  </Field>

                  {/* Confirmation */}
                  <label
                    className={`flex items-start gap-4 p-5 rounded-xl border cursor-pointer transition-all ${
                      form.confirmed
                        ? 'bg-[#667eea]/08 border-[#667eea]/40'
                        : errors.confirmed
                        ? 'bg-red-500/05 border-red-500/30'
                        : 'bg-white/[0.02] border-white/[0.08] hover:border-white/15'
                    }`}
                  >
                    <span
                      className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-all ${
                        form.confirmed ? 'bg-gradient-to-br from-[#667eea] to-[#764ba2]' : 'border border-gray-600'
                      }`}
                    >
                      {form.confirmed && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={form.confirmed}
                      onChange={(e) => setField('confirmed', e.target.checked)}
                    />
                    <span className="text-sm text-gray-300 leading-relaxed">
                      I confirm everything I have submitted is my own work and accurate to the best of my knowledge.
                      I understand JZ Smart Media will verify submitted proofs and may contact references.
                    </span>
                  </label>
                  {errors.confirmed && (
                    <p className="mt-2 flex items-center gap-1 text-xs text-red-400">
                      <AlertCircle className="w-3 h-3" />{errors.confirmed}
                    </p>
                  )}

                  {submitError && (
                    <div
                      className="mt-5 px-4 py-3 rounded-xl text-sm text-red-300"
                      style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}
                    >
                      {submitError}
                    </div>
                  )}
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={handleBack}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all ${
              step === 1 ? 'invisible' : 'text-gray-400 hover:text-white border border-white/10 hover:border-white/20'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={submitting || aiLoading}
            className="flex items-center gap-2 px-8 py-3 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}
          >
            {aiLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Tailoring your questions…
              </>
            ) : submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting…
              </>
            ) : step === 5 ? (
              <>Submit application <ChevronRight className="w-4 h-4" /></>
            ) : (
              <>Next <ChevronRight className="w-4 h-4" /></>
            )}
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="py-8 px-6 text-center text-sm text-gray-500 mt-4"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="flex items-baseline justify-center gap-1.5 mb-3">
          <span
            className="text-xl font-black bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#f093fb] bg-clip-text text-transparent"
            style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}
          >
            JZ.
          </span>
          <span className="text-xs font-medium tracking-wide text-gray-500">Smart Media</span>
        </div>
        <p>© 2026 JZ Smart Media · Miami, FL · (352) 755-6501</p>
        <p className="mt-1">
          <a href="mailto:info@jzsmartmedia.com" className="hover:text-gray-400 transition-colors">
            info@jzsmartmedia.com
          </a>
        </p>
      </footer>
    </div>
  );
}
