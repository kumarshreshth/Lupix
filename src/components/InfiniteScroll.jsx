import React from 'react';
import { motion } from 'framer-motion';

const InfiniteScroll = () => {
  const elements = [
    'Social Media Management',
    'Website Development',
    'Professional Shoots',
    'Managing Ad Campaigns',
    'Graphic Designing',
    'Search Engine Optimization',
  ];

  return (
    <div className="mt-8 mb-8 p-4 max-w-screen overflow-hidden gradient mx-auto">
      <div className="flex relative">
        <motion.div
          initial={{ x: '0%' }}
          animate={{ x: '-100%' }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="flex flex-shrink-0"
        >
          {elements.map((item, index) => (
            <div
              key={index}
              className="p-4 text-base sm:text-lg md:text-xl text-white font-bold"
            >
              {item}
            </div>
          ))}
        </motion.div>
        <motion.div
          initial={{ x: '0%' }}
          animate={{ x: '-100%' }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="flex flex-shrink-0"
        >
          {elements.map((item, index) => (
            <div
              key={index}
              className="p-4 text-base sm:text-lg md:text-xl text-white font-bold"
            >
              {item}
            </div>
          ))}
        </motion.div>
        <motion.div
          initial={{ x: '0%' }}
          animate={{ x: '-100%' }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="flex flex-shrink-0"
        >
          {elements.map((item, index) => (
            <div
              key={index}
              className="p-4 text-base sm:text-lg md:text-xl text-white font-bold"
            >
              {item}
            </div>
          ))}
        </motion.div>
        <motion.div
          initial={{ x: '0%' }}
          animate={{ x: '-100%' }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="flex flex-shrink-0"
        >
          {elements.map((item, index) => (
            <div
              key={index}
              className="p-4 text-base sm:text-lg md:text-xl text-white font-bold"
            >
              {item}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default InfiniteScroll;
