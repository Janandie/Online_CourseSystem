import React from 'react';
import { FaTwitter, FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-green-100 to-pink-100 py-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 p-8 sm:p-12">
        {/* OnlineSchool Section */}
        <div>
          <div className="flex items-center mb-4 max-w-sm mx-auto">
            <div><img src="/footer/icon.png" alt="OnlineSchool Logo" className="w-6 h-6 sm:w-8 sm:h-8" /></div>
            <h3 className="text-sm sm:text-base lg:text-lg font-semibold ml-2">OnlineSchool</h3>
          </div>
          <p className="text-xs sm:text-sm mb-4 max-w-sm mx-auto">
            Unlock knowledge with expert-led online courses.
          </p>
          <h1 className="text-xs sm:text-base lg:text-base font-semibold py-2 max-w-sm mx-auto">Stay Connected</h1>
          <div className="flex space-x-2 sm:space-x-3 max-w-sm mx-auto">
            <a href="#" className="text-gray-600 hover:text-gray-800 text-base sm:text-lg">
              <FaTwitter />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800 text-base sm:text-lg">
              <FaFacebookF />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800 text-base sm:text-lg">
              <FaLinkedinIn />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800 text-base sm:text-lg">
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Quick Links Section */}
        <div>
          <h4 className="text-sm sm:text-base lg:text-lg font-semibold mb-1 max-w-sm mx-auto">Quick Links</h4>
          <ul className="space-y-0.5 text-xs sm:text-sm list-none max-w-sm mx-auto">
            <li><a href="#" className="hover:text-gray-600">Home</a></li>
            <li><a href="#" className="hover:text-gray-600">Courses</a></li>
            <li><a href="#" className="hover:text-gray-600">About Us</a></li>
            <li><a href="#" className="hover:text-gray-600">Contact</a></li>
          </ul>
        </div>

        {/* Others Section */}
        <div>
          <h4 className="text-sm sm:text-base lg:text-lg font-semibold mb-1 max-w-sm mx-auto">Others</h4>
          <ul className="space-y-0.5 text-xs sm:text-sm list-none max-w-sm mx-auto">
            <li><a href="#" className="hover:text-gray-600">Mentors</a></li>
            <li><a href="#" className="hover:text-gray-600">Blog</a></li>
            <li><a href="#" className="hover:text-gray-600">404</a></li>
            <li><a href="#" className="hover:text-gray-600">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-gray-600">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Contact Us Section */}
        <div>
          <h4 className="text-sm sm:text-base lg:text-lg font-semibold mb-1 max-w-sm mx-auto">Contact Us</h4>
          <ul className="space-y-0.5 text-xs sm:text-sm list-none max-w-sm mx-auto">
            <li><a href="tel:+94712347650" className="hover:text-gray-600">+94 712 347 650</a></li>
            <li><a href="mailto:hello@onlineschool.com" className="hover:text-gray-600">hello@onlineschool.com</a></li>
            <li><span className="hover:text-gray-600">Colombo 10, Colombo</span></li>
          </ul>
        </div>
      </div>
      <div className="text-center text-xs mt-4 sm:mt-6">
        <p>2025 © Fuchsius. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;