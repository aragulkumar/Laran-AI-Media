import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import PromptEnhancer from "./components/PromptEnhancer";
import ImageGallery from "./components/ImageGallery";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="font-sans text-gray-900 dark:text-white">
      <Header />
      <Hero />
      <PromptEnhancer />
      <ImageGallery />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default App;
