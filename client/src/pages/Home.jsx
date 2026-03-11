import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'

// Floating Particles Component
const FloatingParticles = () => (
  <div className="particles-container">
    {[...Array(12)].map((_, i) => (
      <div key={i} className="particle" />
    ))}
    <div className="glow-orb glow-orb-1" />
    <div className="glow-orb glow-orb-2" />
    <div className="glow-orb glow-orb-3" />
  </div>
)

// Animated Stats Card Component
const StatCard = ({ icon, label, value, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ scale: 1.08, y: -5 }}
    className="glass-card rounded-2xl px-5 py-4 text-center min-w-[120px] hover:bg-white/25 transition-all duration-300 hover:shadow-glow cursor-pointer"
  >
    <motion.div 
      className="text-3xl mb-2 filter drop-shadow-lg"
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 2, repeat: Infinity, delay: delay * 2 }}
    >
      {icon}
    </motion.div>
    <p className="text-white text-sm font-semibold tracking-wide">{label}</p>
    <p className="text-white/60 text-xs mt-0.5">{value}</p>
  </motion.div>
)

// Feature Card Component with Glassmorphism
const FeatureCard = ({ to, icon, title, description, gradient, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    whileHover={{ y: -8, scale: 1.02 }}
  >
    <Link
      to={to}
      className={`group block glass-card-solid rounded-2xl p-6 hover:shadow-glow-lg transition-all duration-500 no-underline hover:border-brand-300`}
    >
      <motion.div 
        className={`w-14 h-14 ${gradient} rounded-2xl flex items-center justify-center text-2xl mb-5 shadow-lg`}
        whileHover={{ scale: 1.15, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {icon}
      </motion.div>
      <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-brand-700 transition-colors">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
      <div className="mt-4 flex items-center text-brand-600 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Learn more 
        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  </motion.div>
)

// Progress Bar Component
const ProgressBar = ({ label, percent, color, icon, delay }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="mb-6"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">{icon}</span>
          <span className="text-slate-700 font-semibold">{label}</span>
        </div>
        <span className="text-brand-600 font-bold">{percent}%</span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
        <motion.div 
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percent}%` } : { width: 0 }}
          transition={{ duration: 1, delay: delay + 0.3, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  )
}

function Home() {
  const [user, setUser] = useState(null)
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef(null)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const getUserTypeLabel = (userType) => {
    if (userType === 'visionLoss') return 'Vision Loss'
    return userType.charAt(0).toUpperCase() + userType.slice(1)
  }

  return (
    <div className="animate-fade-in">
      {/* ===== HERO SECTION WITH PARALLAX ===== */}
      <section ref={heroRef} className="hero-parallax">
        {/* Parallax Background Image */}
        <div
          className="hero-bg"
          style={{
            backgroundImage: 'url(/images/hero-bg.png)',
            transform: `translateY(${scrollY * 0.4}px) scale(${1.1 + scrollY * 0.0004})`,
          }}
        />
        
        {/* Purple Gradient Overlay with parallax */}
        <div 
          className="hero-overlay" 
          style={{ opacity: Math.min(0.7 + scrollY * 0.001, 0.95) }}
        />
        
        {/* Floating Particles */}
        <FloatingParticles />
        
        {/* Hero Content with parallax */}
        <div 
          className="hero-content w-full px-6 sm:px-8 lg:px-16 py-20 lg:py-32"
          style={{ 
            transform: `translateY(${scrollY * 0.15}px)`,
            opacity: Math.max(1 - scrollY * 0.002, 0.3)
          }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Text Content */}
              <div className="max-w-xl">
                {/* User badge */}
                {user && user.userType && (
                  <div className="animate-hero-title mb-6 inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <span className="text-white/90 text-sm font-medium">{getUserTypeLabel(user.userType)}</span>
                  </div>
                )}
                
                {/* Main Heading */}
                <h1 className="animate-hero-title text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-6">
                  {user ? (
                    <>
                      Welcome back,{' '}
                      <span className="text-brand-200">{(user.fullName || user.name || '').split(' ')[0]}!</span>
                    </>
                  ) : (
                    <>
                      Learn Sign Language.{' '}
                      <span className="block mt-2 text-brand-200">Communicate Without Words.</span>
                    </>
                  )}
                </h1>
                
                {/* Subtext */}
                <p className="animate-hero-subtitle text-lg sm:text-xl text-white/70 leading-relaxed mb-10 max-w-lg">
                  Interactive lessons, visual alphabet cards, vocabulary practice and quizzes to help you master Indian Sign Language.
                </p>
                
                {/* CTA Buttons */}
                <div className="animate-hero-buttons flex flex-col sm:flex-row gap-4">
                  <Link 
                    to="/alphabet" 
                    className="btn-primary inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-white to-gray-100 text-brand-700 font-bold rounded-2xl text-lg no-underline shadow-xl hover:from-brand-100 hover:to-brand-200 hover:text-brand-800 hover:shadow-glow-lg transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    <span className="text-xl">🤟</span>
                    Start Learning
                  </Link>
                  <Link 
                    to="/modules" 
                    className="btn-secondary inline-flex items-center justify-center gap-3 px-8 py-4 glass-card text-white font-semibold rounded-2xl text-lg no-underline hover:bg-white/30 hover:border-white/40 hover:shadow-glow transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    <span className="text-xl">📚</span>
                    Explore Modules
                  </Link>
                </div>
                
                {/* Trust indicators */}
                <div className="animate-hero-stats mt-12 flex items-center gap-6 text-white/60 text-sm">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Free to start</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Visual learning</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Progress tracking</span>
                  </div>
                </div>
              </div>
              
              {/* Right Side - Stats Cards */}
              <div className="hidden lg:flex justify-center">
                <div className="animate-hero-stats grid grid-cols-2 gap-4 stagger-children">
                  <StatCard icon="🤟" label="Alphabet" value="26 Letters" delay={0.1} />
                  <StatCard icon="📝" label="Words" value="500+ Signs" delay={0.2} />
                  <StatCard icon="🎯" label="Quizzes" value="Test Skills" delay={0.3} />
                  <StatCard icon="📚" label="Modules" value="Structured" delay={0.4} />
                </div>
              </div>
            </div>
            
            {/* Mobile Stats - Horizontal scroll */}
            <div className="lg:hidden mt-10 animate-hero-stats">
              <div className="flex gap-3 overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide">
                <StatCard icon="🤟" label="Alphabet" value="26 Letters" delay={0.1} />
                <StatCard icon="📝" label="Words" value="500+ Signs" delay={0.2} />
                <StatCard icon="🎯" label="Quizzes" value="Test Skills" delay={0.3} />
                <StatCard icon="📚" label="Modules" value="Structured" delay={0.4} />
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-white/60 text-xs font-medium tracking-wide">Scroll to explore</span>
          <div className="w-8 h-12 border-2 border-white/40 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/70 rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* ===== FEATURE CARDS SECTION ===== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-brand-50/50 to-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-brand-100 text-brand-700 text-sm font-semibold rounded-full mb-4">
              Why SignSetu?
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Everything you need to{' '}
              <span className="text-gradient">master sign language</span>
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              Our comprehensive platform provides all the tools and resources you need to learn Indian Sign Language effectively.
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              to="/alphabet"
              icon="🤟"
              title="Visual Alphabet Cards"
              description="Learn all 26 letters with high-quality visual cards and step-by-step guidance for each sign."
              gradient="bg-gradient-to-br from-brand-500 to-brand-700"
              index={0}
            />
            <FeatureCard
              to="/words"
              icon="📝"
              title="Vocabulary Practice"
              description="Master essential words and common phrases used in everyday communication."
              gradient="bg-gradient-to-br from-violet-500 to-purple-700"
              index={1}
            />
            <FeatureCard
              to="/quiz"
              icon="🎯"
              title="Interactive Quizzes"
              description="Test your knowledge with engaging quizzes and track your learning progress."
              gradient="bg-gradient-to-br from-fuchsia-500 to-pink-700"
              index={2}
            />
          </div>
        </div>
      </section>

      {/* ===== PROGRESS SECTION (Gamification) ===== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-card-solid rounded-3xl p-8 sm:p-10 shadow-glow"
          >
            <div className="flex flex-col lg:flex-row gap-10">
              {/* Left side - Progress */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">Your Learning Progress</h2>
                    <p className="text-slate-500 text-sm">Track your journey to mastering sign language</p>
                  </div>
                </div>

                <ProgressBar 
                  label="Alphabet Mastery" 
                  percent={40} 
                  color="bg-gradient-to-r from-brand-400 to-brand-600"
                  icon="🤟"
                  delay={0}
                />
                <ProgressBar 
                  label="Vocabulary" 
                  percent={15} 
                  color="bg-gradient-to-r from-violet-400 to-purple-600"
                  icon="📝"
                  delay={0.1}
                />
                <ProgressBar 
                  label="Quiz Score" 
                  percent={70} 
                  color="bg-gradient-to-r from-fuchsia-400 to-pink-600"
                  icon="🎯"
                  delay={0.2}
                />
              </div>

              {/* Right side - Stats & Achievements */}
              <div className="lg:w-72 flex flex-col gap-4">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-brand-500 to-brand-700 rounded-2xl p-5 text-white"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl">🔥</span>
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full">This Week</span>
                  </div>
                  <p className="text-3xl font-bold">5 Day</p>
                  <p className="text-white/70 text-sm">Learning Streak</p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl p-5 text-white"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl">🏆</span>
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Total</span>
                  </div>
                  <p className="text-3xl font-bold">3</p>
                  <p className="text-white/70 text-sm">Badges Earned</p>
                </motion.div>

                <Link
                  to="/alphabet"
                  className="btn-primary flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-bold rounded-2xl no-underline shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-glow"
                >
                  Continue Learning
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== TESTIMONIAL / SOCIAL PROOF ===== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-brand-50/30">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 glass-card-solid px-6 py-3 rounded-2xl mb-8">
            <div className="flex -space-x-2">
              {['🧑‍🦱', '👩', '🧑', '👨‍🦰'].map((emoji, i) => (
                <div key={i} className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center text-lg border-2 border-white">
                  {emoji}
                </div>
              ))}
            </div>
            <div className="text-left pl-2">
              <p className="text-slate-900 font-semibold text-sm">Join 10,000+ learners</p>
              <p className="text-slate-500 text-xs">Learning sign language with SignSetu</p>
            </div>
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
            Start your journey today
          </h2>
          <p className="text-slate-500 text-lg mb-8 max-w-xl mx-auto">
            Join thousands of learners who are breaking communication barriers with sign language.
          </p>
          
          <Link
            to="/signin"
            className="btn-primary inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-brand-600 to-purple-600 text-white font-bold rounded-2xl text-lg no-underline shadow-xl"
          >
            Get Started Free
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home