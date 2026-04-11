import React, { useState, useEffect } from 'react';
import ScrollAreaSec from "./ScrollAreaSec";
import { Link } from "react-router-dom";
import { IoClose } from 'react-icons/io5';
import { createPortal } from 'react-dom';
import axios from 'axios';
import { serverUrl } from '../../../App';
import toast from 'react-hot-toast';

const ChannelPartnerSec4 = () => {
    const [selectedRole, setSelectedRole] = useState(null);

    const [formData, setFormData] = useState({
      role: "",
      firstName: "",
      lastName: "",
      email: "",
      companyName: "",
      website: "",
      linkedin: "",
      alreadyRegistered: false,
      termsAccepted: false
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      if (selectedRole) {
        setFormData(prev => ({ ...prev, role: selectedRole }));
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
      return () => {
        document.body.style.overflow = 'unset';
      };
    }, [selectedRole]);

    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      if (name === "reg") {
        setFormData(prev => ({ ...prev, alreadyRegistered: value === "true" }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: type === "checkbox" ? checked : value
        }));
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!formData.termsAccepted) {
        toast.error("Please accept the terms and conditions.");
        return;
      }
      if (!formData.alreadyRegistered) {
        toast.error("You must register as a Service Professional before applying to be a channel partner.");
        return;
      }
      setLoading(true);
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const referrerEmail = user?.email || "unknown@example.com";

        const response = await axios.post(`${serverUrl}/api/partner-referral/submit`, {
          ...formData,
          referrerEmail
        });
        toast.success(response.data.message || "Referral submitted successfully!");
        setFormData({
          role: "",
          firstName: "",
          lastName: "",
          email: "",
          companyName: "",
          website: "",
          linkedin: "",
          alreadyRegistered: false,
          termsAccepted: false
        });
        setSelectedRole(null);
      } catch (error) {
        console.error("Submission error", error);
        toast.error(error.response?.data?.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

  return (
    <div>
        <div
        id="bottom"
        className=" w-full text-white rounded-4xl lg:rounded-none mt-13 px-4"
      >
        <div className="">
          <h1 className="text-5xl font-normal p-10  hidden lg:block text-[#001032]">Who is this portal for?</h1>
           <h1 className="text-[44px] font-normal px-3  pb-10  w-full lg:hidden tracking-wider leading-11.5 text-[#001032]">Who is this  portal  for?</h1>
          <div className="hidden lg:block">
            <div className="flex justify-center items-center  mx-20  ">
            <div className=" w-[30%]">
              <hr className="border-t border-gray-500 pb-8 w-[90%] " />
              <h3 className="text-2xl pb-5">Startups</h3>
             <div className="rounded-xl w-[90%] h-[400px] bg-gray-200 cursor-pointer" onClick={() => setSelectedRole("Startups")}>
                
                
              </div>
              <p className="pt-4 text-md leading-6 tracking-wider w-[90%] mb-15">
                You’re building something real and ready to scale{" "}
              </p>
            </div>
            <div className=" w-[30%]">
              <hr className="border-t border-gray-500 pb-8 w-[90%] " />
              <h3 className="text-2xl pb-5">Investors</h3>
              <div  className="rounded-xl w-[90%] h-[400px] bg-gray-200 cursor-pointer" onClick={() => setSelectedRole("Investors")}>
                
               
              </div>
              <p className="pt-4 text-md leading-6 tracking-wider w-[90%] mb-15">
                You seek refined, investment-ready startup in your space{" "}
              </p>
            </div>
            <div className=" w-[30%]">
              <hr className="border-t border-gray-500 pb-8 w-[90%] " />
              <h3 className="text-2xl pb-5">Service Professionals</h3>
             <div className="rounded-xl w-[90%] h-[400px] bg-gray-200 cursor-pointer" onClick={() => setSelectedRole("Service Professionals")}>
                
                
              </div>
              <p className="pt-4 text-md leading-6 tracking-wider w-[90%] mb-15">
                You want genuine startup leads without paid ads
              </p>
            </div>

            {/* <div className=" w-[30%] ">
              <hr className="border-t border-gray-500 pb-8 w-[90%] " />
              <h3 className="text-2xl pb-5">Channel Partners</h3>
             <Link to="/channelpartners"> <div className="rounded-xl w-[90%] h-[400px] bg-gray-200">
               
                
              </div></Link>
              <p className="pt-4 text-md leading-6 tracking-wider w-[90%] mb-15">
                You want genuine startup leads without paid ads
              </p>
            </div> */}
          </div>
          </div>
        </div>

        <div className="lg:hidden">
          <ScrollAreaSec onRoleSelect={setSelectedRole} />
        </div>
      </div>

  {selectedRole && createPortal(
    <div className="fixed inset-0 bg-black/50 overflow-y-auto z-[9999]  py-8 pt-30">
        <div className="relative w-[100%] lg:w-[50%] mx-auto mt-10 mb-10">
          <button onClick={() => setSelectedRole(null)} className="absolute -top-10 right-0 text-white hover:text-gray-300">
            <IoClose size={32} />
          </button>
          <div
             id="form"
             className="p-2.5 border-3 rounded-xl border-[#E4E4E4] bg-white shadow-[0px_0px_10px_rgba(0,0,0,0.5)]"
           >
             <form onSubmit={handleSubmit} className="bg-white rounded-xl border-3 border-[#E4E4E4] lg:p-10 px-3 py-5 shadow-[0px_0px_4px_rgba(0,0,0,1)]">
               <input
                 readOnly
                 name="role"
                 value={formData.role}
                 className="p-3 lg:py-6 border rounded-lg w-full mb-4 bg-gray-100 text-black cursor-not-allowed font-medium placeholder-gray-500"
                 placeholder="Role"
               />
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <input
                  required
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="p-3 lg:py-6 border rounded-lg w-full text-black placeholder-gray-500"
                  placeholder="First name"
                />
                <input
                  required
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="p-3 lg:py-6 border rounded-lg w-full text-black placeholder-gray-500"
                  placeholder="Last name"
                />
              </div>

              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="p-3 lg:py-6 border rounded-lg w-full mt-4 text-black placeholder-gray-500"
                placeholder="Work email address"
              />
              <input
                required
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="p-3 lg:py-6 border rounded-lg w-full mt-4 text-black placeholder-gray-500"
                placeholder="Company name"
              />
              <input
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="p-3 lg:py-6 border rounded-lg w-full mt-4 text-black placeholder-gray-500"
                placeholder="Website"
              />
              <input
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                className="p-3 lg:py-6 border rounded-lg w-full mt-4 text-black placeholder-gray-500"
                placeholder="LinkedIn Profile URL"
              />

              <div className="lg:mt-20 mt-10 lg:mb-5 mb-10 text-[#1D2A29CC]">
                <p className="tracking-wide lg:leading-7 text-sm lg:text-md mb-2 lg:mb-0">
                  By clicking, you agree to our Term and Conditions to be a
                  channel partner.
                </p>
                <div className="flex lg:items-center items-start lg:gap-3 gap-1">
                  <input type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} className="mt-1 lg:mt-0" />
                  <span className=" tracking-wide text-sm lg:text-md">
                    I have read all the terms and conditions and I’m ready to be
                    a channel partner.
                  </span>
                </div>
              </div>

              <button type="submit" disabled={loading} className="mt-6 lg:mb-35 mb-20 bg-[#001032] text-white px-8 py-3 rounded-sm text-lg">
                {loading ? "Submitting..." : "Get Started"}
              </button>

              <p className="lg:text-[16px] text-[14px] text-[#1D2A29CC] ">
                Please note that this is an application to seek funding or other
                services for a new venture or business. By clicking "Get
                Started" you agree to Copteno’s Privacy Policy
              </p>
            </form>
          </div>
        </div>
    </div>,
    document.body
  )}
      
    </div>
  )
}

export default ChannelPartnerSec4
