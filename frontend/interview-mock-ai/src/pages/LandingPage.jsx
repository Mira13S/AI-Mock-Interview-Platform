import React, { useState } from "react";
import HERO_IMG from "../assets/heroimg1.png";
import { APP_FEATURES } from "../utils/data";
import { useNavigate } from "react-router-dom";
import {LuSparkles} from 'react-icons/lu'
import Login from "./Auth/Login"; // your custom login form
import SignUp from "./Auth/SignUp";
import Modal from "../components/Loaders/Modal";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import ProfileInfoCard from "../components/Cards/ProfileInfoCard";

const LandingPage = () => {
    const navigate = useNavigate();
    const [openAuthModal, setOpenAuthModal] = useState(false);
    const [currentPage, setCurrentPage] = useState("login");

    const {user} = useContext(UserContext);

    const handleCTA = () => {
        if(!user) {
            setOpenAuthModal(true);
        } else {
            navigate("/dashboard");
        }
    };

    return(
        <>
        <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
            <div className="absolute top-20 right-0 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl" />

            <div className="container mx-auto px-6 pt-8 pb-32 relative z-10">
                {/* Header */}
                <header className="flex justify-between items-center mb-20">
                    <div className="text-2xl text-slate-800 font-bold flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                            <LuSparkles className="text-white text-sm" />
                        </div>
                        Interview Prep AI
                    </div>
                    
                    {user ? (
                        <ProfileInfoCard /> 
                    ) : (
                        <button
                            className="text-white font-semibold bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-3 rounded-full border border-transparent transition-all hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 active:scale-95"
                            onClick={() => setOpenAuthModal(true)}
                        >
                            Login / Sign Up
                        </button>
                    )}
                </header>

                {/* Hero Content */}
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <div className="w-full lg:w-1/2 space-y-8">
                        <div className="flex items-center justify-start">
                            <div className="flex items-center gap-2 text-sm text-blue-700 font-semibold bg-blue-100 px-4 py-2 rounded-full border border-blue-200 shadow-sm">
                                <LuSparkles className="text-blue-600" /> 
                                AI Powered Platform
                            </div>
                        </div>
                        
                        <h1 className="text-6xl lg:text-7xl text-slate-800 font-bold mb-6 leading-tight">
                            Ace Interviews with{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 animate-pulse">
                                AI-Powered
                            </span>{" "}
                            Learning
                        </h1>
                        
                        <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
                            Get role-specific questions, expand answers when you need them,
                            dive deeper into concepts and organize everything your way.
                            From preparation to mastery—your ultimate interview toolkit is here.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button 
                                className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold px-8 py-4 rounded-full hover:shadow-lg hover:shadow-blue-500/25 transition-all hover:scale-105 active:scale-95"
                                onClick={handleCTA}
                            >
                                Get Started Free
                            </button>
                            
                            <button className="border-2 border-slate-300 text-slate-700 font-semibold px-8 py-4 rounded-full hover:border-blue-500 hover:text-blue-600 transition-all hover:shadow-md">
                                Watch Demo
                            </button>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 relative">
                        {/* Interactive Dashboard Mockup */}
                        <div className="relative z-10 bg-white rounded-2xl shadow-2xl shadow-blue-500/20 border border-white/20 p-8">
                            <div className="space-y-6">
                                {/* Mock Header */}
                                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg"></div>
                                        <span className="font-semibold text-slate-700">Interview Dashboard</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                                    </div>
                                </div>

                                {/* Mock Chat Interface */}
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                                            <LuSparkles className="text-white text-xs" />
                                        </div>
                                        <div className="bg-blue-50 rounded-lg p-3 max-w-xs">
                                            <p className="text-sm text-slate-700">Tell me about a challenging project you worked on.</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 justify-end">
                                        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-3 max-w-xs">
                                            <p className="text-sm text-white">I led a team project that involved...</p>
                                        </div>
                                        <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                                            <LuSparkles className="text-white text-xs" />
                                        </div>
                                        <div className="bg-blue-50 rounded-lg p-3 max-w-xs">
                                            <p className="text-sm text-slate-700">Great! Can you expand on the technical challenges?</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Mock Progress Bar */}
                                <div className="pt-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium text-slate-700">Session Progress</span>
                                        <span className="text-sm text-slate-500">7/10 questions</span>
                                    </div>
                                    <div className="w-full bg-slate-200 rounded-full h-2">
                                        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-1000 animate-pulse" style={{width: '70%'}}></div>
                                    </div>
                                </div>

                                {/* Mock Action Buttons */}
                                <div className="flex gap-3 pt-2">
                                    <button className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-medium py-2 px-4 rounded-lg hover:shadow-lg transition-all">
                                        Continue
                                    </button>
                                    <button className="flex-1 border border-slate-200 text-slate-600 text-sm font-medium py-2 px-4 rounded-lg hover:bg-slate-50 transition-all">
                                        Save Progress
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Floating elements */}
                        <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full opacity-20 animate-bounce" />
                        <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full opacity-20 animate-pulse" />
                        <div className="absolute top-1/2 -left-8 w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full opacity-15 animate-ping" />
                    </div>
                </div>
            </div>
        </div>

        {/* Features Section */}
        <div className="w-full bg-white relative z-10 py-24">
  <div className="container mx-auto px-6">
    <section className="text-center mb-16">
      <div className="inline-flex items-center gap-2 text-sm text-blue-600 font-semibold bg-blue-50 px-4 py-2 rounded-full border border-blue-100 mb-6">
        <LuSparkles /> Features
      </div>
      <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
        Features that make you{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
          shine
        </span>
      </h2>
      <p className="text-lg text-slate-600 max-w-2xl mx-auto">
        Discover powerful tools designed to elevate your interview preparation and boost your confidence.
      </p>
    </section>

    {/* ✅ Unified Grid for All Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {APP_FEATURES.map((feature, index) => (
        <div
          key={feature.id}
          className={`group bg-gradient-to-br ${
            index < 3 ? "from-white to-blue-50/50 border-blue-100/50" : "from-white to-indigo-50/50 border-indigo-100/50"
          } p-8 rounded-2xl shadow-lg hover:shadow-xl border transition-all duration-300 hover:-translate-y-2`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className={`w-12 h-12 ${
            index < 3 ? "bg-gradient-to-r from-blue-500 to-indigo-600" : "bg-gradient-to-r from-indigo-500 to-purple-600"
          } rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
            <LuSparkles className="text-white text-lg" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-4">{feature.title}</h3>
          <p className="text-slate-600 leading-relaxed">{feature.description}</p>
        </div>
      ))}
    </div>
  </div>
</div>


        {/* Footer CTA Section */}
        <div className="w-full bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl" />
            
            <div className="container mx-auto px-6 py-20 relative z-10">
                <div className="text-center max-w-4xl mx-auto">
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                        Ready to ace your next interview?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                        Join thousands of successful candidates who've used our AI-powered platform to land their dream jobs.
                    </p>
                    
                    <button 
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold text-lg px-10 py-4 rounded-full hover:shadow-2xl hover:shadow-blue-500/25 transition-all hover:scale-105 active:scale-95 border border-blue-400/20"
                        onClick={handleCTA}
                    >
                        Start Your Journey
                    </button>
                    
                    <div className="flex items-center justify-center gap-8 mt-12 text-blue-200">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-sm">10,000+ Success Stories</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                            <span className="text-sm">AI-Powered Learning</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
                            <span className="text-sm">Free to Start</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Modal 
            isOpen={openAuthModal}
            onClose={() => {
                setOpenAuthModal(false);
                setCurrentPage("login");
            }}
            hideHeader
        >
            <div>
                {currentPage === "login" && (<Login setCurrentPage={setCurrentPage} />)}
                {currentPage === "signup" && (
                    <SignUp setCurrentPage={setCurrentPage} />
                )}
            </div>
        </Modal>
        </>
    )
}

export default LandingPage;