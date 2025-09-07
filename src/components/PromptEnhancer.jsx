import React, { useState } from "react";

const presets = ["Realistic", "Anime", "Cyberpunk", "Oil Painting"];

const PromptEnhancer = () => {
  const [prompt, setPrompt] = useState("");
  const [presetSelected, setPresetSelected] = useState("");
  const [file, setFile] = useState(null);

  const handleUpload = (e) => setFile(e.target.files[0]);

  return (
    <section className="p-6 flex flex-col items-center space-y-4 bg-white dark:bg-gray-800">
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe your vision… (e.g., futuristic city at dusk)"
        className="w-full md:w-2/3 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <div className="flex space-x-2 flex-wrap justify-center">
        {presets.map((preset) => (
          <button
            key={preset}
            onClick={() => setPresetSelected(preset)}
            className={`px-4 py-2 rounded-lg border ${
              presetSelected === preset ? "bg-primary text-white" : "bg-white dark:bg-gray-700 text-gray-700 dark:text-white"
            }`}
          >
            {preset}
          </button>
        ))}
      </div>
      <label className="w-full md:w-2/3 flex justify-center items-center border-dashed border-2 border-gray-300 rounded-lg p-6 cursor-pointer dark:border-gray-600">
        {file ? file.name : "Drag & drop image or click to upload (optional)"}
        <input type="file" className="hidden" onChange={handleUpload} />
      </label>
      <button className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:shadow-xl transition-all">
        Generate
      </button>
    </section>
  );
};

export default PromptEnhancer;
