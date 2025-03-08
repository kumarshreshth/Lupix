import React from 'react';

const BoxSection = () => {
  const elements = [
    {
      icon: 'fa-solid fa-magnifying-glass',
      title: 'Discover',
      description:
        'We dive deep into understanding your goals, audience, and challenges.',
    },
    {
      icon: 'fa-solid fa-lightbulb',
      title: 'Strategize',
      description:
        'We craft a custom plan to align your brand with market opportunities.',
    },
    {
      icon: 'fa-solid fa-display',
      title: 'Create',
      description:
        'Our team designs and develops innovative digital solutions that resonate.',
    },
    {
      icon: 'fa-solid fa-rocket',
      title: 'Lauch',
      description:
        'We execute with precision, ensuring a seamless and impactful rollout.',
    },
    {
      icon: 'fa-solid fa-gears',
      title: 'Optimize',
      description:
        'We analyze and refine for continuous improvement and long-term success.',
    },
  ];
  return (
    <div>
      <div className="mt-6 sm:mt-10 p-3 sm:p-5">
        <ul className="block md:flex md:justify-between md:space-x-4 lg:space-x-8 space-y-10 md:space-y-0">
          {elements.map((item, index) => (
            <li
              key={index}
              className="flex flex-col justify-center items-center md:block"
            >
              <i
                className={`${item.icon} p-2 sm:p-4 text-sm sm:text-base md:text-xl text-black bg-[#D45D01] rounded-full`}
              ></i>
              <h5 className="text-white mt-4 md:mt-6 text-sm sm:text-base md:text-lg">
                {item.title}
              </h5>
              <p className="text-gray-500 mt-4 md:mt-6 text-xs sm:text-sm md:text-base">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BoxSection;
