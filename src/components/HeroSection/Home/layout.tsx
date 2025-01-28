"use client"
import React from "react";
import Hero from "./Hero/Hero";
import About from "./Sections/About";
import Services from "./Sections/Services";
import Features from "./Sections/Features";
import Testimonials from "./Sections/Testimonials";
import Pricing from "./Sections/Pricing";
import Partners from "./Sections/Partners";
import CTA from "./Sections/CTA";

const Layout = () => {
  return (
   <>
      <Hero />
      <div className="min-h-screen text-white bg-black ">
      <About />
        <Services />
      </div>
      
   <div className="min-h-screen text-white " >
        <Features />  
        <Pricing />
      </div>
      
      <div className="min-h-screen text-white bg-black " >
        <Testimonials />
      </div>
     
        <Partners />
        <div className="text-white ">
        <CTA />
        </div>
      
      </>
  );
};
export default Layout;
