import React, { useState } from "react";
import logo from "/ArtesterLogo2.png";
import { Link } from "react-router-dom";
import { FaXTwitter } from "react-icons/fa6";
import { CiLinkedin } from "react-icons/ci";
import { MdKeyboardArrowDown } from "react-icons/md";
import { RiTwitterXLine } from "react-icons/ri";
import { clsx } from 'clsx';

const Footer = () => {
  const [open, setOpen] = useState(null);

  const toggle = (section) => {
    setOpen(open === section ? null : section);
  };
  return (
    <footer className="bg-white text-[#001032CC] px-6 lg:px-20 lg:pt-14">
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-12">
        {/* Left Section */}
        <div className="max-w-sm">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-6">
            <img src={logo} className="w-50" />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-5">
            <button className="px-6 py-2 text-sm bg-gray-300 rounded-sm">
              Sign in
            </button>
            <button className="px-6 py-2 text-sm bg-[#0B1C39] text-white rounded-sm">
              Sign up
            </button>
          </div>
        </div>

        {/* Right Links */}
        <div id="desktop" className="hidden lg:block">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Auxiliaries</h4>
              <ul className="space-y-2 text-gray-600">
                <Link to="/subscription">
                  <li className="pb-2">Subscriptions</li>
                </Link>
                <Link to="/profile">
                  <li>Profiles</li>
                </Link>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Pricing</h4>
              <ul className="space-y-2 text-gray-600">
                <Link to="/startup">
                  <li className="pb-2">Startups</li>
                </Link>
                <Link to="/serviceprofessional">
                  <li className="w-[50%]">Service Professionals</li>
                </Link>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Resources</h4>
              <ul className="space-y-2 text-gray-600">
                <Link to="/about">
                  <li className="pb-2">About Us</li>
                </Link>
                <Link to="/contactus">
                  <li className="pb-2">Contact Us</li>
                </Link>
                <Link to="/channelpartners">
                  <li>Channel Partners</li>
                </Link>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Policies</h4>
              <ul className="space-y-2 text-gray-600">
                <Link to="/termconditions">
                  <li className="pb-2">Term & Conditions</li>
                </Link>
                <Link to="/privacypolicy">
                  <li className="pb-2">Privacy Policy</li>
                </Link>
                <Link to="/cookiespolicy">
                  <li>Cookies Policy</li>
                </Link>
              </ul>
            </div>
          </div>
        </div>

        <div id="phone" className="block md:hidden text-sm">
          {/* Auxiliaries */}
          <div className="border-b py-3">
            <div
              onClick={() => toggle("aux")}
              className="flex justify-between items-center cursor-pointer"
            >
              <h4 className="font-semibold">Auxiliaries</h4>
              <MdKeyboardArrowDown size={20} className={`transform transition ${
                  open === "aux" ? "rotate-180" : ""
                }`} />
             
            </div>

            {open === "aux" && (
              <ul className="mt-3 space-y-2 text-gray-600">
                <Link to="/subscription">
                  <li className="pb-1">Subscriptions</li>
                </Link>
                <Link to="/profile">
                  <li>Profiles</li>
                </Link>
              </ul>
            )}
          </div>

          {/* Pricing */}
          <div className="border-b py-3">
            <div
              onClick={() => toggle("pricing")}
              className="flex justify-between items-center cursor-pointer"
            >
              <h4 className="font-semibold">Pricing</h4>
              <MdKeyboardArrowDown  size={20} className={`transform transition ${
                  open === "pricing" ? "rotate-180" : ""
                }`} />
              
            </div>

            {open === "pricing" && (
              <ul className="mt-3 space-y-2 text-gray-600">
                <Link to="/startup">
                  <li  className="pb-1">Startups</li>
                </Link>
                <Link to="/serviceprofessional">
                  <li>Service Professionals</li>
                </Link>
              </ul>
            )}
          </div>

          {/* Resources */}
          <div className="border-b py-3">
            <div
              onClick={() => toggle("resources")}
              className="flex justify-between items-center cursor-pointer"
            >
              <h4 className="font-semibold">Resources</h4>
              <MdKeyboardArrowDown  size={20} className={`transform transition ${
                  open === "resources" ? "rotate-180" : ""
                }`}/>
              
            </div>

            {open === "resources" && (
              <ul className="mt-3 space-y-2 text-gray-600">
                <Link to="/about">
                  <li  className="pb-1">About Us</li>
                </Link>
                <Link to="/contactus">
                  <li  className="pb-1">Contact Us</li>
                </Link>
                <Link to="/channelpartners">
                  <li>Channel Partners</li>
                </Link>
              </ul>
            )}
          </div>

          {/* Policies */}
          <div className="py-3">
            <div
              onClick={() => toggle("policies")}
              className="flex justify-between items-center cursor-pointer"
            >
              <h4 className="font-semibold">Policies</h4>
              <MdKeyboardArrowDown  size={20} className={`transform transition ${
                  open === "policies" ? "rotate-180" : ""
                }`} />
            </div>

            {open === "policies" && (
              <ul className="mt-3 space-y-2 text-gray-600">
                <Link to="/termconditions">
                  <li  className="pb-1">Term & Conditions</li>
                </Link>
                <Link to="/privacypolicy">
                  <li  className="pb-1">Privacy Policy</li>
                </Link>
                <Link to="/cookiespolicy">
                  <li>Cookies Policy</li>
                </Link>
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-2 mt-8" />

      {/* Bottom Bar */}
      <div className="flex  md:flex-row justify-between items-center lg:text-sm  text-[9px] lg:gap-4">
        <p>Copyrights 2025 All Rights Reserved. Artestor Technologies LLP</p>

        {/* Social Icons */}
        <div className="lg:hidden"> 
            <div className="flex gap-2 lg:gap-4">
          <CiLinkedin size={18} />
         <RiTwitterXLine size={18} />
        </div>
        </div>

        <div className=" hidden lg:block"> 
            <div className="flex gap-2 lg:gap-4">
          <CiLinkedin size={25} />
         <RiTwitterXLine size={25} />
        </div>
        </div>
      </div>
      <hr className="my-2" />

      {/* Disclaimer */}
      <div className="mt-10 text-xs  leading-5">
        <p className="mb-4 font-semibold">Disclaimer:</p>
        <p className="mb-3">
          The information contained herein is provided for informational and
          discussion purposes only and is not intended to be a recommendation
          for any investment, service, product, or other advice of any kind, and
          shall not constitute or imply an offer of any kind. Any investment
          opportunities and/or products or services shown here will only be
          completed pursuant to formal offering materials, a letter of intent,
          and/or any other agreements as determined by Artestor containing full
          details regarding risks, minimum investment, fees, and expenses of
          such transaction. The terms of any product, service, or particular
          investment opportunity, including size, costs, and other
          characteristics, are set forth in the applicable constituent documents
          for such product, service or particular investment opportunity and may
          differ materially from those presented in this presentation. Such
          terms are subject to change without notice. For more information on
          Artestor and its products and services.
        </p>
        <p className="mb-3">
          Quotes included in these materials related to Artestor's services
          should not be construed in any way as an endorsement of AngelList's
          advice, analysis, or other service rendered to its clients.
        </p>
        <p>
          “Assets on platform” refers to the amount of money being deployed by
          fund managers who use Artestor’s software, which includes fund
          administration services. This does not refer to any amount of money
          being deployed with or managed by Artestor’s affiliated exempt
          reporting adviser, Artestor Technologies LLP (“Artestor Technologies”)
        </p>
      </div>
    </footer>
  );
};

export default Footer;
