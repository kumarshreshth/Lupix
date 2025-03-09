import React from 'react';
import Footer from './Footer';
import FAQ from './FAQ';

const Last = ({ hide, setHide }) => {
  return (
    <div className="relative">
      <div>
        <FAQ />
      </div>
      <div className="relative z-10 flex justify-center -mt-20 sm:-mt-24 md:-mt-28 lg:-mt-32">
        <div className="w-[300px] sm:w-[350px] md:w-[500px] lg:w-[700px] bg-[#D45401] rounded-2xl p-2 space-y-2 sm:p-4  lg:space-y-4">
          <p className="text-center text-base sm:text-lg lg:text-2xl text-white font-extrabold">
            Join the Digital Revolution with Lupix - Strategize, Create,
            Dominate.
          </p>
          <p className="text-center text-sm sm:text-base lg:text-xl text-gray-200">
            Jump on a meeting with us and start right away!
          </p>
          <div className="flex justify-center items-center p-2">
            <button
              className="bg-white p-2 sm:p-4 rounded-2xl cursor-pointer duration-500 text-sm sm:text-base lg:text-xl hover:text-white hover:bg-black"
              type="button"
              onClick={() => {
                setHide(false);
              }}
            >
              Book A Call
            </button>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Last;
