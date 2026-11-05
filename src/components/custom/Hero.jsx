import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

function Hero() {
  return (
    <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 flex flex-col items-center text-center">

      {/* Main Heading */}
      <div className="mt-12 md:mt-16 max-w-5xl">
        <h1 className="font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-tight">
          <span className="text-[#f56551]">
            Discover Your Next Adventure
          </span>
          <br />
          <span className="text-gray-900">
            AI-Personalized Itineraries at Your Fingertips
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
          Your personal AI travel planner. Discover amazing destinations
          and create customized itineraries tailored to your interests
          and budget.
        </p>
      </div>

      {/* Get Started Button */}
      <Link to="/create-trip" className="mt-8">
        <Button
          className="bg-[#f56551] hover:bg-[#e65340] text-white px-9 py-6 text-lg rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
        >
          Get Started — It's Free
          <span className="ml-2">→</span>
        </Button>
      </Link>

      {/* Landing Image */}
      <div className="w-full max-w-6xl mt-8 md:mt-10">
        <img
          src="/landing.png"
          alt="AI travel planner preview"
          className="w-full h-auto object-contain"
        />
      </div>

    </div>
  );
}

export default Hero;