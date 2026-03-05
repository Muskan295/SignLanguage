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
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Quiz Time</h1>
            <p className="text-slate-500 text-sm mt-1">Test your sign language knowledge</p>
          </div>
          <div className="bg-amber-50 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            10 Questions
          </div>
        </div>
      </div>

      {/* Quiz Card */}
      <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-6">
        <QuizCard compact={false} quizData={quizData}/>
      </div>

      {/* Tip */}
      <div className="bg-brand-50 rounded-2xl border border-brand-100 p-5">
        <div className="flex items-start gap-3">
          <div className="bg-brand-100 rounded-lg p-2 mt-0.5">
            <svg className="w-4 h-4 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-brand-900">Pro Tip</p>
            <p className="text-xs text-brand-700 mt-1">Review the <Link to="/alphabet" className="underline font-medium">alphabet</Link> and <Link to="/words" className="underline font-medium">words</Link> sections before taking the quiz to improve your score!</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Quiz
