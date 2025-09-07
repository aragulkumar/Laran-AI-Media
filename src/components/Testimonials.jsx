import React from "react";

const testimonials = [
  { name: "Rhea Kapoor", role: "Designer @ NeonPixel", text: "The UI feels like magic. Smooth, fast, and premium." },
  { name: "Arjun Mehta", role: "Founder @ FluxAI", text: "Exactly the MidJourney-level polish we needed for our launch." },
  { name: "Sana I.", role: "Content Lead @ VibeStudio", text: "Favorites + history saved my workflow hours each week." },
];

const Testimonials = () => (
  <section className="p-6 bg-white dark:bg-gray-800">
    <h3 className="text-2xl font-bold mb-4 text-center">Loved by creators</h3>
    <div className="grid md:grid-cols-3 gap-6">
      {testimonials.map((t, i) => (
        <div key={i} className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl shadow-md">
          <p className="italic mb-4">"{t.text}"</p>
          <p className="font-bold">{t.name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{t.role}</p>
        </div>
      ))}
    </div>
  </section>
);

export default Testimonials;
