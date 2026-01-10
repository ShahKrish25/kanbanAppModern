"use client";
import React from "react";
import { SparklesCore } from "../components/ui/sparks"

export function SparklesPreview({ title }) {
  return (
    <div className="flex flex-col items-center justify-center overflow-hidden rounded-md bg-transparent">
      <h1 className="text-2xl md:text-4xl font-bold text-center text-white relative z-20 tracking-tight">
        {title}
      </h1>
      <div className="w-[18rem] h-8 relative">
        {/* Gradients */}
        <div className="absolute inset-x-5 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-full blur-sm" />
        <div className="absolute inset-x-5 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-full" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/2 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/2" />

        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1000}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />

        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 w-full h-full [mask-image:radial-gradient(120px_30px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>
  );
}