import React, { useState } from "react";
import { motion } from "framer-motion";

const ImageGallery = () => {
  const [images, setImages] = useState([]);

  return (
    <section className="p-6 bg-gray-50 dark:bg-gray-900">
      <h3 className="text-2xl font-bold mb-4 text-center">Your Creations</h3>
      {images.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">No images yet. Generate something above to populate your feed.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((img, i) => (
            <motion.div
              key={i}
              className="bg-white dark:bg-gray-800 p-2 rounded-2xl shadow-lg hover:shadow-2xl transition-all"
              whileHover={{ scale: 1.05 }}
            >
              <img src={img} alt="AI" className="rounded-xl w-full h-auto" />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ImageGallery;
