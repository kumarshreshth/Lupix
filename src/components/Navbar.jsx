import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import logo from '../asset/logo.png';

export default function Navbar({ hide, setHide }) {
  const texts = ['.tech', '.web', '.media', '.ads', '.digital', '.'];
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

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
      }, 50);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-white">
      {/* Desktop View */}
      <nav className="pl-4 pr-4 flex justify-between items-center">
        {/* Logo */}
        <div>
          <div style={{ display: hidden ? 'none' : 'block' }}>
            <img
              src={logo}
              alt="Lupix"
              className="w-18 h-16"
              id="logo"
            />
          </div>
          <div className="flex items-center">
            <div className="text-sm sm:text-base md:text-xl">Lupix</div>
            <div className="relative flex items-center">
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

        {/* Navigation Links + Buttons */}
        <div className="md:p-4 flex items-center space-x-8">
          {/* Desktop Links */}
          <div className="hidden md:flex space-x-4">
            {[
              { title: 'About', ref: '#' },
              { title: 'Services', ref: '#services' },
              { title: 'Blogs', ref: '#blog' },
              { title: 'FAQ', ref: '#faq' },
            ].map((item, index) => (
              <a
                key={index}
                href={item.ref}
                className="text-sm sm:text-base md:text-xl hover:text-[#D45D01] transition duration-300"
              >
                {item.title}
              </a>
            ))}
          </div>

          {/* Book a Meeting Button (Desktop Only) */}
          <button
            className="hidden md:block p-2 bg-[#D45D01] rounded-xl text-xl text-black hover:text-white transition duration-300 cursor-pointer"
            type="button"
            onClick={() => setHide(false)}
          >
            Book a Meeting
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#D45D01] p-2 text-lg cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute right-0 bg-black opacity-100 text-white p-5 z-30 w-[30%] flex flex-col items-center space-y-10">
          {['Process', 'Services', 'Blogs', 'FAQ'].map((item) => (
            <a
              key={item}
              href="#"
              className="text-lg hover:text-[#D45D01] transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
