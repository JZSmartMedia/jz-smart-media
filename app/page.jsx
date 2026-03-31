'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Menu, X, Sun, Moon, ArrowRight, Sparkles, Zap, Target,
  Award, Code, Palette, Rocket, CheckCircle, Star, Quote,
  Mail, MapPin, ChevronLeft, ChevronRight, Globe, BarChart2,
  Settings, Brain, FileText, PieChart, Users
} from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function JZSmartMediaLanding() {
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const [serviceIndex, setServiceIndex] = useState(0);
  const [projectIndex, setProjectIndex] = useState(0);
  const { resolvedTheme, setTheme } = useTheme();

  const heroRef = useRef(null);
  const testimonialsRef = useRef(null);
  const contactRef = useRef(null);

  // Custom cursor
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Lenis smooth scroll
  useEffect(() => {
    let lenis;
    const initLenis = async () => {
      const Lenis = (await import('@studio-freight/lenis')).default;
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    };
    initLenis();
    return () => { if (lenis) lenis.destroy(); };
  }, []);

  // GSAP animations
  useEffect(() => {
    if (typeof window === 'undefined') return;
    setMounted(true);

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

  const services = [
    {
      number: '01',
      icon: <Globe className="w-8 h-8" />,
      title: 'Local SEO & GBP',
      description: 'Own the Map Pack. We optimize your GBP, build citation authority, and create content that converts search into booked jobs.',
      features: ['GBP Optimization', 'Citation Building', 'City & Service Pages', 'Review Generation'],
      gradient: 'from-[#667eea] via-[#764ba2] to-[#f093fb]',
    },
    {
      number: '02',
      icon: <Target className="w-8 h-8" />,
      title: 'Google Ads & LSA',
      description: 'High-intent search campaigns targeting homeowners ready to buy. Budget-disciplined, weekly-optimized, conversion-tracked.',
      features: ['Search Campaigns', 'LSA & Google Guarantee', 'CallRail Tracking', 'Weekly Optimization'],
      gradient: 'from-[#f093fb] via-[#f5576c] to-[#fda085]',
    },
    {
      number: '03',
      icon: <Star className="w-8 h-8" />,
      title: 'Yelp Ads & Reviews',
      description: 'Capture decision-stage buyers on Yelp. We manage ads, optimize your profile, and build review volume that converts.',
      features: ['Yelp Ads Management', 'Profile Optimization', 'Review Strategy', 'Monthly Reports'],
      gradient: 'from-[#fda085] via-[#f6d365] to-[#43e97b]',
    },
    {
      number: '04',
      icon: <Settings className="w-8 h-8" />,
      title: 'CRM & Automation',
      description: 'Customized CRM and automation solutions to capture, track, and convert every lead. Automated follow-ups, booking, and SMS.',
      features: ['Customized Solutions', 'Automated Follow-Up', 'Appointment Booking', 'SMS Campaigns'],
      gradient: 'from-[#43e97b] via-[#38f9d7] to-[#667eea]',
    },
    {
      number: '05',
      icon: <Code className="w-8 h-8" />,
      title: 'Web Development',
      description: 'Custom websites built for speed, SEO, and conversions. Every site designed to generate leads from day one.',
      features: ['Custom Website Development', 'Landing Pages & Funnels', 'SEO-Optimized Structure', 'CRM Integration'],
      gradient: 'from-[#667eea] via-[#764ba2] to-[#f093fb]',
      badge: 'New',
    },
    {
      number: '06',
      icon: <Brain className="w-8 h-8" />,
      title: 'AI Solutions',
      description: 'AI chatbots that qualify leads 24/7, automated dashboards, voice AI for missed calls, and workflow automation.',
      features: ['AI Chatbots & Lead Qualification', 'Voice AI for Missed Calls', 'Workflow Automation', 'Predictive Lead Scoring'],
      gradient: 'from-[#f093fb] via-[#f5576c] to-[#fda085]',
      badge: 'New',
    },
    {
      number: '07',
      icon: <FileText className="w-8 h-8" />,
      title: 'SEO Content',
      description: 'Strategic, data-driven content built to increase authority, capture high-intent traffic, and convert visitors into qualified leads.',
      features: ['Service & Location Pages', 'Conversion-Focused Strategy', 'Authority & Topical Clusters', 'Advanced Schema & Structured Data'],
      gradient: 'from-[#fda085] via-[#f6d365] to-[#43e97b]',
    },
    {
      number: '08',
      icon: <PieChart className="w-8 h-8" />,
      title: 'Analytics & Reports',
      description: 'GA4, CallRail, GBP Insights, and custom dashboards — always know which channels are producing revenue.',
      features: ['GA4 Setup', 'CallRail Tracking', 'Custom Dashboards', 'Monthly Reviews'],
      gradient: 'from-[#43e97b] via-[#38f9d7] to-[#667eea]',
    },
    {
      number: '09',
      icon: <Rocket className="w-8 h-8" />,
      title: 'Full Growth Retainer',
      description: 'All channels, one team, one strategy. Dedicated account manager, monthly executive sessions, priority execution.',
      features: ['All Channel Management', 'Dedicated Manager', 'Strategy Sessions', 'Priority Support'],
      gradient: 'from-[#667eea] via-[#764ba2] to-[#f093fb]',
      badge: 'Premium',
    },
  ];

  const results = [
    {
      title: 'OakTree Chimney Solutions',
      category: 'Local SEO + Google Ads',
      description: 'Call volume more than tripled within 90 days. Full GBP overhaul, targeted search campaigns, and review generation strategy.',
      gradient: 'from-[#667eea] via-[#764ba2] to-[#f093fb]',
      tags: ['Local SEO', 'Google Ads', 'GBP', 'Reviews'],
      metrics: { leads: '+340%', cpl: '-62%', rating: '5.0★' },
    },
    {
      title: 'CoStar Roofing Inc.',
      category: 'Yelp Ads + Reviews',
      description: 'Within 6 weeks of Yelp ads launch: consistent inbound leads every single day. Profile fully optimized, review cadence built.',
      gradient: 'from-[#f093fb] via-[#f5576c] to-[#fda085]',
      tags: ['Yelp Ads', 'Profile Optimization', 'Review Strategy'],
      metrics: { leads: 'Daily', weeks: '6 Wks', retention: '98%' },
    },
    {
      title: 'ASAP Water Damage Restoration',
      category: 'CRM + AI Automation',
      description: 'Automated follow-ups, review requests, and missed call recovery. Closing deals that would have been lost before.',
      gradient: 'from-[#fda085] via-[#f6d365] to-[#43e97b]',
      tags: ['CRM', 'AI Automation', 'SMS', 'Voice AI'],
      metrics: { recovery: 'Calls', followup: 'Auto', close: '+↑ Rate' },
    },
  ];

  const processSteps = [
    {
      number: '1',
      step: 'STEP 01',
      title: 'Discovery & Audit',
      description: 'A complete audit of your digital presence — ads, GBP, website, competitors, missed opportunities. Real insights before we talk numbers.',
      gradient: 'from-[#667eea] via-[#764ba2] to-[#f093fb]',
    },
    {
      number: '2',
      step: 'STEP 02',
      title: 'Custom Strategy',
      description: 'A tailored 90-day growth plan built around your market, budget, and goals. We prioritize highest-impact channels first.',
      gradient: 'from-[#f093fb] via-[#f5576c] to-[#fda085]',
    },
    {
      number: '3',
      step: 'STEP 03',
      title: 'Precision Launch',
      description: 'Full setup, tracking, go-live. Monitoring starts day one. Optimization starts week one. Results show up month one.',
      gradient: 'from-[#fda085] via-[#f6d365] to-[#43e97b]',
    },
    {
      number: '4',
      step: 'STEP 04',
      title: 'Scale & Report',
      description: 'Monthly reporting with real KPIs. We scale what works, cut what doesn\'t, and compound results every month.',
      gradient: 'from-[#43e97b] via-[#38f9d7] to-[#667eea]',
    },
  ];

  const testimonials = [
    {
      name: 'Mike R.',
      role: 'OakTree Chimney Solutions',
      initial: 'M',
      content: 'Since working with JZ. Smart Media our call volume has more than tripled. They know exactly how to target homeowners ready to book. Best investment we\'ve made in years.',
      rating: 5,
      gradient: 'from-[#667eea] to-[#764ba2]',
    },
    {
      name: 'Steve C.',
      role: 'CoStar Roofing Inc.',
      initial: 'S',
      content: 'The Yelp ads changed our business. JZ handled everything — setup, reviews, optimization — and within 6 weeks we had consistent inbound leads every single day.',
      rating: 5,
      gradient: 'from-[#f093fb] to-[#f5576c]',
    },
    {
      name: 'David K.',
      role: 'ASAP Water Damage Restoration',
      initial: 'D',
      content: 'Their CRM and AI setup changed how we operate. Automated follow-ups, review requests, missed call recovery — we close deals we would have lost before.',
      rating: 5,
      gradient: 'from-[#43e97b] to-[#38f9d7]',
    },
  ];

  const stats = [
    { number: '50+', label: 'Active Client Accounts', color: 'from-[#667eea] to-[#764ba2]' },
    { number: '8×', label: 'Average Lead ROI', color: 'from-[#f093fb] to-[#f5576c]' },
    { number: '$2M+', label: 'Ad Spend Managed', color: 'from-[#fda085] to-[#43e97b]' },
    { number: '98%', label: '12-Month Retention', color: 'from-[#43e97b] to-[#667eea]' },
  ];

  const navItems = ['Services', 'Process', 'Results', 'Clients'];

  const SERVICES_PER_PAGE = 3;
  const servicePages = Math.ceil(services.length / SERVICES_PER_PAGE);
  const prevService = () => setServiceIndex((i) => (i === 0 ? servicePages - 1 : i - 1));
  const nextService = () => setServiceIndex((i) => (i === servicePages - 1 ? 0 : i + 1));
  const prevProject = () => setProjectIndex((i) => (i === 0 ? results.length - 1 : i - 1));
  const nextProject = () => setProjectIndex((i) => (i === results.length - 1 ? 0 : i + 1));

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#0a0a0a] text-white' : 'bg-white text-gray-900'} transition-colors duration-500 overflow-x-hidden`}>
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

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 ${isDark ? 'bg-[#0a0a0a]/80 border-gray-800/50' : 'bg-white/80 border-gray-200/50'} backdrop-blur-xl border-b transition-colors duration-300`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div whileHover={{ scale: 1.05 }} className="text-xl font-bold bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#f093fb] bg-clip-text text-transparent">
              JZ. Smart Media
            </motion.div>

            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  whileHover={{ y: -2 }}
                  className={`text-sm font-medium ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} transition-colors`}
                >
                  {item}
                </motion.a>
              ))}
            </div>

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
                href="#contact"
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

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden overflow-hidden"
              >
                <div className="py-4 space-y-4">
                  {navItems.map((item) => (
                    <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="block text-sm font-medium">
                      {item}
                    </a>
                  ))}
                  <a href="#contact" onClick={() => setMenuOpen(false)} className="block text-sm font-semibold text-[#667eea]">
                    Get Started →
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" ref={heroRef} className="min-h-screen flex items-center justify-center px-6 pt-20 relative">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="hero-float hero-badge mb-8">
            <div className={`inline-flex items-center gap-2 px-5 py-2.5 ${isDark ? 'bg-[#667eea]/10 border-[#667eea]/20' : 'bg-[#667eea]/10 border-[#667eea]/30'} backdrop-blur-sm rounded-full border`}>
              <Sparkles className="w-4 h-4 text-[#667eea]" />
              <span className="text-sm font-medium bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#f093fb] bg-clip-text text-transparent">
                Digital Growth Agency
              </span>
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-bold mb-6 leading-[0.88] tracking-tight">
            {['WE', 'MAKE', 'LOCAL'].map((word, i) => (
              <div key={i} className="overflow-hidden mb-2">
                <div className="hero-line bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#f093fb] bg-clip-text text-transparent">
                  {word}
                </div>
              </div>
            ))}
            <div className="overflow-hidden mb-2">
              <div className={`hero-line text-4xl md:text-5xl lg:text-6xl font-semibold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Businesses
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="hero-line bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#f093fb] bg-clip-text text-transparent">
                DOMINATE
              </div>
            </div>
          </h1>

          <p className={`hero-subtitle text-lg md:text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-12 max-w-2xl mx-auto leading-relaxed`}>
            JZ. Smart Media is a performance-driven digital agency for home service businesses — roofing, HVAC, restoration, remodeling. We fill your pipeline, not just your dashboard.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hero-cta-btn magnetic-btn group px-10 py-5 bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#f093fb] text-white rounded-full font-semibold flex items-center gap-3 shadow-2xl shadow-[#667eea]/30"
            >
              Start Growing <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <div className={`w-6 h-10 border-2 ${isDark ? 'border-gray-600' : 'border-gray-400'} rounded-full flex justify-center`}>
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-gradient-to-r from-[#667eea] to-[#f093fb] rounded-full mt-2"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`text-center p-8 ${isDark ? 'bg-gray-900/50 border-gray-800/50' : 'bg-gray-50 border-gray-200/50'} backdrop-blur-sm rounded-3xl border`}
              >
                <div className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                  {stat.number}
                </div>
                <div className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm font-medium`}>{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Badges row */}
          <div className="flex flex-wrap justify-center gap-3">
            {['Google Ads Certified', 'LSA Specialist', 'GoHighLevel Partner', 'AI-Enabled Agency'].map((badge) => (
              <span key={badge} className={`px-4 py-2 rounded-full text-sm font-medium border ${isDark ? 'border-[#667eea]/30 text-[#a78bfa] bg-[#667eea]/10' : 'border-[#667eea]/40 text-[#667eea] bg-[#667eea]/10'}`}>
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* About / Built For Home Services */}
      <section id="about" className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#667eea]/10 to-[#f093fb]/10 rounded-full mb-6">
                <span className="text-sm font-semibold bg-gradient-to-r from-[#667eea] to-[#f093fb] bg-clip-text text-transparent">
                  JZ. — BUILT FOR HOME SERVICES
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#f093fb] bg-clip-text text-transparent">We Know</span>
                <br />
                <span className={isDark ? 'text-white' : 'text-gray-900'}>Your Market</span>
              </h2>
              <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-6 leading-relaxed`}>
                We work exclusively with roofers, restoration companies, HVAC techs, remodelers and chimney pros. We know your buyers, your search intent, your seasonality — and exactly how to fill your pipeline year-round.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  'Performance Driven Google Ads',
                  'Local SEO & Maps Domination',
                  'Multi Channel Lead Generation',
                  'Advanced CRM & Automation',
                  'AI Powered Growth Strategies',
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#43e97b] to-[#38f9d7] flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'} font-medium text-sm uppercase tracking-wide`}>{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="relative reveal">
              <div className="relative rounded-3xl overflow-hidden h-[500px]">
                <Image
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
                  alt="Roofing professionals at work"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
                <div className="absolute inset-x-0 bottom-0 p-6 grid grid-cols-2 gap-3">
                  {[
                    { num: '340%', label: 'Lead Increase', sub: 'First 90 days' },
                    { num: '62%', label: 'Lower CPL', sub: 'vs. benchmarks' },
                    { num: '5.0★', label: 'Avg GBP Rating', sub: 'Managed profiles' },
                    { num: '9+', label: 'Service Lines', sub: 'Full-stack digital' },
                  ].map((item, i) => (
                    <div key={i} className="p-4 rounded-xl bg-black/50 backdrop-blur-md border border-white/10 text-center">
                      <div className="text-2xl font-bold bg-gradient-to-r from-[#667eea] to-[#f093fb] bg-clip-text text-transparent mb-0.5">{item.num}</div>
                      <div className="text-white text-xs font-semibold mb-0.5">{item.label}</div>
                      <div className="text-white/60 text-xs">{item.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Slider */}
      <section id="services" className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#667eea]/10 to-[#f093fb]/10 rounded-full mb-6">
              <span className="text-sm font-semibold bg-gradient-to-r from-[#667eea] to-[#f093fb] bg-clip-text text-transparent">
                OUR SERVICES
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#f093fb] bg-clip-text text-transparent">What We Do</span>
            </h2>
            <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-xl mx-auto`}>
              Every service engineered around one outcome: more calls, more jobs, more revenue.
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
                    {/* Icon container — TOP */}
                    <div className={`relative h-44 bg-gradient-to-br ${service.gradient} flex items-center justify-center`}>
                      <span className="absolute top-3 left-4 text-white/30 text-xs font-bold tracking-widest">{service.number}</span>
                      {service.badge && (
                        <span className="absolute top-3 right-4 px-2.5 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                          {service.badge}
                        </span>
                      )}
                      <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                        {service.icon}
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

      {/* Results / Projects Slider */}
      <section id="results" className={`py-32 px-6 relative z-10 ${isDark ? 'bg-gray-900/30' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#667eea]/10 to-[#f093fb]/10 rounded-full mb-6">
              <span className="text-sm font-semibold bg-gradient-to-r from-[#667eea] to-[#f093fb] bg-clip-text text-transparent">
                REAL RESULTS
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#f093fb] bg-clip-text text-transparent">By The Numbers</span>
            </h2>
          </div>

          {/* Results stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {[
              { num: '340%', label: 'Average Lead Increase', sub: 'Within first 90 days' },
              { num: '62%', label: 'Lower Cost Per Lead', sub: 'vs. industry benchmarks' },
              { num: '5.0★', label: 'Avg. GBP Rating', sub: 'Across managed profiles' },
              { num: '98%', label: 'Client Retention Rate', sub: '12-month rolling average' },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className={`text-center p-8 rounded-3xl border ${isDark ? 'bg-gray-900/80 border-gray-800' : 'bg-white border-gray-200'} shadow-xl`}
              >
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#667eea] to-[#f093fb] bg-clip-text text-transparent mb-2">{item.num}</div>
                <div className={`font-semibold text-sm mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.label}</div>
                <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{item.sub}</div>
              </motion.div>
            ))}
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
                <div className="grid md:grid-cols-2 min-h-[420px]">
                  <div className={`relative bg-gradient-to-br ${results[projectIndex].gradient} p-12 flex flex-col justify-end`}>
                    <div className="absolute top-6 right-6">
                      <span className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-medium">
                        {results[projectIndex].category}
                      </span>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {results[projectIndex].tags.map((tag, idx) => (
                        <span key={idx} className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-10 md:p-12 flex flex-col justify-center">
                    <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {results[projectIndex].title}
                    </h3>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-8 leading-relaxed`}>
                      {results[projectIndex].description}
                    </p>
                    <div className="grid grid-cols-3 gap-4">
                      {Object.entries(results[projectIndex].metrics).map(([key, value], idx) => (
                        <div key={idx} className="text-center">
                          <div className={`text-2xl font-bold bg-gradient-to-r ${results[projectIndex].gradient} bg-clip-text text-transparent mb-1`}>{value}</div>
                          <div className={`text-xs uppercase ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{key}</div>
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

      {/* Process — Stacking Cards */}
      <section id="process" className="py-32 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#667eea]/10 to-[#f093fb]/10 rounded-full mb-6">
              <span className="text-sm font-semibold bg-gradient-to-r from-[#667eea] to-[#f093fb] bg-clip-text text-transparent">
                THE PROCESS
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#f093fb] bg-clip-text text-transparent">How We Work</span>
            </h2>
            <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-xl mx-auto`}>
              A proven four-step methodology delivering real pipeline growth every time.
            </p>
          </div>

          {/* Stacking cards — sticky, each card offsets down */}
          <div className="space-y-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                style={{ position: 'sticky', top: `${80 + index * 24}px`, zIndex: 10 + index }}
                className={`rounded-3xl overflow-hidden shadow-2xl border-4 ${isDark ? 'border-gray-900' : 'border-white'}`}
              >
                <div className={`relative bg-gradient-to-br ${step.gradient} min-h-[280px] p-10 md:p-14 flex flex-col justify-between`}>
                  <div className="text-[7rem] font-bold text-white/10 absolute top-0 right-8 leading-none select-none">
                    {step.number}
                  </div>
                  <span className="text-white/60 text-sm font-semibold tracking-widest uppercase">{step.step}</span>
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-white/85 text-lg max-w-2xl leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="clients" ref={testimonialsRef} className={`py-32 px-6 relative z-10 ${isDark ? 'bg-gray-900/30' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#667eea]/10 to-[#f093fb]/10 rounded-full mb-6">
              <span className="text-sm font-semibold bg-gradient-to-r from-[#667eea] to-[#f093fb] bg-clip-text text-transparent">
                WHAT THEY SAY
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#f093fb] bg-clip-text text-transparent">Client Voices</span>
            </h2>
            <div className={`text-lg font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>5.0 / 5 Stars</div>
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
                  "{testimonial.content}"
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

      {/* Contact CTA */}
      <section id="contact" ref={contactRef} className="py-32 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className={`relative p-16 rounded-3xl border text-center overflow-hidden ${isDark ? 'bg-gradient-to-br from-[#667eea]/10 via-[#764ba2]/10 to-[#f093fb]/10 border-[#667eea]/20' : 'bg-gradient-to-br from-[#667eea]/5 via-[#764ba2]/5 to-[#f093fb]/5 border-[#667eea]/30'} backdrop-blur-sm`}>
            <div className="absolute inset-0 bg-gradient-to-br from-[#667eea]/5 to-[#f093fb]/5 animate-pulse" />
            <div className="relative z-10">
              <div className="mb-6">
                <span className="text-sm font-semibold bg-gradient-to-r from-[#667eea] to-[#f093fb] bg-clip-text text-transparent uppercase tracking-widest">
                  Let's Work Together
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold mb-4">
                <span className="bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#f093fb] bg-clip-text text-transparent">
                  READY TO
                </span>
                <br />
                <span className={isDark ? 'text-white' : 'text-gray-900'}>DOMINATE</span>
                <br />
                <span className="bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#f093fb] bg-clip-text text-transparent">
                  YOUR MARKET?
                </span>
              </h2>
              <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-10 max-w-2xl mx-auto`}>
                Book a free 30-minute audit. We'll show you what's holding you back and what we'd do to fix it — no pitch, no pressure.
              </p>
              <motion.a
                href="mailto:yarden@jzsmartmedia.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="magnetic-btn group px-12 py-6 bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#f093fb] text-white rounded-full font-semibold text-lg inline-flex items-center gap-3 shadow-2xl shadow-[#667eea]/30"
              >
                Book Free Audit <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-16">
            {[
              { icon: Mail, label: 'Send a Message', value: 'yarden@jzsmartmedia.com', href: 'mailto:yarden@jzsmartmedia.com' },
              { icon: MapPin, label: 'Service Area', value: 'Home Service Businesses Nationwide' },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className={`reveal flex flex-col items-center gap-3 p-6 ${isDark ? 'bg-gray-900/80 border-gray-800/50' : 'bg-gray-50 border-gray-200'} backdrop-blur-sm rounded-2xl border`}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-[#667eea] to-[#f093fb] rounded-xl flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-center">
                  <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-1`}>{item.label}</div>
                  {item.href ? (
                    <a href={item.href} className="text-[#667eea] hover:underline text-sm">{item.value}</a>
                  ) : (
                    <div className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>{item.value}</div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 px-6 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'} relative z-10`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-xl font-bold bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#f093fb] bg-clip-text text-transparent">
              JZ. Smart Media
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
