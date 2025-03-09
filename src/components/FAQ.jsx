import React, { useState } from 'react';
import { sendDoubt } from './sendMail.js';

const FAQ = () => {
  const FAQs = [
    {
      question: 'How long does it take to see results?',
      answer:
        'Results vary depending on your industry and goals, but most clients start seeing improvements in engagement and growth within the first few months of consistent strategy execution. ',
    },
    {
      question: 'What makes your service different from others?',
      answer:
        'We focus on personalized strategies, high-quality content, and data-driven marketing to ensure measurable growth for your business rather than generic solutions.',
    },
    {
      question: 'Do you offer one-time services or only long-term plans?',
      answer:
        'We provide both one-time services and long-term plans, depending on your needs. However, long-term strategies typically yield better and more sustainable results.',
    },
    {
      question:
        'Can you handle all aspects of digital marketing for my business?',
      answer:
        "Yes, we offer end-to-end digital marketing solutions, including content creation, social media management, paid ads, SEO, and more, tailored to your brand's needs.",
    },
  ];

  const [hidden, setHidden] = useState(false);
  const [Cindex, setIndex] = useState(null);

  const [message, setMessage] = useState({ text: '', email: '' });
  const [status, setStatus] = useState({ text: '', type: '' });

  const handleChange = (e) => {
    setMessage({ ...message, [e.target.name]: e.target.value });
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const askDoubt = async (e) => {
    e.preventDefault();
    console.log(message);
    try {
      const response = await sendDoubt(message);
      if (response == 'OK') {
        await delay(500);
        setMessage({ text: '', email: '' });
        setStatus({ text: 'Question Send', type: 'success' });
        setTimeout(() => {
          setStatus({ text: '', type: '' });
        }, 3000);
      }
    } catch (error) {
      setStatus({ text: 'Error occured! Try again', type: 'error' });
      setTimeout(() => {
        setStatus({ text: '', type: '' });
      }, 3000);
    }
  };

  return (
    <>
      {status.text && (
        <p
          className={`fixed top-5 right-5 bg-black z-30 p-3 rounded-xl border-2 border-white opacity-80 transition-opacity duration-300 ${
            status.type == 'success' ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {status.text}
        </p>
      )}
      <div
        className="bg-gray-300 text-black z-10"
        id="faq"
      >
        <div className="text-center mt-6 md:mt-10 p-6 md:p-10">
          <div className="space-y-4">
            <p className="text-lg sm:text-xl md:text-4xl font-bold">FAQ's</p>
            <p className="text-[#11120499] text-sm sm:text-base md:text-lg">
              Providing answer to your questions
            </p>
          </div>
          <div className="text-white">
            <div className="flex flex-col space-y-4 mt-4 sm:mt-6 md:mt-8 p-4 sm:p-6 md:p-8">
              {FAQs.map((item, index) => (
                <div
                  key={index}
                  className="bg-black rounded-xl max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto w-full hover:scale-105"
                  onClick={() => {
                    setHidden(!hidden);
                    setIndex(index);
                  }}
                >
                  <div>
                    {/* Question Section */}
                    <div className="flex justify-between items-center p-3 sm:p-4 cursor-pointer">
                      <p className="text-sm sm:text-base md:text-lg">
                        {item.question}
                      </p>
                      <i
                        className={`p-2 bg-[#D45D01] text-black text-xs sm:text-sm rounded-full transition-transform duration-300 ${
                          hidden && Cindex == index
                            ? 'fa-solid fa-angle-up'
                            : 'fa-solid fa-angle-down'
                        }`}
                      ></i>
                    </div>

                    {/* Answer Section */}
                    <p
                      className={`p-2 text-gray-500 text-sm sm:text-base transition-opacity duration-300 ${
                        hidden && Cindex == index ? '' : 'hidden'
                      }`}
                    >
                      {item.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <form onSubmit={askDoubt}>
            <div className="mt-4 md:mt-8 p-4 md:p-8">
              <textarea
                placeholder="Ask your query"
                name="text"
                value={message.text}
                className="border-2 border-black text-[#11120499] rounded-md w-full h-32 resize-none p-3"
                onChange={handleChange}
                required
                autoComplete="false"
              ></textarea>
              <div className="flex flex-row justify-between items-center space-x-2 p-2 mb-18">
                <input
                  placeholder="Enter your email"
                  className="min-w-[150px] w-1/3 border-2 border-black rounded-lg p-1 text-sm"
                  type="email"
                  required
                  autoComplete="off"
                  name="email"
                  value={message.email}
                  onChange={handleChange}
                ></input>
                <button
                  className="text-white text-xs sm:text-sm md:text-base p-3 bg-[#D45401] rounded-xl cursor-pointer hover:text-black duration-300"
                  type="sumbit"
                >
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FAQ;
