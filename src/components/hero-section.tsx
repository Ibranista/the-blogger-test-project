import { fetchOptions } from "@/lib/api";
import React from "react";

export async function HeroSection() {
  const [optionsResponse] = await Promise.all([fetchOptions()]);

  if (!optionsResponse.success) {
    throw new Error("Failed to fetch data");
  }

  const { intro_title, intro_description } = optionsResponse?.data || {};

  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight text-foreground mb-6 leading-tight">
            {intro_title}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {intro_description}
          </p>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
