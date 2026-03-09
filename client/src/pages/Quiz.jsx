import React from 'react'
import { Link } from 'react-router-dom'
import {useState,useEffect} from 'react';
import QuizCard from '../components/QuizCard';

function Quiz() {
  const [quizData,setQuizData]=useState([]);
  useEffect(()=>{
    fetch('/api/quiz').then(res=>res.json()).then(data=>setQuizData(data));
  },[]);

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-card border border-slate-100/80 p-7">
        <div className="flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 text-xs font-bold px-3 py-1.5 rounded-full mb-3">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse-soft"></span>
              Challenge Mode
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Quiz <span className="text-gradient">Time</span></h1>
            <p className="text-slate-500 text-sm mt-2">Test your sign language knowledge</p>
          </div>
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 text-sm font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-sm border border-amber-100">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            10 Questions
          </div>
        </div>
      </div>

      {/* Quiz Card */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-card border border-slate-100/80 p-7">
        <QuizCard compact={false} quizData={quizData}/>
      </div>

      {/* Tip */}
      <div className="bg-gradient-to-r from-brand-50 to-brand-100/50 rounded-2xl border border-brand-100/80 p-6">
        <div className="flex items-start gap-3">
          <div className="bg-white/80 rounded-xl p-2.5 mt-0.5 shadow-sm">
            <svg className="w-5 h-5 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold text-brand-900">Pro Tip</p>
            <p className="text-sm text-brand-700 mt-1">Review the <Link to="/alphabet" className="underline font-semibold hover:text-brand-900 transition-colors">alphabet</Link> and <Link to="/words" className="underline font-semibold hover:text-brand-900 transition-colors">words</Link> sections before taking the quiz to improve your score!</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Quiz
