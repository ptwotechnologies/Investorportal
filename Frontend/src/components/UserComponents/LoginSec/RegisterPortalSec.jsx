import React, { useState } from "react";
import logo from "/ArtesterLogo2.png";
import { Button } from "@/components/ui/button";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios"; // or your custom API service

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Calendar2 from "./Calendar2";
import { serverUrl } from "@/App";

const RegisterPortalSec = () => {
  const location = useLocation();
  const { role } = location.state || {};

  const [activeTab, setActiveTab] = useState("Business Type");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [businessType, setBusinessType] = useState(activeTab);
  const [dob, setDob] = useState(null); // Date object from Calendar2

  const tabs = [
    { id: "Manufacturing", label: "Manufacturing" },
    { id: "Service", label: "Service" },
  ];

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!role) {
      alert("Role not found. Please go back and select a role.");
      return;
    }

    if (!dob) {
      alert("Please select the founding date");
      return;
    }

    try {
      // Convert Date object to YYYY-MM-DD string
      const foundedOnString = dob.toISOString().split("T")[0];

      const businessDetails = {
        number: mobile,
        businessName,
        businessEmail,
        website,
        businessType,
        foundedon: foundedOnString,
      };

      const payload = {
        role,
        email,
        password,
        businessDetails,
      };

      const response = await axios.post(`${serverUrl}/user/signup`, payload);

      if (response.status === 201) {
        // Save userId to localStorage for later use
        localStorage.setItem("userId", response.data.userId);

        navigate("/portaldetails", { 
          state: { 
            userId: response.data.userId,
            role 
          } 
        });
      } else {
        console.error("Unexpected response:", response);
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Axios Error: ", error);
      alert(error.response?.data?.message || "Server error");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center lg:min-h-dvh">
        <div id="left" className="w-[40%] hidden lg:block mx-auto">
          <div className="flex flex-col justify-between items-center gap-y-25">
            <div>
              <img src={logo} alt="Logo" className="w-100" />
              <p className="text-[#001032] text-xl w-full">
                Allows you to get funding,
              </p>
              <p className="text-[#001032] text-xl">
                resources and investor connect
              </p>
            </div>
            <div>
              <p className="text-lg w-full text-[#000000] relative top-45">
                Terms, Privacy Disclosures Cookie Settings © Artestor Technologies LLP
              </p>
            </div>
          </div>
        </div>

        <div id="right" className="lg:w-[47%] lg:pl-20 lg:px-10 lg:py-5 text-center w-full">
          <div className="lg:bg-[#001032] lg:p-3 w-full lg:rounded-lg">
            <Card className="w-full lg:h-auto mx-auto rounded-lg">
              <CardHeader>
                <CardTitle>
                  <img src={logo} alt="Logo" className="lg:w-55 w-40 mx-auto  mb-1" />
                </CardTitle>
                <CardDescription className="mb-1 text-[#001032] text-sm lg:text-sm font-semibold">
                  Get the most benefits from our pool of possible clients for you
                </CardDescription>
                <CardAction></CardAction>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-3">
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email or Phone"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="p-5 font-medium text-[#00103280]"
                    />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="p-5 font-medium text-[#00103280]"
                    />
                    <Input
                      id="mobile"
                      type="text"
                      placeholder="Mobile or Phone"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      required
                      className="p-5 font-medium text-[#00103280]"
                    />
                    <Input
                      id="businessName"
                      type="text"
                      placeholder="Business Name"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      required
                      className="p-5 font-medium text-[#00103280]"
                    />
                    <Input
                      id="businessEmail"
                      type="email"
                      placeholder="Business Email"
                      value={businessEmail}
                      onChange={(e) => setBusinessEmail(e.target.value)}
                      required
                      className="p-5 font-medium text-[#00103280]"
                    />
                    <Input
                      id="website"
                      type="text"
                      placeholder="Website"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      className="p-5 font-medium text-[#00103280]"
                    />

                    {/* Dropdown for business type */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          className="
                            w-full
                            bg-white
                            border border-[#0010321A]
                            rounded-md
                            h-12
                            px-5
                            flex justify-between items-center
                            text-[#00103280]
                            font-medium
                            cursor-pointer
                          "
                        >
                          {activeTab}
                          <IoIosArrowDown className="mt-0" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="mt-2 w-full bg-white border border-[#001032] rounded-md shadow-sm">
                        {tabs.map((tab) => (
                          <DropdownMenuItem
                            key={tab.id}
                            onClick={() => {
                              setActiveTab(tab.label);
                              setBusinessType(tab.label);
                            }}
                            className="text-[#00103280] text-md px-5 py-2"
                          >
                            {tab.label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Calendar component */}
                    <Calendar2 onChange={(date) => setDob(date)} />
                  </div>

                  <CardFooter className="flex-col gap-2 lg:mt-2 mb-1 w-full px-0 mt-15">
                    <Button type="submit" className="w-full bg-[#001032]">
                      Continue
                    </Button>
                  </CardFooter>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPortalSec;
