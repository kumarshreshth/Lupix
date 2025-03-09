import React from 'react';
import logo from '../asset/logo.png';

const Footer = () => {
  const handleLink = () => {
    const email = 'lupix.marketing@gmail.com';
    window.open(`https://mail.google.com/mail/?view=cm&to=${email}`);
  };
  return (
    <div className="relative p-4 mt-2">
      <div className="absolute w-full z-0">
        <div className="text-[100px] md:text-[145px] lg:text-[215px] xl:text-[245px] opacity-20 font-extrabold flex justify-center items-center">
          <p className="text-[#D45401]">L</p>
          <p className="text-white">UPIX</p>
        </div>
      </div>

      <div className="relative z-10">
        <div className="mt-8 md:ml-10 md:mt-12 lg:ml-18 lg:mt-20 xl:mt-22 xl:ml-20 flex gap-1 md:gap-4">
          <div className="flex flex-col items-center">
            <div>
              <img
                src={logo}
                alt="Lupix"
                className="w-[80px] sm:w-[100px] md:w-[120px] lg:w-[160px] xl:w-[180px]"
              />
            </div>
            <div className="flex items-center text-[20px] md:text-[28px] lg:text-[32px] xl:text-[38px] font-extrabold">
              <p className="text-[#D45401]">L</p>
              <p className="text-white">UPIX</p>
            </div>
          </div>
          <div className="text-white">
            <p className="text-xs md:text-sm p-2 font-bold">Contact us</p>
            <div className="flex items-center space-x-2 md:space-x-4 text-xs md:text-sm p-2">
              <i className="fa-solid fa-envelope text-white"></i>
              <a
                onClick={handleLink}
                className="cursor-pointer"
              >
                lupix.marketing@gmail.com
              </a>
            </div>
            <div className="flex items-center space-x-2 md:space-x-4 text-xs md:text-sm p-2">
              <i className="fa-solid fa-phone text-white"></i>
              <p>+91 8700225266</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <hr className="h-4 w-11/12 opacity-50 text-white"></hr>
        </div>
        <div className="space-y-4 text-center md:space-y-0 md:flex md:justify-around md:items-center">
          <div className="text-white flex justify-center items-center space-x-4">
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
          <div className="flex justify-center items-center text-white space-x-2 md:space-x-6">
            <a
              className="text-xs md:text-sm cursor-pointer hover:text-[#D45401] transition-opacity duration-500"
              href="#"
            >
              About
            </a>
            <a
              className="text-xs md:text-sm cursor-pointer hover:text-[#D45401] transition-opacity duration-500"
              href="#services"
            >
              Services
            </a>
            {/* <a
              className="text-xs md:text-sm cursor-pointer hover:text-[#D45401] transition-opacity duration-500"
              href="#"
            >
              Blogs
            </a> */}
            <a
              className="text-xs md:text-sm cursor-pointer hover:text-[#D45401] transition-opacity duration-500"
              href="#faq"
            >
              FAQ
            </a>
          </div>
          <div className="text-white text-xs">
            <p>© Copyright 2025 LUPIX.DIGITAL.</p>
            <p>All Right Reserved, All Wrong Reversed.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
