'use client';

import { useEffect, useRef, useState, Fragment } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Menu, X, Sun, Moon, ArrowRight, Sparkles, Target,
  Code, Rocket, CheckCircle, Star,
  Mail, MapPin, Phone, ChevronLeft, ChevronRight, Globe,
  Settings, Brain, FileText, PieChart,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─── Moving comet border — section pill badges ─────────────────────────── */
function CometBadge({ children, isDark }) {
  return (
    <div className="relative inline-flex mb-6" style={{ padding: '2px', borderRadius: '9999px', overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          width: '200%',
          height: '200%',
          top: '-50%',
          left: '-50%',
          background:
            'conic-gradient(from 0deg at 50% 50%, transparent 60%, rgba(102,126,234,1) 72%, rgba(240,147,251,1) 84%, transparent 94%)',
          animation: 'comet-spin 3s linear infinite',
        }}
      />
      <div className={`relative z-10 px-4 py-2 rounded-full ${isDark ? 'bg-[#0f0f0f]' : 'bg-white'}`}>
        {children}
      </div>
    </div>
  );
}

/* ─── Moving comet border — content cards ───────────────────────────────── */
function CometCard({ children, className = '', duration = '4s', delay = '0s', hoverY = -5, innerBg = '' }) {
  return (
    <motion.div
      whileHover={hoverY !== 0 ? { y: hoverY } : undefined}
      className="relative h-full"
      style={{ padding: '2px', borderRadius: '1.5rem', overflow: 'hidden' }}
    >
      <div
        style={{
          position: 'absolute',
          width: '200%',
          height: '200%',
          top: '-50%',
          left: '-50%',
          background:
            'conic-gradient(from 0deg at 50% 50%, transparent 60%, rgba(102,126,234,1) 72%, rgba(240,147,251,1) 84%, transparent 94%)',
          animation: `comet-spin ${duration} linear ${delay} infinite`,
        }}
      />
      <div className={`relative z-10 h-full w-full rounded-[calc(1.5rem-2px)] ${innerBg} ${className}`}>
        {children}
      </div>
    </motion.div>
  );
}

