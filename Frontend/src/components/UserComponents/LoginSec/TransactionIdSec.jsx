import React, { useState, useEffect } from "react";
import logo from "/ArtesterLogo2.png";
import { Button } from "@/components/ui/button";
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
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "@/App";

const TransactionIdSec = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [transactionId, setTransactionId] = useState("");
  const [userId, setUserId] = useState(location.state?.userId || null);

  // If userId missing → check localStorage
  useEffect(() => {
    if (!userId) {
      const stored = localStorage.getItem("userId");
      if (stored) setUserId(stored);
    }
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!transactionId) {
      alert("Please enter Transaction ID or UTR number");
      return;
    }

    if (!userId) {
      alert("User ID missing! Please restart signup.");
      return;
    }

    try {
      const payload = {
        userId,
        transactionId,
        paymentStatus: "pending", // payment approval admin karega
      };

      const res = await axios.put(`${serverUrl}/user/payment`, payload);

      if (res.status === 200) {
        navigate("/paymentsuccess", { state: { userId } });
      } else {
        alert("Something went wrong!");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Server error");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center lg:min-h-dvh ">
        <div id="left" className=" w-[40%] hidden lg:block mx-auto ">
          <div className="flex flex-col justify-between items-center gap-y-25">
            <div>
              <img src={logo} alt="Logo" className=" w-100 " />
              <p className=" text-[#001032] text-xl w-full ">
                Allows you to get funding,
              </p>
              <p className=" text-[#001032] text-xl   ">
                resources and investor connect
              </p>
            </div>
            <div>
              <p className="  text-lg w-full  text-[#000000] relative top-45">
                Terms, Privacy Disclosures Cookie Settings © norf.kD Technologies LLP
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div
          id="right"
          className="lg:w-[47%] lg:pl-20 lg:px-10 lg:py-5 text-center w-full"
        >
          <div className="lg:bg-[#001032] h-screen lg:h-auto lg:p-3 w-full lg:rounded-lg ">
            <Card className="w-full lg:h-auto mx-auto rounded-lg">

              <CardHeader>
                <CardTitle>
                  <img
                    src={logo}
                    alt="Logo"
                    className="lg:w-55 w-45 mx-auto lg:my-20 my-15"
                  />
                </CardTitle>

                <CardDescription className="text-[#001032] text-lg lg:text-sm font-semibold mt-8">
                  <p className="lg:w-[80%] mx-auto">
                    Confirm the payment by adding transaction detail
                  </p>
                </CardDescription>

                <CardAction></CardAction>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-6 px-6 lg:mb-48 mb-60">
                    <div className="grid gap-2 ">
                      <Input
                        type="text"
                        placeholder="Enter transaction ID or UTR number"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        required
                        className="lg:p-5 font-medium text-[#00103280]"
                      />
                    </div>
                  </div>

                  <CardFooter className="absolute bottom-5 w-full lg:static">
                    <Button
                      type="submit"
                      className="w-full bg-[#001032] mt-5 lg:mt-0"
                    >
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

export default TransactionIdSec;
