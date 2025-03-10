import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import logo from '../asset/logo.png';

export default function Navbar({ hide, setHide }) {
  const texts = [
    '.Digital',
    '.Media',
    '.Tech',
    '.Production',
    '.Web',
    '.Ads',
    '.',
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const navLink = [
    { title: 'About', ref: '#' },
    { title: 'Services', ref: '#services' },
    //{ title: 'Blogs', ref: '#blog' },
    { title: 'FAQ', ref: '#faq' },
  ];

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest > 0) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(false);
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setAnimate(true);
      }, 100);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-white">
      <nav className="pt-4 pl-4 pr-4 flex justify-between items-center">
        <div>
          <div style={{ display: hidden ? 'none' : 'block' }}>
            <img
              src={logo}
              alt="Lupix"
              className="w-12 h-10 sm:w-14 sm:h-12 lg:w-16 lg:h-14"
              id="logo"
            />
          </div>
          <div className="flex items-start">
            <div className="text-sm sm:text-base md:text-xl">Lupix</div>
            <div className="relative flex">
              <div
                className={`absolute text-sm sm:text-base md:text-xl text-[#D45401] ${
                  animate ? 'animate-scrollUp' : ''
                }`}
              >
                {texts[index]}
              </div>
            </div>
          </div>
        </div>

        <div className="md:p-4 flex items-center space-x-8">
          <div className="hidden md:flex space-x-4">
            {navLink.map((item, index) => (
              <a
                key={index}
                href={item.ref}
                className="text-sm sm:text-base md:text-xl hover:text-[#D45D01] transition duration-300"
              >
                {item.title}
              </a>
            ))}
          </div>

          <button
            className="hidden md:block p-2 bg-[#D45D01] rounded-xl text-xl text-black hover:text-white transition duration-300 cursor-pointer"
            type="button"
            onClick={() => setHide(false)}
          >
            Book a Meeting
          </button>

          <button
            className="md:hidden text-white p-2 text-lg cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="md:hidden absolute right-0 bg-black opacity-100 text-white p-5 z-30 w-[30%] flex flex-col items-center space-y-10 rounded-xl">
          {navLink.map((item, index) => (
            <a
              key={index}
              href={item.ref}
              className="text-lg hover:text-[#D45D01] transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              {item.title}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
