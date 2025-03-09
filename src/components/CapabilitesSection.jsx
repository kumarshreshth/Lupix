import { hover } from 'framer-motion';
import React, { useState } from 'react';

const CapabilitiesSection = ({ hide, setHide }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const capabilities = [
    {
      title: 'Brand Solutions',
      description:
        'Our Strategists, Designers and Video Editors provide holistic solutions to grow your digital presence and achieve business goals.',
      items: [
        'Social Media Management',
        'Original Content and Copywriting',
        'Graphic Design',
        'Video Editing',
        'Videography',
        'Product Photography',
        'Campaign Planning',
        'New Brand Launch and Rebranding',
      ],
    },
    {
      title: 'Tech Solutions',
      description:
        'Our Development Solutions leverage cutting-edge technology to create seamless digital experiences that drive business growth.',
      items: [
        'Custom Web Development',
        'Web Personalization',
        'UI/UX',
        'Search Engine Optimization',
        'CRM & ERP Solution',
        'E-Commerce',
        'Email Marketing',
      ],
    },
    {
      title: 'Research and Ads Solution',
      description:
        'We believe data-driven insights are the foundation of every successful campaign. Our research team analyzes market trends and consumer behavior, while our Google & Meta Ads solutions ensure precise targeting and maximum ROI for your brand.',
      items: [
        'Market Research',
        'Customer Behaviour',
        'Satisfaction Analysis',
        'Campaign Analysis',
        'Google Ads Campaign',
        'Meta Ads Campaign',
      ],
    },
    {
      title: 'Professional Shoot',
      description:
        'We believe high-quality visuals are key to a strong brand presence. Our professional shoot team specializes in capturing stunning photos and videos, ensuring your brand stands out with compelling, high-impact content tailored for your audience.',
      items: [
        'Videography',
        'Product Shoot',
        'Product Photography',
        'Corporate & Brand Shoots',
        'Social Media Content Creation',
        'Creative Storytelling',
        'Cinematic Editing',
      ],
    },
  ];

  return (
    <div className="p-4 md:p-8">
      {/* Section Title */}
      <div
        className="text-center"
        id="services"
      >
        <p className="text-[#D45D01] text-base sm:text-lg md:text-xl">
          OUR CAPABILITIES
        </p>
        <p className="text-white text-xl sm:text-2xl md:text-4xl mt-5 font-bold">
          We can help you with...
        </p>
      </div>

      {/* Capability Blocks */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
        {capabilities.map((capability, index) => (
          <div
            key={index}
            className={`text-white h-[310px] lg:h-[415px] w-auto p-2  cursor-pointer transition-opacity duration-700 rounded-2xl ${
              hoveredIndex === index
                ? 'lg:scale-105 bg-[#D45401]'
                : 'lg:flex lg:justify-center lg:items-center bg-[#D45401]/50'
            }`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <p className={'mt-1 text-center text-base font-extrabold'}>
              {capability.title}
            </p>
            <div
              className={`transition-all duration-700 ${
                hoveredIndex === index ? '' : 'lg:hidden'
              }`}
            >
              <p className={`mt-1 text-gray-200 text-xs xl:text-sm`}>
                {capability.description}
              </p>
              <ol className={`mt-1 list-inside list-disc`}>
                {capability.items.map((item, index) => (
                  <li
                    key={index}
                    className={`text-gray-200 text-xs xl:text-sm p-1 font-extrabold`}
                  >
                    {item}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <button
          className="mt-10 p-4 bg-[#D45D01] rounded-xl text-xs sm:text-base md:text-lg text-black hover:text-white transition duration-300 cursor-pointer"
          onClick={() => {
            setHide(false);
          }}
        >
          Book A Call
        </button>
      </div>
    </div>
  );
};

export default CapabilitiesSection;