/* ─── Main Page Component ────────────────────────────────────────────────── */
export default function JZSmartMediaLanding() {
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const [serviceIndex, setServiceIndex] = useState(0);
  const [projectIndex, setProjectIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: '', business: '', phone: '', email: '', industry: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', phone: '', email: '', industry: '' });
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSubmitted(true);
  };

  const setField = (field) => (e) => setFormData(prev => ({ ...prev, [field]: e.target.value }));
  const setContactField = (field) => (e) => setContactForm(prev => ({ ...prev, [field]: e.target.value }));

  const heroRef = useRef(null);
  const testimonialsRef = useRef(null);
  const contactRef = useRef(null);
  const processRef = useRef(null);


  // Transparent → glass nav on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Custom cursor
  useEffect(() => {
    const handleMouseMove = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Lenis smooth scroll — drive via GSAP ticker so ScrollTrigger gets correct values
  useEffect(() => {
    let lenis;
    let tickerFn;
    const initLenis = async () => {
      const Lenis = (await import('@studio-freight/lenis')).default;
      lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
      lenis.on('scroll', ScrollTrigger.update);
      tickerFn = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);
    };
    initLenis();
    return () => {
      if (lenis) lenis.destroy();
      if (tickerFn) gsap.ticker.remove(tickerFn);
    };
  }, []);

  // Mount flag — separate from GSAP to avoid hydration mismatch
  useEffect(() => { setMounted(true); }, []);

  // GSAP animations
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      const heroTl = gsap.timeline({ delay: 0.2 });
      heroTl
        .from('.hero-badge', { scale: 0, opacity: 0, duration: 0.6, ease: 'back.out(2)' })
        .from('.hero-line', { y: 120, opacity: 0, duration: 1.2, ease: 'power4.out', stagger: 0.1 }, '-=0.3')
        .from('.hero-subtitle', { opacity: 0, y: 40, duration: 0.8, ease: 'power3.out' }, '-=0.8')
        .from('.hero-cta-btn', { scale: 0, opacity: 0, duration: 0.6, ease: 'back.out(2)', stagger: 0.15 }, '-=0.4');

      gsap.to('.hero-float', { y: -20, duration: 2.5, ease: 'sine.inOut', yoyo: true, repeat: -1 });

      gsap.to('.parallax-bg', {
        scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 1 },
        y: (i, target) => -ScrollTrigger.maxScroll(window) * target.dataset.speed,
        ease: 'none',
      });

      gsap.from('.testimonial-slide', {
        scrollTrigger: { trigger: testimonialsRef.current, start: 'top 70%' },
        y: 100, opacity: 0, duration: 1, stagger: 0.2, ease: 'power3.out',
      });

      gsap.utils.toArray('.reveal').forEach((elem) => {
        gsap.from(elem, {
          scrollTrigger: { trigger: elem, start: 'top 85%' },
          y: 80, opacity: 0, duration: 1, ease: 'power3.out',
        });
      });


      document.querySelectorAll('.magnetic-btn').forEach((btn) => {
        btn.addEventListener('mouseenter', () => setCursorVariant('button'));
        btn.addEventListener('mouseleave', () => setCursorVariant('default'));
        btn.addEventListener('mousemove', (e) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(btn, { x: x * 0.4, y: y * 0.4, duration: 0.3, ease: 'power2.out' });
        });
        btn.addEventListener('mouseleave', () => {
          gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
        });
      });
    });

    return () => ctx.revert();
  }, []);

  /* ── Data ────────────────────────────────────────────────────────────── */
  const services = [
    {
      number: '01', icon: <Globe className="w-8 h-8" />, title: 'Local SEO & Google Business',
      description: 'Own the Map Pack. We optimize your GBP, build citation authority, and create content that converts search intent into booked jobs.',
      features: ['GBP Optimization & Management', 'Citation Building & Cleanup', 'City & Service Pages', 'Review Generation System'],
      gradient: 'from-[#667eea] via-[#764ba2] to-[#f093fb]',
      image: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=600&q=80',
    },
    {
      number: '02', icon: <Target className="w-8 h-8" />, title: 'Google Ads & Local Service Ads',
      description: 'High-intent search campaigns targeting homeowners ready to buy. Budget-disciplined, conversion-tracked, weekly-optimized.',
      features: ['Search & Performance Max', 'LSA & Google Guarantee', 'CallRail Integration', 'Weekly Bid Optimization'],
      gradient: 'from-[#f093fb] via-[#f5576c] to-[#fda085]',
      image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&q=80',
    },
    {
      number: '03', icon: <Star className="w-8 h-8" />, title: 'Yelp Ads & Review Management',
      description: 'Capture decision-stage buyers on Yelp. We manage your ads, optimize your profile, and build the review volume that converts.',
      features: ['Yelp Ads Management', 'Profile Optimization', 'Review Response Strategy', 'Monthly ROI Reporting'],
      gradient: 'from-[#fda085] via-[#f6d365] to-[#43e97b]',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80',
    },
    {
      number: '04', icon: <Settings className="w-8 h-8" />, title: 'CRM & Marketing Automation',
      description: 'GoHighLevel pipelines, automated follow-up, booking, review requests and SMS campaigns. Zero leads fall through the cracks.',
      features: ['GoHighLevel Setup', 'Automated Follow-Up Flows', 'Appointment Booking', 'SMS & Email Campaigns'],
      gradient: 'from-[#43e97b] via-[#38f9d7] to-[#667eea]',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
    },
    {
      number: '05', icon: <Code className="w-8 h-8" />, title: 'Web Development',
      description: 'Custom websites engineered for speed, SEO, and conversion. Every site built to produce calls from day one.',
      features: ['Custom WordPress Builds', 'Landing Pages & Funnels', 'SEO Architecture', 'Core Web Vitals & Speed', 'City Location Pages', 'GHL Integration & Hosting'],
      gradient: 'from-[#667eea] via-[#764ba2] to-[#f093fb]',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80',
    },
    {
      number: '06', icon: <Brain className="w-8 h-8" />, title: 'AI Solutions & Business Intelligence',
      description: 'Enterprise-grade AI in your home service business. Chatbots that qualify leads 24/7, voice AI for missed calls, automated dashboards.',
      features: ['AI Chatbots & Lead Qualification', 'Voice AI for Missed Calls', 'Automated KPI Dashboards', 'Workflow Automation', 'Predictive Lead Scoring', 'Competitor Intelligence'],
      gradient: 'from-[#f093fb] via-[#f5576c] to-[#fda085]', badge: 'New',
      image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80',
    },
  ];

  const results = [
    {
      title: 'OakTree Chimney Solutions', category: 'Local SEO + Google Ads',
      description: 'Call volume more than tripled within 90 days. Full GBP overhaul, targeted search campaigns, and review generation strategy.',
      gradient: 'from-[#667eea] via-[#764ba2] to-[#f093fb]',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80',
      tags: ['Local SEO', 'Google Ads', 'GBP', 'Reviews'],
      metrics: [{ value: '+340%', label: 'Lead Increase' }, { value: '-62%', label: 'Cost Per Lead' }, { value: '5.0★', label: 'GBP Rating' }],
    },
    {
      title: 'CoStar Roofing Inc.', category: 'Yelp Ads + Reviews',
      description: 'Within 6 weeks of Yelp ads launch: consistent inbound leads every single day. Profile fully optimized, review cadence built.',
      gradient: 'from-[#f093fb] via-[#f5576c] to-[#fda085]',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80',
      tags: ['Yelp Ads', 'Profile Optimization', 'Review Strategy'],
      metrics: [{ value: 'Daily', label: 'Inbound Leads' }, { value: '6 Wks', label: 'Time to Results' }, { value: '98%', label: 'Retention Rate' }],
    },
    {
      title: 'ASAP Water Damage Restoration', category: 'CRM + AI Automation',
      description: 'Automated follow-ups, review requests, and missed call recovery. Closing deals that would have been lost before.',
      gradient: 'from-[#fda085] via-[#f6d365] to-[#43e97b]',
      image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=900&q=80',
      tags: ['CRM', 'AI Automation', 'SMS', 'Voice AI'],
      metrics: [{ value: '100%', label: 'Calls Recovered' }, { value: 'Auto', label: 'Follow-Ups' }, { value: '+↑', label: 'Close Rate' }],
    },
  ];

  const processSteps = [
    {
      step: 'Step 01', title: 'Free Discovery Audit',
      description: 'We audit your GBP, ads, website, and competitors. You get a full picture of what\'s leaking revenue — no commitment required.',
    },
    {
      step: 'Step 02', title: 'Bespoke Strategy',
      description: 'A tailored 90-day growth plan built around your market, budget, and goals. We prioritize the highest-impact channels first.',
    },
    {
      step: 'Step 03', title: 'Precision Launch',
      description: 'Full setup, tracking, and go-live. Monitoring starts day one. Optimization starts week one. Results show up month one.',
    },
    {
      step: 'Step 04', title: 'Scale & Report',
      description: 'Monthly reporting with real KPIs. We scale what works, cut what doesn\'t, and compound your results every month.',
    },
  ];

  const testimonials = [
    {
      name: 'Mike R.', role: 'OakTree Chimney Solutions', initial: 'M',
      content: "Since working with JZ. Smart Media our call volume has more than tripled. They know exactly how to target homeowners ready to book. Best investment we've made in years.",
      rating: 5, gradient: 'from-[#667eea] to-[#764ba2]',
    },
    {
      name: 'Steve C.', role: 'CoStar Roofing Inc.', initial: 'S',
      content: 'The Yelp ads changed our business. JZ handled everything — setup, reviews, optimization — and within 6 weeks we had consistent inbound leads every single day.',
      rating: 5, gradient: 'from-[#f093fb] to-[#f5576c]',
    },
    {
      name: 'David K.', role: 'ASAP Water Damage Restoration', initial: 'D',
      content: 'Their CRM and AI setup changed how we operate. Automated follow-ups, review requests, missed call recovery — we close deals we would have lost before.',
      rating: 5, gradient: 'from-[#43e97b] to-[#38f9d7]',
    },
  ];

  const stats = [
    { number: '340%', label: 'Average lead increase in 90 days', color: 'from-[#667eea] to-[#764ba2]' },
    { number: '62%', label: 'Lower cost per lead vs. benchmarks', color: 'from-[#f093fb] to-[#f5576c]' },
    { number: '5.0★', label: 'Average GBP rating across all clients', color: 'from-[#fda085] to-[#43e97b]' },
    { number: '98%', label: '12-month client retention rate', color: 'from-[#43e97b] to-[#667eea]' },
  ];

  const navItems = ['Services', 'Process', 'Results', 'Clients'];

  const SERVICES_PER_PAGE = 3;
  const servicePages = Math.ceil(services.length / SERVICES_PER_PAGE);
  const prevService = () => setServiceIndex((i) => (i === 0 ? servicePages - 1 : i - 1));
  const nextService = () => setServiceIndex((i) => (i === servicePages - 1 ? 0 : i + 1));
  const prevProject = () => setProjectIndex((i) => (i === 0 ? results.length - 1 : i - 1));
  const nextProject = () => setProjectIndex((i) => (i === results.length - 1 ? 0 : i + 1));

  // Default to dark during SSR; once mounted, use resolvedTheme
  const isDark = mounted ? resolvedTheme === 'dark' : true;

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#0a0a0a] text-white' : 'bg-white text-gray-900'} transition-colors duration-500`}>

      {/* Custom Cursor */}
      <motion.div
        className="fixed w-6 h-6 pointer-events-none z-[9999] mix-blend-difference hidden lg:block"
        animate={{ x: cursorPos.x - 12, y: cursorPos.y - 12, scale: cursorVariant === 'button' ? 2 : 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      >
        <div className="w-full h-full bg-white rounded-full" />
      </motion.div>

      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-20 dark:opacity-15">
        <div className="parallax-bg absolute -top-40 -left-40 w-[800px] h-[800px] bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#f093fb] rounded-full blur-[150px]" data-speed="0.15" />
        <div className="parallax-bg absolute top-1/2 -right-40 w-[700px] h-[700px] bg-gradient-to-r from-[#f093fb] via-[#f5576c] to-[#fda085] rounded-full blur-[150px]" data-speed="0.25" />
        <div className="parallax-bg absolute bottom-0 left-1/3 w-[750px] h-[750px] bg-gradient-to-r from-[#43e97b] via-[#38f9d7] to-[#667eea] rounded-full blur-[150px]" data-speed="0.2" />
      </div>

      {/* ── Navigation — transparent → glass on scroll, pill menu with comet border ── */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          menuOpen
            ? isDark
              ? 'bg-[#0d0d0d] border-b border-gray-800/60'
              : 'bg-white border-b border-gray-200/60'
            : scrolled
              ? isDark
                ? 'bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-gray-800/50'
                : 'bg-white/90 backdrop-blur-xl border-b border-gray-200/50'
              : 'bg-transparent'
        }`}
      >
        <div className={`max-w-7xl mx-auto px-6 py-5 ${menuOpen ? (isDark ? 'bg-[#0d0d0d]' : 'bg-white') : ''} transition-colors duration-200`}>
          <div className="flex items-center justify-between">

            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-baseline gap-1.5 select-none"
            >
              <span
                className="text-3xl font-black bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#f093fb] bg-clip-text text-transparent leading-none"
                style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}
              >
                JZ.
              </span>
              <span
                className={`text-sm font-medium tracking-wide ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
                style={{ fontFamily: 'var(--font-dm-sans), sans-serif' }}
              >
                Smart Media
              </span>
            </motion.div>

            {/* Desktop nav — comet border pill */}
            <div className="hidden md:flex items-center">
              <div className="relative" style={{ padding: '1.5px', borderRadius: '9999px', overflow: 'hidden' }}>
                {/* Rotating comet layer */}
                <div
                  style={{
                    position: 'absolute',
                    width: '200%',
                    height: '200%',
                    top: '-50%',
                    left: '-50%',
                    background:
                      'conic-gradient(from 0deg at 50% 50%, transparent 60%, rgba(102,126,234,1) 72%, rgba(240,147,251,1) 84%, transparent 94%)',
                    animation: 'comet-spin 3s linear infinite',
                  }}
                />
                {/* Inner pill */}
                <div className={`relative z-10 flex items-center rounded-full px-2 py-1 ${isDark ? 'bg-[#0f0f0f]' : 'bg-white'}`}>
                  {navItems.map((item, i) => (
                    <Fragment key={item}>
                      <motion.a
                        href={`#${item.toLowerCase()}`}
                        whileHover={{ y: -1 }}
                        className={`px-4 py-2 text-sm font-medium ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
                      >
                        {item}
                      </motion.a>
                      {i < navItems.length - 1 && (
                        <div className={`w-px h-4 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`} />
                      )}
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className={`p-2.5 rounded-full ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
              >
                {isDark ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-gray-700" />}
              </motion.button>

              <motion.a
                href="/schedule"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#f093fb] text-white rounded-full text-sm font-semibold"
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </motion.a>

              <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2">
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden overflow-hidden"
              >
                <div className={`py-6 space-y-1 border-t ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
                  {navItems.map((item) => (
                    <a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      onClick={() => setMenuOpen(false)}
                      className={`block px-2 py-3 text-base font-semibold rounded-xl transition-colors ${isDark ? 'text-gray-200 hover:text-white hover:bg-white/5' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'}`}
                    >
                      {item}
                    </a>
                  ))}
                  <div className="pt-3">
                    <a
                      href="/schedule"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#f093fb] text-white rounded-xl text-sm font-semibold"
                    >
                      Get Started <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* ── Hero Section ─────────────────────────────────────────────────────── */}
      <section id="home" ref={heroRef} className="min-h-screen flex items-center px-6 pt-28 pb-16 relative overflow-x-hidden">
        <div className="w-full max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* ── Left: Content ── */}
            <div>
              {/* Badge */}
              <div className="hero-float hero-badge mb-6">
                <CometBadge isDark={isDark}>
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#667eea]" />
                    <span className="text-xs font-bold tracking-widest uppercase bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#f093fb] bg-clip-text text-transparent">
                      Home Services Digital Agency
                    </span>
                  </span>
                </CometBadge>
              </div>

              {/* H1 */}
              <h1 className="font-black mb-6 leading-[0.93] tracking-tight">
                <div className="overflow-hidden mb-1">
                  <div
                    className="hero-line text-5xl md:text-6xl lg:text-[3.5rem]"
                    style={{ color: isDark ? '#ffffff' : '#0f0f0f' }}
                  >
                    We Don't Run Ads.
                  </div>
                </div>
                <div className="overflow-hidden mb-1">
                  <div className="hero-line text-5xl md:text-6xl lg:text-[3.5rem]" style={{ color: isDark ? '#ffffff' : '#0f0f0f' }}>
                    We Build{' '}
                    <span
                      style={{
                        backgroundImage: 'linear-gradient(90deg,#667eea,#764ba2,#f093fb,#f5576c,#667eea)',
                        backgroundSize: '200% auto',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        color: 'transparent',
                        animation: 'gradient-shift 5s linear infinite',
                        fontStyle: 'italic',
                      }}
                    >
                      Revenue
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden">
                  <div
                    className="hero-line text-5xl md:text-6xl lg:text-[3.5rem]"
                    style={{
                      color: 'transparent',
                      WebkitTextStroke: `2px ${isDark ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.8)'}`,
                    }}
                  >
                    Pipelines.
                  </div>
                </div>
              </h1>

              {/* Subtext */}
              <p className={`hero-subtitle text-base md:text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-8 max-w-lg leading-relaxed`}>
                JZ. Smart Media delivers performance-driven digital marketing exclusively for home service businesses — roofing, HVAC, restoration, remodeling. More calls. More jobs. More revenue.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 items-start mb-8">
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="hero-cta-btn magnetic-btn group px-8 py-4 bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#f093fb] text-white rounded-full font-semibold text-sm inline-flex items-center gap-2 shadow-2xl shadow-[#667eea]/30 self-start"
                >
                  Get Your Free Growth Audit <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.a>
                <motion.a
                  href="#services"
                  whileHover={{ x: 3 }}
                  className={`inline-flex items-center gap-1.5 font-semibold text-sm self-start sm:self-center ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
                >
                  See Our Services <ArrowRight className="w-4 h-4" />
                </motion.a>
              </div>

              {/* Stars */}
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#fda085] text-[#fda085]" />
                  ))}
                </div>
                <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>5.0 / 5 Stars</span>
                <span className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>· Rated by 50+ home service businesses</span>
              </div>
            </div>

            {/* ── Right: Lead Form ── */}
            <div className="hero-float">
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  border: `1.5px solid ${isDark ? 'rgba(102,126,234,0.3)' : 'rgba(102,126,234,0.25)'}`,
                  background: isDark ? '#111111' : '#ffffff',
                  boxShadow: isDark
                    ? '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(102,126,234,0.1)'
                    : '0 32px 80px rgba(102,126,234,0.12), 0 0 0 1px rgba(102,126,234,0.08)',
                }}
              >
                {/* Top gradient bar */}
                <div style={{ height: '3px', background: 'linear-gradient(90deg,#667eea,#764ba2,#f093fb)', position: 'absolute', top: 0, left: 0, right: 0 }} />

                <div className="px-8 pt-10 pb-8">
                  {formSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-10 text-center"
                    >
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#667eea] to-[#f093fb] flex items-center justify-center">
                        <CheckCircle className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-black mb-2" style={{ color: isDark ? '#fff' : '#111', fontFamily: 'var(--font-fraunces), Georgia, serif' }}>
                        You're all set!
                      </h3>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        We'll review your info and reach out within 30 minutes with your free audit.
                      </p>
                    </motion.div>
                  ) : (
                    <>
                      <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#667eea] mb-2">Free Growth Audit</p>
                      <h2
                        className="text-2xl font-black mb-6 leading-tight"
                        style={{ color: isDark ? '#ffffff' : '#0f0f0f', fontFamily: 'var(--font-fraunces), Georgia, serif' }}
                      >
                        See exactly what's holding your business back
                      </h2>

                      <form onSubmit={handleFormSubmit} className="space-y-4">
                        {/* Name */}
                        <div>
                          <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Your Name</label>
                          <input
                            type="text"
                            required
                            placeholder="Mike Johnson"
                            value={formData.name}
                            onChange={setField('name')}
                            className={`w-full px-4 py-3 rounded-xl text-sm border transition-all outline-none focus:ring-2 focus:ring-[#667eea]/30 ${isDark ? 'bg-[#1a1a1a] border-gray-700/70 text-white placeholder-gray-600 focus:border-[#667eea]/60' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#667eea]/60'}`}
                          />
                        </div>

                        {/* Business Name */}
                        <div>
                          <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Business Name</label>
                          <input
                            type="text"
                            required
                            placeholder="Johnson Roofing LLC"
                            value={formData.business}
                            onChange={setField('business')}
                            className={`w-full px-4 py-3 rounded-xl text-sm border transition-all outline-none focus:ring-2 focus:ring-[#667eea]/30 ${isDark ? 'bg-[#1a1a1a] border-gray-700/70 text-white placeholder-gray-600 focus:border-[#667eea]/60' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#667eea]/60'}`}
                          />
                        </div>

                        {/* Phone */}
                        <div>
                          <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Phone Number</label>
                          <input
                            type="tel"
                            required
                            placeholder="(555) 000-0000"
                            value={formData.phone}
                            onChange={setField('phone')}
                            className={`w-full px-4 py-3 rounded-xl text-sm border transition-all outline-none focus:ring-2 focus:ring-[#667eea]/30 ${isDark ? 'bg-[#1a1a1a] border-gray-700/70 text-white placeholder-gray-600 focus:border-[#667eea]/60' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#667eea]/60'}`}
                          />
                        </div>

                        {/* Email */}
                        <div>
                          <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Email Address</label>
                          <input
                            type="email"
                            required
                            placeholder="mike@yourcompany.com"
                            value={formData.email}
                            onChange={setField('email')}
                            className={`w-full px-4 py-3 rounded-xl text-sm border transition-all outline-none focus:ring-2 focus:ring-[#667eea]/30 ${isDark ? 'bg-[#1a1a1a] border-gray-700/70 text-white placeholder-gray-600 focus:border-[#667eea]/60' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#667eea]/60'}`}
                          />
                        </div>

                        {/* Industry */}
                        <div>
                          <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Your Industry</label>
                          <select
                            required
                            value={formData.industry}
                            onChange={setField('industry')}
                            className={`w-full px-4 py-3 rounded-xl text-sm border transition-all outline-none focus:ring-2 focus:ring-[#667eea]/30 appearance-none cursor-pointer ${isDark ? 'bg-[#1a1a1a] border-gray-700/70 text-white focus:border-[#667eea]/60' : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-[#667eea]/60'} ${!formData.industry ? (isDark ? 'text-gray-600' : 'text-gray-400') : ''}`}
                          >
                            <option value="" disabled>Select your industry...</option>
                            <option value="roofing">Roofing</option>
                            <option value="hvac">HVAC</option>
                            <option value="restoration">Restoration</option>
                            <option value="remodeling">Remodeling</option>
                            <option value="plumbing">Plumbing</option>
                            <option value="electrical">Electrical</option>
                            <option value="landscaping">Landscaping</option>
                            <option value="other">Other</option>
                          </select>
                        </div>

                        {/* Submit */}
                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-4 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 shadow-lg shadow-[#667eea]/30"
                          style={{ background: 'linear-gradient(90deg,#667eea,#764ba2,#f093fb)', backgroundSize: '200% auto' }}
                        >
                          Get My Free Audit <ArrowRight className="w-4 h-4" />
                        </motion.button>

                        <p className={`text-center text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                          🔒 No spam. No commitment. Results in 30 minutes.
                        </p>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Stats + Platforms Section ─────────────────────────────────────────── */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">

          {/* Trusted platforms */}
          <div className="text-center mb-10">
            <p className={`text-xs font-bold tracking-[0.25em] uppercase mb-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              Trusted platforms we manage
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {['Google Ads', 'Local SEO', 'Yelp Ads', 'GoHighLevel', 'AI Solutions', 'Web Dev'].map((platform) => (
                <span
                  key={platform}
                  className={`px-5 py-2 rounded-full text-sm font-semibold border ${isDark ? 'border-gray-700 text-gray-300 bg-gray-900/60' : 'border-gray-200 text-gray-700 bg-gray-50'}`}
                >
                  {platform}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <CometCard
                key={index}
                duration={`${3 + index * 0.4}s`}
                delay={`${index * 0.3}s`}
                innerBg={isDark ? 'bg-[#111111]' : 'bg-gray-50'}
              >
                <div className="text-center p-8">
                  <div className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                    {stat.number}
                  </div>
                  <div className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm font-medium leading-snug`}>{stat.label}</div>
                </div>
              </CometCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services Slider ───────────────────────────────────────────────────── */}
      <section id="services" className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <CometBadge isDark={isDark}>
              <span className="text-sm font-semibold bg-gradient-to-r from-[#667eea] to-[#f093fb] bg-clip-text text-transparent">
                What We Do
              </span>
            </CometBadge>
            <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight" style={{ color: isDark ? '#fff' : '#0f0f0f' }}>
              Everything your business<br />needs to{' '}
              <span style={{ backgroundImage: 'linear-gradient(90deg,#667eea,#764ba2,#f093fb)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                dominate locally
              </span>
            </h2>
            <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-xl mx-auto`}>
              Every service built around one outcome: qualified calls from homeowners ready to book.
            </p>
          </div>

          {/* Services Grid Slider — 3 per page */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={serviceIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {services.slice(serviceIndex * SERVICES_PER_PAGE, (serviceIndex + 1) * SERVICES_PER_PAGE).map((service, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -6 }}
                    className={`rounded-2xl border overflow-hidden flex flex-col ${isDark ? 'bg-gray-900/80 border-gray-800' : 'bg-white border-gray-200'} shadow-xl transition-shadow hover:shadow-2xl`}
                  >
                    {/* Image container — TOP */}
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      {/* Dark bottom-to-top overlay so image is visible at top */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10" />
                      {/* Subtle brand colour tint */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-30`} />
                      <span className="absolute top-3 left-4 text-white/70 text-xs font-bold tracking-widest z-10">{service.number}</span>
                      {service.badge && (
                        <span className="absolute top-3 right-4 px-2.5 py-1 bg-black/40 backdrop-blur-sm text-white text-xs font-semibold rounded-full z-10 border border-white/20">
                          {service.badge}
                        </span>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center z-10">
                        <div className="w-14 h-14 rounded-2xl bg-black/30 backdrop-blur-sm border border-white/25 flex items-center justify-center text-white shadow-lg">
                          {service.icon}
                        </div>
                      </div>
                    </div>

                    {/* Content — BELOW */}
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className={`text-lg font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>{service.title}</h3>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-5 leading-relaxed flex-grow`}>{service.description}</p>
                      <div className="space-y-2">
                        {service.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient} flex-shrink-0`} />
                            <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Arrow Controls */}
            <div className="flex items-center justify-between mt-10">
              <button
                onClick={prevService}
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all hover:scale-110 ${isDark ? 'border-gray-700 bg-gray-900 hover:bg-gray-800 text-white' : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-900'} shadow-lg`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-2">
                {Array.from({ length: servicePages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setServiceIndex(i)}
                    className={`transition-all rounded-full ${i === serviceIndex ? 'w-8 h-2.5 bg-gradient-to-r from-[#667eea] to-[#f093fb]' : `w-2.5 h-2.5 ${isDark ? 'bg-gray-700 hover:bg-gray-500' : 'bg-gray-300 hover:bg-gray-400'}`}`}
                  />
                ))}
              </div>
              <button
                onClick={nextService}
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all hover:scale-110 ${isDark ? 'border-gray-700 bg-gray-900 hover:bg-gray-800 text-white' : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-900'} shadow-lg`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <p className={`text-center mt-4 text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              Page {serviceIndex + 1} of {servicePages} · {services.length} Services
            </p>
          </div>
        </div>
      </section>

      {/* ── Why JZ. Smart Media ───────────────────────────────────────────────── */}
      <section id="about" className="py-32 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="reveal mb-16">
            <CometBadge isDark={isDark}>
              <span className="text-sm font-semibold bg-gradient-to-r from-[#667eea] to-[#f093fb] bg-clip-text text-transparent">
                Why JZ. Smart Media
              </span>
            </CometBadge>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mt-4 leading-tight" style={{ color: isDark ? '#fff' : '#0f0f0f' }}>
              Built differently.{' '}
              <span style={{ backgroundImage: 'linear-gradient(90deg,#667eea,#764ba2,#f093fb)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                Built for results.
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {[
              { num: '1.', title: 'Home Services Only', body: 'We work exclusively in your vertical. We know the search intent, seasonality, and buying triggers for roofers, restoration companies, HVAC techs, and remodelers.' },
              { num: '2.', title: 'Full-Stack, One Roof', body: 'SEO, paid ads, CRM, web, and AI — all coordinated by one team toward the same KPIs. No finger-pointing between vendors.' },
              { num: '3.', title: 'Budget Accountability', body: "We treat your ad spend the way a CFO would. Every dollar is accountable. No wasted impressions or brand campaigns that don't convert." },
              { num: '4.', title: 'Radical Transparency', body: 'Monthly reports with real KPIs — cost per lead, close rate, ROI by channel. No padded dashboards or vanity metrics.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: 'easeOut' }}
                className={`reveal p-8 rounded-2xl border ${isDark ? 'bg-gray-900/60 border-gray-800' : 'bg-white border-gray-200'} shadow-lg`}
              >
                <div className="text-4xl font-black mb-3 leading-none" style={{ backgroundImage: 'linear-gradient(90deg,#667eea,#764ba2)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                  {item.num}
                </div>
                <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{item.body}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className={`reveal rounded-2xl p-8 md:p-10 border ${isDark ? 'bg-gray-900/40 border-gray-800' : 'bg-gray-50 border-gray-200'}`}
          >
            <p className={`text-lg md:text-xl italic leading-relaxed mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              &ldquo;The agencies that win long-term treat your budget like it&apos;s their own and your pipeline like it&apos;s their KPI.&rdquo;
            </p>
            <p className="text-sm font-bold text-[#667eea]">— JZ. Smart Media Philosophy</p>
          </motion.div>

          <div className="flex flex-wrap gap-3 mt-8 justify-center">
            {['Google Ads Certified', 'LSA Specialist', 'GHL Partner', 'Yelp Ads', 'AI-Enabled'].map((badge) => (
              <span key={badge} className={`px-4 py-2 rounded-full text-xs font-semibold border ${isDark ? 'border-[#667eea]/30 text-[#a78bfa] bg-[#667eea]/10' : 'border-[#667eea]/40 text-[#667eea] bg-[#667eea]/10'}`}>
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Marquee / Ticker ──────────────────────────────────────────────────── */}
      <div
        className={`relative z-10 py-10 ${isDark ? 'border-y border-gray-800/60 bg-[#0a0a0a]' : 'border-y border-gray-200 bg-white'}`}
        style={{ overflowX: 'clip' }}
      >
        {/* Top row — scrolls left */}
        <div style={{ display: 'flex', width: 'max-content', animation: 'marquee-left 28s linear infinite', marginBottom: '12px' }}>
          {[...Array(2)].flatMap((_, loopIndex) =>
            ['GROW', 'CONVERT', 'SCALE', 'RANK', 'DOMINATE', 'RESULTS', 'REVENUE', 'LEADS'].map((word, i) => (
              <span
                key={`top-${loopIndex}-${i}-${word}`}
                className="flex items-center gap-6 mr-6 text-5xl md:text-7xl font-black tracking-tighter select-none whitespace-nowrap"
              >
                <span
                  style={{
                    color: 'transparent',
                    WebkitTextStroke: `1.5px ${isDark ? 'rgba(102,126,234,0.45)' : 'rgba(102,126,234,0.3)'}`,
                    letterSpacing: '-0.04em',
                  }}
                >
                  {word}
                </span>
                <span style={{ color: isDark ? 'rgba(102,126,234,0.3)' : 'rgba(102,126,234,0.2)', fontSize: '0.5em', verticalAlign: 'middle' }}>✦</span>
              </span>
            ))
          )}
        </div>

        {/* Bottom row — scrolls right (reverse) */}
        <div style={{ display: 'flex', width: 'max-content', animation: 'marquee-left 22s linear infinite reverse' }}>
          {[...Array(2)].flatMap((_, loopIndex) =>
            ['LOCAL SEO', 'GOOGLE ADS', 'CRM SETUP', 'AUTOMATION', 'AI AGENTS', 'YELP ADS', 'WEB DEV', 'GBP MAPS'].map((word, i) => (
              <span
                key={`bot-${loopIndex}-${i}-${word}`}
                className="flex items-center gap-6 mr-6 text-2xl md:text-3xl font-bold tracking-[0.15em] uppercase select-none whitespace-nowrap"
              >
                <span
                  style={{
                    backgroundImage: 'linear-gradient(90deg,#667eea,#764ba2,#f093fb,#f5576c,#fda085,#667eea)',
                    backgroundSize: '300% auto',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                    animation: `gradient-shift ${8 + i}s linear infinite`,
                  }}
                >
                  {word}
                </span>
                <span style={{ color: isDark ? 'rgba(240,147,251,0.3)' : 'rgba(240,147,251,0.4)', fontSize: '0.6em' }}>◆</span>
              </span>
            ))
          )}
        </div>
      </div>

      {/* ── Results / Projects Slider ─────────────────────────────────────────── */}
      <section id="results" className={`py-32 px-6 relative z-10 ${isDark ? 'bg-gray-900/30' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <CometBadge isDark={isDark}>
              <span className="text-sm font-semibold bg-gradient-to-r from-[#667eea] to-[#f093fb] bg-clip-text text-transparent">
                Client Results
              </span>
            </CometBadge>
            <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight" style={{ color: isDark ? '#fff' : '#0f0f0f' }}>
              Real clients.{' '}
              <span style={{ backgroundImage: 'linear-gradient(90deg,#667eea,#764ba2,#f093fb)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                Real results.
              </span>
            </h2>
          </div>

          {/* Case studies slider */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={projectIndex}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className={`rounded-3xl border ${isDark ? 'bg-gray-900/80 border-gray-800' : 'bg-white border-gray-200'} shadow-2xl overflow-hidden`}
              >
                <div className="grid md:grid-cols-2 min-h-[460px]">
                  {/* Image panel */}
                  <div className="relative overflow-hidden min-h-[280px] md:min-h-0">
                    <Image
                      src={results[projectIndex].image}
                      alt={results[projectIndex].title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/5" />
                    <div className={`absolute inset-0 bg-gradient-to-br ${results[projectIndex].gradient} opacity-25`} />
                    {/* Category pill */}
                    <div className="absolute top-6 right-6 z-10">
                      <span className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-medium">
                        {results[projectIndex].category}
                      </span>
                    </div>
                    {/* Tags at bottom */}
                    <div className="absolute bottom-6 left-6 z-10 flex gap-2 flex-wrap">
                      {results[projectIndex].tags.map((tag, idx) => (
                        <span key={idx} className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs">{tag}</span>
                      ))}
                    </div>
                  </div>
                  {/* Content panel */}
                  <div className="p-10 md:p-12 flex flex-col justify-center">
                    <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {results[projectIndex].title}
                    </h3>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-8 leading-relaxed`}>
                      {results[projectIndex].description}
                    </p>
                    <div className="grid grid-cols-3 gap-4">
                      {results[projectIndex].metrics.map((metric, idx) => (
                        <div key={idx} className="text-center">
                          <div className={`text-2xl font-bold bg-gradient-to-r ${results[projectIndex].gradient} bg-clip-text text-transparent mb-1`}>{metric.value}</div>
                          <div className={`text-xs uppercase tracking-wide ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{metric.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-between mt-8">
              <button
                onClick={prevProject}
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all hover:scale-110 ${isDark ? 'border-gray-700 bg-gray-900 hover:bg-gray-800 text-white' : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-900'} shadow-lg`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-2">
                {results.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setProjectIndex(i)}
                    className={`transition-all rounded-full ${i === projectIndex ? 'w-8 h-2.5 bg-gradient-to-r from-[#667eea] to-[#f093fb]' : `w-2.5 h-2.5 ${isDark ? 'bg-gray-700' : 'bg-gray-300'}`}`}
                  />
                ))}
              </div>
              <button
                onClick={nextProject}
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all hover:scale-110 ${isDark ? 'border-gray-700 bg-gray-900 hover:bg-gray-800 text-white' : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-900'} shadow-lg`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Process ──────────────────────────────────────────────────────────── */}
      <section id="process" className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="mb-16 reveal">
            <CometBadge isDark={isDark}>
              <span className="text-sm font-semibold bg-gradient-to-r from-[#667eea] to-[#f093fb] bg-clip-text text-transparent">
                How We Work
              </span>
            </CometBadge>
            <h2 className="text-4xl md:text-5xl font-black mt-4 leading-tight" style={{ color: isDark ? '#fff' : '#0f0f0f' }}>
              From audit to{' '}
              <span style={{ backgroundImage: 'linear-gradient(90deg,#667eea,#764ba2,#f093fb)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', fontStyle: 'italic' }}>
                results
              </span>{' '}
              in 30 days
            </h2>
          </div>

          {/* 4-step — single row on desktop, stacked on mobile */}
          <div className={`flex flex-col md:flex-row rounded-2xl overflow-hidden border ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
            {processSteps.map((step, index) => (
              <div key={index} className="flex md:flex-1 flex-col md:flex-row">
                {/* Arrow connector between steps (desktop) */}
                {index > 0 && (
                  <div className="hidden md:flex flex-shrink-0 w-0 items-center justify-center relative z-10" style={{ marginLeft: '-14px', marginRight: '-14px' }}>
                    <ArrowRight className="w-5 h-5 text-[#667eea] opacity-50" />
                  </div>
                )}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.12, duration: 0.5, ease: 'easeOut' }}
                  className={`flex-1 p-8 md:p-10 ${isDark ? 'bg-gray-900/60 hover:bg-gray-900/90' : 'bg-white hover:bg-gray-50'} transition-colors ${index < processSteps.length - 1 ? (isDark ? 'border-b md:border-b-0 md:border-r border-gray-800' : 'border-b md:border-b-0 md:border-r border-gray-200') : ''}`}
                >
                  <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#667eea] mb-4">{step.step}</p>
                  <h3 className={`text-xl font-black mb-3 leading-snug ${isDark ? 'text-white' : 'text-gray-900'}`}>{step.title}</h3>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{step.description}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────────── */}
      <section id="clients" ref={testimonialsRef} className={`py-32 px-6 relative z-10 ${isDark ? 'bg-gray-900/30' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <CometBadge isDark={isDark}>
              <span className="text-sm font-semibold bg-gradient-to-r from-[#667eea] to-[#f093fb] bg-clip-text text-transparent">
                Client Results
              </span>
            </CometBadge>
            <h2 className="text-4xl md:text-5xl font-black mb-3 leading-tight" style={{ color: isDark ? '#fff' : '#0f0f0f' }}>
              Don't take our word for it
            </h2>
            <div className="flex items-center justify-center gap-1.5">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
              <span className={`text-sm font-semibold ml-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>5.0 / 5 Stars</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className={`testimonial-slide p-8 ${isDark ? 'bg-gray-900/80 border-gray-800/50' : 'bg-white border-gray-200'} backdrop-blur-sm rounded-3xl border shadow-xl`}
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} mb-8 leading-relaxed`}>
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-bold text-lg`}>
                    {testimonial.initial}
                  </div>
                  <div>
                    <div className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{testimonial.name}</div>
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact / Get Started ─────────────────────────────────────────────── */}
      <section id="contact" ref={contactRef} className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Left — headline + bullets + CTA */}
            <div className="reveal">
              <CometBadge isDark={isDark}>
                <span className="text-sm font-semibold bg-gradient-to-r from-[#667eea] to-[#f093fb] bg-clip-text text-transparent">
                  Get Started Today
                </span>
              </CometBadge>
              <h2 className="text-4xl md:text-5xl font-black mt-4 mb-6 leading-tight" style={{ color: isDark ? '#fff' : '#0f0f0f' }}>
                Ready to stop losing leads to your competitors?
              </h2>
              <p className={`text-lg mb-8 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Book a free 30-minute audit call. We'll show you exactly what's holding you back and what we'd do to fix it — no pitch, no pressure, no obligation.
              </p>

              <div className="space-y-3 mb-10">
                {[
                  'Free 30-minute strategy session',
                  'Custom growth plan included',
                  'No long-term contracts required',
                  'Results in first 30 days or we\'ll fix it',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#43e97b] to-[#38f9d7] flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                    <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{item}</span>
                  </div>
                ))}
              </div>

              <motion.a
                href="mailto:yarden@jzsmartmedia.com"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="magnetic-btn group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#f093fb] text-white rounded-full font-semibold text-sm shadow-2xl shadow-[#667eea]/30"
              >
                Book Your Free Audit <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>
              <p className={`mt-3 text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                Takes less than 2 minutes — spots are limited
              </p>

            </div>

            {/* Right — contact form */}
            <div>
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  border: `1.5px solid ${isDark ? 'rgba(102,126,234,0.3)' : 'rgba(102,126,234,0.25)'}`,
                  background: isDark ? '#111111' : '#ffffff',
                  boxShadow: isDark
                    ? '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(102,126,234,0.1)'
                    : '0 32px 80px rgba(102,126,234,0.12)',
                }}
              >
                <div style={{ height: '3px', background: 'linear-gradient(90deg,#667eea,#764ba2,#f093fb)', position: 'absolute', top: 0, left: 0, right: 0 }} />
                <div className="px-8 pt-10 pb-8">
                  {contactSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-10 text-center"
                    >
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#667eea] to-[#f093fb] flex items-center justify-center">
                        <CheckCircle className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-black mb-2" style={{ color: isDark ? '#fff' : '#111', fontFamily: 'var(--font-fraunces), Georgia, serif' }}>
                        Audit request received!
                      </h3>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        We'll be in touch within 30 minutes with your free growth audit.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      {[
                        { label: 'Your Name', field: 'name', type: 'text', placeholder: 'Mike Johnson' },
                        { label: 'Phone Number', field: 'phone', type: 'tel', placeholder: '(555) 000-0000' },
                        { label: 'Email Address', field: 'email', type: 'email', placeholder: 'mike@yourcompany.com' },
                      ].map(({ label, field, type, placeholder }) => (
                        <div key={field}>
                          <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{label}</label>
                          <input
                            type={type}
                            required
                            placeholder={placeholder}
                            value={contactForm[field]}
                            onChange={setContactField(field)}
                            className={`w-full px-4 py-3 rounded-xl text-sm border transition-all outline-none focus:ring-2 focus:ring-[#667eea]/30 ${isDark ? 'bg-[#1a1a1a] border-gray-700/70 text-white placeholder-gray-600 focus:border-[#667eea]/60' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#667eea]/60'}`}
                          />
                        </div>
                      ))}
                      <div>
                        <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Your Industry</label>
                        <select
                          required
                          value={contactForm.industry}
                          onChange={setContactField('industry')}
                          className={`w-full px-4 py-3 rounded-xl text-sm border transition-all outline-none focus:ring-2 focus:ring-[#667eea]/30 appearance-none cursor-pointer ${isDark ? 'bg-[#1a1a1a] border-gray-700/70 text-white focus:border-[#667eea]/60' : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-[#667eea]/60'} ${!contactForm.industry ? (isDark ? 'text-gray-600' : 'text-gray-400') : ''}`}
                        >
                          <option value="" disabled>Select your industry...</option>
                          <option value="roofing">Roofing</option>
                          <option value="hvac">HVAC</option>
                          <option value="restoration">Restoration</option>
                          <option value="remodeling">Remodeling</option>
                          <option value="plumbing">Plumbing</option>
                          <option value="electrical">Electrical</option>
                          <option value="landscaping">Landscaping</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 shadow-lg shadow-[#667eea]/30"
                        style={{ background: 'linear-gradient(90deg,#667eea,#764ba2,#f093fb)' }}
                      >
                        Claim My Free Audit <ArrowRight className="w-4 h-4" />
                      </motion.button>
                      <p className={`text-center text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                        🔒 Your info is private. No spam ever.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* ── Contact Info Bar ─────────────────────────────────────────────────── */}
      <section className={`px-6 py-14 border-t ${isDark ? 'border-gray-800/60' : 'border-gray-200'} relative z-10`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Mail, label: 'Send a Message', value: 'yarden@jzsmartmedia.com', href: 'mailto:yarden@jzsmartmedia.com' },
            { icon: Phone, label: 'Call Us', value: '(352) 321-8206', href: 'tel:+13523218206' },
            { icon: MapPin, label: 'Based in Miami, FL', value: 'Home Service Businesses Nationwide' },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -4 }}
              className={`flex items-center gap-5 p-6 rounded-2xl border ${isDark ? 'bg-gray-900/50 border-gray-800/60' : 'bg-gray-50 border-gray-200'}`}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#667eea] to-[#f093fb] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#667eea]/20">
                <item.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className={`text-xs font-bold tracking-wide uppercase mb-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{item.label}</div>
                {item.href
                  ? <a href={item.href} className="text-base font-semibold text-[#667eea] hover:underline">{item.value}</a>
                  : <div className={`text-base font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.value}</div>
                }
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────────── */}
      <footer className={`py-12 px-6 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'} relative z-10`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-baseline gap-1.5 select-none">
              <span
                className="text-3xl font-black bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#f093fb] bg-clip-text text-transparent leading-none"
                style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}
              >
                JZ.
              </span>
              <span
                className={`text-sm font-medium tracking-wide ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
                style={{ fontFamily: 'var(--font-dm-sans), sans-serif' }}
              >
                Smart Media
              </span>
            </div>
            <div className="flex gap-6">
              {navItems.concat(['Contact']).map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`text-sm ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
                >
                  {item}
                </a>
              ))}
            </div>
            <div className={`text-center ${isDark ? 'text-gray-500' : 'text-gray-500'} text-sm`}>
              © 2026 JZ. Smart Media. All Rights Reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
