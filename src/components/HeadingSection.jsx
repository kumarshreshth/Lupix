import React from 'react';
import bg from '../asset/bg.png';

const HeadingSection = ({ hide, setHide }) => {
  return (
    <div className="relative text-center mt-4 sm:mt-6 md:mt-8 p-6 sm:p-8 md:p-12">
      <div className="absolute left-0 right-0 flex justify-center items-center z-10">
        <div className="w-[60vw] h-[30vh] sm:w-[50vw] sm:h-[35vh] md:w-[40vw] md:h-[40vh] lg:w-[500px] lg:h-[300px] bg-[#D45401] rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <p className="text-white mt-4 sm:mt-6 md:mt-8 p-2 text-lg sm:text-4xl md:text-7xl max-w-[90%] sm:max-w-3xl mx-auto font-bold">
          Leading The Pack In Digital Solution
        </p>

        <p className="text-gray-500 mt-4 sm:mt-6 md:mt-8 p-2 text-sm sm:text-base md:text-xl max-w-[90%] sm:max-w-3xl mx-auto">
          At LUPIX, we don't just create websites; we craft digital experiences
          that convert. With our expertise in web development, social media
          management, and ad campaign optimization, we empower your brand to
          thrive in today's competitive landscape.
        </p>

        <button
          className="p-4 mt-8 bg-[#D45D01] rounded-xl text-xs sm:text-base md:text-lg text-black hover:text-white transition duration-300 cursor-pointer"
          onClick={() => {
            setHide(false);
          }}
        >
          Book A Meeting
        </button>
      </div>
    </div>
  );
};

export default HeadingSection;
