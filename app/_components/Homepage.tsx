"use client"
import React from "react";
import Link from "next/link";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <div className="dark:bg-neutral-900 min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <header className="border-b border-gray-200 dark:border-neutral-700 bg-gradient-to-b from-blue-50 to-white dark:from-neutral-800 dark:to-neutral-900 shadow-md">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <img src="/logo.svg" alt="Logo" className="h-10 w-auto" />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6">
            <Link href="/how-it-works" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
              How It Works
            </Link>
            <Link href="/pricing" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
              Pricing
            </Link>
            <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
              About
            </Link>
          </div>

          {/* Authentication Buttons */}
          <div className="flex space-x-3">
            <SignInButton>
              <Button variant="outline">Sign In</Button>
            </SignInButton>
            <SignUpButton>
              <Button>Sign Up</Button>
            </SignUpButton>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-50 to-white dark:from-neutral-800 dark:to-neutral-900 py-24 text-center flex flex-col items-center gap-4">
        <h3 className="rounded-full p-2 w-[40%] border bg-slate-200 text-black">
          Have a question? Reach out at <span className="text-purple-500">vikharankarayush14@gmail.com</span>
        </h3>
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
          AI-Powered <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Travel Planner</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-neutral-300 mb-8 max-w-2xl mx-auto">
          Plan your next adventure effortlessly with our AI-driven travel recommendation system. Get personalized suggestions for flights, hotels, and transport options—all in one seamless platform.
        </p>
        <Link href="/dashboard">
          <Button className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            Start Planning Now
          </Button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 py-5 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[ 
          { title: "AI-Powered Recommendations", description: "Get travel options tailored to your preferences and budget." },
          { title: "Multi-Transport Integration", description: "Compare and book flights, trains, and buses in one place." },
          { title: "Smart Hotel Booking", description: "Find the best hotel deals based on your travel itinerary." },
          { title: "Seamless Itinerary Planning", description: "Let our AI create an optimized schedule for your trip." }
        ].map((feature, index) => (
          <div key={index} className="p-6 bg-white dark:bg-neutral-800 rounded-xl shadow-sm hover:shadow-lg hover:scale-105 transition-all">
            <div className="w-12 h-12 bg-blue-100 dark:bg-neutral-700 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 dark:text-white">{feature.title}</h3>
            <p className="text-gray-600 dark:text-neutral-400">{feature.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default HomePage;
