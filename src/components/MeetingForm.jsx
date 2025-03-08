import React, { useState } from 'react';
import { sendMail } from './sendMail.js';

const MeetingForm = ({ hide, setHide }) => {
  const [data, setData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    description: '',
  });

  const [message, setMessage] = useState({ text: '', type: '' });

  const [error, setError] = useState({});

  const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneReg = /^\d+$/;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const onSubmit = async (e) => {
    e.preventDefault();
    let newError = {};

    if (!emailReg.test(data.email)) {
      newError.email = 'Enter correct email Id for.eg.example@gmail.com';
    }
    if (!phoneReg.test(data.phoneNumber)) {
      newError.phoneNumber = 'Phone number can only have number';
    }

    setError(newError);

    if (Object.keys(newError).length == 0) {
      await delay(500);
      try {
        const response = await sendMail(data);
        if (response === 'OK') {
          setData({ name: '', email: '', phoneNumber: '', description: '' });
          setHide(true);
          await delay(1000);
          setMessage({ text: 'Email send successfully', type: 'success' });
          setTimeout(() => {
            setMessage({ text: '', type: '' });
          }, 3000);
        }
      } catch (error) {
        console.log(error);
        setData({ name: '', email: '', phoneNumber: '', description: '' });
        setHide(true);
        await delay(1000);
        setMessage({ text: 'Error! Please Try again!!', type: 'error' });
        setTimeout(() => {
          setMessage({ text: '', type: '' });
        }, 3000);
      }
    }
  };

  return (
    <>
      {message.text && (
        <p
          className={`fixed top-5 right-5 bg-black z-30 p-3 rounded-xl border-2 border-white opacity-80 transition-opacity duration-300 ${
            message.type == 'success' ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {message.text}
        </p>
      )}
      <div
        className={`h-screen w-full fixed top-0 left-0 flex justify-center z-30 ${
          hide ? 'hidden' : ''
        }`}
      >
        <div className="bg-black/90 text-white p-2 sm:p-8 md:p-10 w-full relative">
          <button
            className="absolute top-5 right-5"
            onClick={() => setHide(true)}
          >
            <i className="far fa-window-close text-white font-bold cursor-pointer hover:text-[#D45401] text-xl"></i>
          </button>
          <div className="space-y-4 md:space-y-8">
            <h1 className="text-center text-[#D45401] font-extrabold text-xl sm:text-2xl md:text-4xl">
              Book Meeting
            </h1>
            <p className="text-center text-white text-base sm:text-lg md:text-xl">
              Fill the form
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-2">
              <div className="order-2 md:order-1 p-2 md:p-4 space-y-2 md:space-y-4">
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold">
                  <span className="text-[#D45401]">LUPIX</span> | DIGITAL
                  MARKETING AGENCY
                </h1>
                <div className="space-y-4 md:space-y-8">
                  <p className="text-sm sm:text-base md:text-lg">
                    Contact Information
                  </p>
                  <p className="text-sm md:text-base space-x-2">
                    <i className="fa-solid fa-envelope"> </i>
                    <span>lupix.marketing@gmail.com</span>
                  </p>
                  <p className="text-sm md:text-base space-x-2">
                    <i className="fa-solid fa-phone"> </i>
                    <span>+91 8700225266</span>
                  </p>
                  <hr className="text-white w-3/4"></hr>
                  <div className="space-y-4 space-x-8 text-sm md:text-base">
                    <a
                      href="https://www.instagram.com/lupixhq/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-brands fa-instagram"></i>
                    </a>
                    <a
                      href="https://www.facebook.com/profile.php?id=61571364940354"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-brands fa-facebook"></i>
                    </a>
                    <a
                      href="https://www.linkedin.com/company/lupix-digital/?viewAsMember=true"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-brands fa-linkedin"></i>
                    </a>
                  </div>
                </div>
              </div>
              <form
                onSubmit={onSubmit}
                className="order-1 md:order-2"
              >
                <div className="p-2 md:p-4 space-y-4 md:space-y-8">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="text-sm md:text-base font-bold"
                    >
                      NAME
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={data.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="border border-white p-2 rounded-md text-gray-500"
                      required
                      autoComplete="off"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="phoneNumber"
                      className="text-sm md:text-base font-bold"
                    >
                      PHONE NUMBER
                    </label>
                    <input
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={data.phoneNumber}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      className="border border-white p-2 rounded-md text-gray-500"
                      required
                      autoComplete="off"
                    />
                    {error.phoneNumber && (
                      <p className="text-sm md:text-base text-red-800">
                        {error.phoneNumber}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="emailId"
                      className="text-sm md:text-base font-bold"
                    >
                      EMAIL
                    </label>
                    <input
                      type="email"
                      id="emailId"
                      name="email"
                      value={data.email}
                      onChange={handleChange}
                      placeholder="Enter your Mail Id"
                      className="border border-white p-2 rounded-md text-gray-500"
                      required
                      autoComplete="off"
                    />
                    {error.email && (
                      <p className="text-sm md:text-base text-red-800">
                        {error.email}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="description"
                      className="text-sm md:text-base font-bold"
                    >
                      SERVICE REQUEST
                    </label>
                    <textarea
                      type="text"
                      id="description"
                      name="description"
                      value={data.description}
                      onChange={handleChange}
                      placeholder="give short description about the service required"
                      className="border border-white p-2 rounded-md text-gray-500 resize-none"
                      required
                      autoComplete="off"
                    />
                  </div>
                  <div className="mt-5 mb-5 sm:mb-0 flex justify-start md:justify-end">
                    <button
                      className="p-2 text-base md:text-lg bg-[#D45401] rounded-xl cursor-pointer hover:text-black"
                      type="sumbit"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MeetingForm;
