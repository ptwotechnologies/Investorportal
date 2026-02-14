import React from "react";
import { Link } from "react-router-dom";

const ReceivedTabSec = () => {
  return (
    <div>
      <div className="h-130 lg:h-123 overflow-y-auto scrollbar-hide">
        <div className="flex items-center  gap-3 mb-2 rounded-lg  bg-white shadow-[inset_0_0_12px_#00000040] transition-all h-25">
          <div className="w-16 h-16 my-2 ml-2 rounded-full border-2 border-gray-300 shrink-0 flex items-center justify-center overflow-hidden bg-gray-200"></div>
          <div className="w-0.5 h-full p-0 bg-[#0010324D] "></div>
          <div className="flex items-center justify-between lg:gap-x-3 gap-x-2 w-full  px-2">
            <div className="my-3   ">
              <h1 className="text-[#001032] font-semibold text-sm">name</h1>
              <p className="text-[#001032]  text-xs">desc</p>

              {/* {req.createdAt && (
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(req.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                  {" • "}
                  {new Date(req.createdAt).toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceivedTabSec;
