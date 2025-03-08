import React from 'react';

const DefineSection = () => {
  return (
    <div className="block space-y-4 text-center lg:space-y-0 lg:flex lg:justify-around lg:space-x-8 lg:items-center mt-6 md:mt-10 p-6 md:p-10">
      <div className="text-white font-extrabold text-xl sm:text-2xl md:text-4xl">
        <p className="whitespace-nowrap">What defines us ?</p>
      </div>
      <div className="flex flex-col justify-start text-left">
        <p className="text-gray-300 text-base sm:text-lg md:text-xl mt-5 md:mt-0">
          We're brand builders at heart,creators by design,tech enthusiasts in
          practice,and integrated at our core.
        </p>
        <p className="text-gray-500 text-base sm:text-lg md:text-xl mt-5">
          We're on a mission to drive business growth by delivering world-class
          marketing solutions. With a team of experts. we provide impactful
          strategies that help businesses scale, stand out, and succeed on a
          global stage.
        </p>
      </div>
    </div>
  );
};

export default DefineSection;
