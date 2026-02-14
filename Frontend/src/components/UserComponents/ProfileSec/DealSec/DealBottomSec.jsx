import React from "react";
import { Check, Upload, IndianRupee } from "lucide-react";

const DealBottomSec = () => {
  return (
    <div className="flex items-start gap-3 w-full px-6 py-4">
      <div className="w-[70%]">
        <h1>Active Deals</h1>
        <div className="mt-2 grid grid-cols-1 gap-2">
          <div>
            <div className="bg-white w-full  rounded-2xl shadow-md p-3">
              {/* Top Section */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  {/* Logo */}
                  <div className="w-10 h-10 rounded-full bg-linear-to-r from-pink-500 to-orange-400 flex items-center justify-center text-white font-bold text-lg">
                    S
                  </div>

                  {/* Title */}
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      Stellar
                    </h2>
                    <p className="text-sm text-gray-500">
                      Mobile App Development
                    </p>
                  </div>
                </div>

                {/* Status Badge */}
                <span className="px-4 py-1 text-sm rounded-full bg-purple-100 text-purple-600 font-medium">
                  Awaiting Submission
                </span>
              </div>

              {/* Middle Section */}
              <div className="grid grid-cols-2 gap-6 mt-3">
                {/* Project */}
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-500">Project:</p>
                    <p className="font-semibold text-gray-800">Akshay Dogra</p>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full w-2/3 bg-linear-to-r from-blue-400 to-green-400"></div>
                  </div>
                </div>

                {/* Status Progress */}
                <div>
                  <p className="text-sm text-gray-500">Status:</p>

                  <div className="mt-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-purple-500"></div>
                  </div>
                </div>
              </div>

              {/* Budget Section */}
              <div className="grid grid-cols-3 gap-6 mt-3 text-sm">
                <div className="flex items-center gap-2">
                  <p className="text-gray-500">Budget</p>
                  <p className="font-semibold text-gray-800">₹1,20,000</p>
                </div>

                <div className="flex items-center gap-2">
                  <p className="text-gray-500">Paid</p>
                  <p className="font-semibold text-gray-800">₹45,000</p>
                </div>

                <div className="flex items-center gap-2">
                  <p className="text-gray-500">Remain</p>
                  <p className="font-semibold text-gray-800">₹75,000</p>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="flex items-center justify-between mt-6">
                <div className="flex gap-3">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-100">
                    View Details
                  </button>

                  <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm font-medium hover:bg-indigo-600">
                    Release Oats
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">Due Feb 2026</span>

                  <button className="px-4 py-2 bg-teal-500 text-white rounded-lg text-sm font-medium hover:bg-teal-600">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white w-full  rounded-2xl shadow-md p-3">
              {/* Top Section */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  {/* Logo */}
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-lg">A</span>
                  </div>

                  {/* Title */}
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      NomadX
                    </h2>
                    <p className="text-sm text-gray-500">
                      Mobile App Development
                    </p>
                  </div>
                </div>

                {/* Status Badge */}
                <span className="px-4 py-1 text-sm rounded-full bg-green-100 text-green-600 font-medium">
                  In Progress
                </span>
              </div>

              {/* Middle Section */}
              <div className="grid grid-cols-2 gap-6 mt-3">
                {/* Project */}
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-500">Project:</p>
                  <p className="font-semibold text-gray-800">Arjun Patel</p>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-linear-to-r from-purple-400 to-blue-400"></div>
                  </div>
                </div>

                {/* Status */}
                <div>
                  <p className="text-sm text-gray-500">Status:</p>

                  {/* Red Progress */}
                  <div className="mt-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full w-2/3 bg-red-400"></div>
                  </div>
                </div>
              </div>

              {/* Budget Section */}
              <div className="grid grid-cols-3 gap-6 mt-3 text-sm">
                <div className="flex items-center gap-2">
                  <p className="text-gray-500">Budget:</p>
                  <p className="font-semibold text-gray-800">₹80,000</p>
                </div>

                <div className="flex items-center gap-2">
                  <p className="text-gray-500">Paid:</p>
                  <p className="font-semibold text-gray-800">₹45,000</p>
                </div>

                <div className="flex items-center gap-2">
                  <p className="text-gray-500">Remaining:</p>
                  <p className="font-semibold text-gray-800">₹75,000</p>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="flex items-center justify-between mt-6">
                <div className="flex gap-3">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-100">
                    View Details
                  </button>

                  <button className="px-4 py-2 bg-teal-500 text-white rounded-lg text-sm font-medium hover:bg-teal-600">
                    Release Payment
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">Due 18 Mar 2026</span>

                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium">
                    No options
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[30%]">
        <h1>Quick Insights</h1>
        <div className="mt-2">
             
      <div className=" w-full max-w-sm space-y-6">

        {/* Upcoming Milestones */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h3 className="text-gray-700 font-semibold mb-4">
            Upcoming Milestones
          </h3>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                  1
                </div>
                <span className="text-gray-700">Milestone 2</span>
              </div>
              <span className="text-gray-500">10 days</span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">
                  2
                </div>
                <span className="text-gray-700">Final Delivery</span>
              </div>
              <span className="text-gray-500">12 days</span>
            </div>
          </div>
        </div>

        {/* Payment Alerts */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h3 className="text-gray-700 font-semibold mb-4">
            Payment Alerts
          </h3>

          <div className="bg-gray-50 rounded-xl p-4 flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2">
                <IndianRupee size={16} className="text-gray-600" />
                <span className="text-lg font-semibold text-gray-800">
                  30,000
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Escrow ↓ 2 days
              </p>
            </div>

            <span className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-medium">
              Escrow 2 days
            </span>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h3 className="text-gray-700 font-semibold mb-4">
            Recent Activities
          </h3>

          <div className="space-y-4 text-sm">

            {/* Activity 1 */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <Check size={16} className="text-green-600" />
              </div>
              <div>
                <p className="text-gray-800 font-medium">
                  Milestone 1 submitted
                </p>
                <p className="text-xs text-gray-500">Stellar</p>
              </div>
            </div>

            {/* Activity 2 */}
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <IndianRupee size={16} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-800 font-medium">
                    ₹25,000 released
                  </p>
                  <p className="text-xs text-gray-500">PQ Solutions</p>
                </div>
              </div>
              <span className="text-xs text-gray-400">5 hours ago</span>
            </div>

            {/* Activity 3 */}
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                  <Upload size={16} className="text-indigo-600" />
                </div>
                <div>
                  <p className="text-gray-800 font-medium">
                    UI Files uploaded
                  </p>
                  <p className="text-xs text-gray-500">PQ Solutions</p>
                </div>
              </div>
              <span className="text-xs text-gray-400">1 day ago</span>
            </div>

          </div>
        </div>

      </div>
 
        </div>
      </div>
    </div>
  );
};

export default DealBottomSec;
