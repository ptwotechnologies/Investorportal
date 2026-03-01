import React from "react";
import { IndianRupee, AlignJustify } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ButtonGroup, ButtonGroupSeparator } from "@/components/ui/button-group";
import { IoGrid } from "react-icons/io5";
import { BiObjectsHorizontalLeft } from "react-icons/bi";
import Graph from "./Graph";

const payments = [
  {
    id: 1,
    company: "Stellar",
    person: "Akshitay Dogra",
    milestone: "UI Screens",
    amount: "₹ 30,000",
    status: "Escrowed",
    dueDate: "Due 10 Feb",
    released: "—",
    overdueDays: null,
  },
  {
    id: 2,
    company: "NomadX",
    person: "Arjun Patel",
    milestone: "Backend API",
    amount: "₹ 45,000",
    status: "Escrowed",
    dueDate: "Due 12 Feb",
    released: "—",
    overdueDays: null,
  },
  {
    id: 3,
    company: "DQ Solutions",
    person: "Stellar",
    milestone: "Final Delivery",
    amount: "₹ 60,000",
    status: "Overdue",
    dueDate: "Due 07 Feb",
    released: "—",
    overdueDays: 3,
  },
  {
    id: 4,
    company: "Stellar",
    person: "PQ Solutions",
    milestone: "Wireframes",
    amount: "₹ 35,000",
    status: "Released",
    dueDate: "Released 02 Feb",
    released: "—",
    overdueDays: null,
  },
  {
    id: 5,
    company: "PQ Solutions",
    person: "Stellar",
    milestone: "UI Files",
    amount: "₹ 25,000",
    status: "Released",
    dueDate: "Released 01 Feb",
    released: "—",
    overdueDays: null,
  },
  {
    id: 6,
    company: "NomadX",
    person: "Arjun Patel",
    milestone: "UI Design",
    amount: "₹ 30,000",
    status: "Released",
    dueDate: "Released 01 Feb",
    released: "—",
    overdueDays: null,
  },
  {
    id: 7,
    company: "Stellar",
    person: "PQ Solutions",
    milestone: "Wireframes",
    amount: "₹ 35,000",
    status: "Released",
    dueDate: "Released 02 Feb",
    released: "—",
    overdueDays: null,
  },
  {
    id: 8,
    company: "PQ Solutions",
    person: "Stellar",
    milestone: "UI Files",
    amount: "₹ 25,000",
    status: "Released",
    dueDate: "Released 01 Feb",
    released: "—",
    overdueDays: null,
  },
];

const statusStyles = {
  Escrowed: "bg-blue-100 text-blue-600",
  Released: "bg-emerald-100 text-emerald-600",
  Overdue: "bg-red-100 text-red-500",
  Pending: "bg-yellow-100 text-yellow-600",
};

const avatarColors = {
  Stellar: "bg-orange-100 text-orange-500",
  NomadX: "bg-blue-100 text-blue-600",
  "DQ Solutions": "bg-indigo-100 text-indigo-500",
  "PQ Solutions": "bg-sky-100 text-sky-600",
};

const CompanyAvatar = ({ company }) => {
  const initials = company
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${avatarColors[company] || "bg-gray-100 text-gray-500"}`}
    >
      {initials}
    </div>
  );
};

const StatusBadge = ({ status, overdueDays }) => (
  <div className="flex flex-col items-start gap-0.5">
    <span className={`px-3 py-0.5 text-xs rounded-full font-medium ${statusStyles[status] || "bg-gray-100 text-gray-500"}`}>
      {status === "Overdue" && <span className="mr-1">⚠</span>}
      {status}
    </span>
    {overdueDays && (
      <span className="text-xs text-red-400 pl-1">{overdueDays} days</span>
    )}
  </div>
);

const PaymentRow = ({ item }) => (
  <div className="flex items-center justify-between px-6 py-3 border-b text-sm hover:bg-gray-50 transition-colors">
    <div className="flex items-center gap-2 w-[22%]">
      <CompanyAvatar company={item.company} />
      <div>
        <div className="font-semibold text-gray-800 text-sm">{item.company}</div>
        <div className="text-gray-400 text-xs">{item.person}</div>
      </div>
    </div>
    <div className="text-gray-600 w-[18%]">{item.milestone}</div>
    <div className="font-semibold text-gray-800 w-[15%]">{item.amount}</div>
    <div className="w-[17%]">
      <StatusBadge status={item.status} overdueDays={item.overdueDays} />
    </div>
    <div className="text-gray-500 text-xs w-[16%]">{item.dueDate}</div>
    <div className="text-gray-400 w-[8%]">{item.released}</div>
  </div>
);

const TableHeader = () => (
  <>
    <div className="flex items-center justify-between px-6 py-3 text-sm font-semibold text-gray-500 bg-white sticky top-0 z-10">
      <div className="w-[22%]">Deal</div>
      <div className="w-[18%]">Milestone</div>
      <div className="w-[15%]">Amount</div>
      <div className="w-[17%]">Status</div>
      <div className="w-[16%]">Due Date</div>
      <div className="w-[8%]">Released</div>
    </div>
    <hr />
  </>
);

const filterByStatus = (data, status) => {
  if (status === "all") return data;
  return data.filter((d) => d.status.toLowerCase() === status.toLowerCase());
};

const TABS = ["all", "escrowed", "released", "pending", "overdue"];

const Bottom = () => {
  return (
    // Key fix: items-start ensures both columns start from the top
    <div className="flex items-start gap-4 w-full px-6 py-4">

      {/* ── LEFT: Payment Records ── */}
      <div className="w-[70%] flex flex-col">
        <Tabs defaultValue="all">

          {/* Row 1: heading + tab triggers — same height as right panel's heading row */}
          <div className="flex items-center justify-between h-8 ">
            <h1 className="font-semibold text-[#5C5D78] text-base leading-none">
              Payment Records
            </h1>
            {/* TabsList is exactly h-8 to match right panel's button group height */}
            <TabsList className="h-8 bg-white border border-gray-200 p-0.5 rounded-lg gap-0">
              <TabsTrigger
                value="all"
                className="text-sm px-3 h-7 data-[state=active]:bg-[#F4ECFD] data-[state=active]:text-[#6B3FA0] data-[state=active]:shadow-none rounded-md flex items-center gap-1"
              >
                <AlignJustify size={12} />
                All
              </TabsTrigger>
              {["escrowed", "released", "pending", "overdue"].map((t) => (
                <TabsTrigger
                  key={t}
                  value={t}
                  className="text-sm px-3 h-7 capitalize data-[state=active]:bg-[#F4ECFD] data-[state=active]:text-[#6B3FA0] data-[state=active]:shadow-none rounded-md"
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Row 2: table card — mt-0 to sit flush */}
          <div className="bg-white shadow-sm rounded-xl overflow-hidden">
            {TABS.map((tab) => (
              <TabsContent
                key={tab}
                value={tab}
                // CRITICAL: override shadcn's default mt-2 with m-0
                className="m-0 p-0"
              >
                <TableHeader />
                <div className="h-[390px] overflow-y-auto scrollbar-hide">
                  {filterByStatus(payments, tab).length === 0 ? (
                    <div className="text-center py-10 text-gray-400 text-sm">
                      No {tab} payments found.
                    </div>
                  ) : (
                    filterByStatus(payments, tab).map((item) => (
                      <PaymentRow key={`${tab}-${item.id}`} item={item} />
                    ))
                  )}
                </div>
              </TabsContent>
            ))}
          </div>

        </Tabs>
      </div>

      {/* ── RIGHT: Financial Insights ── */}
      <div className="w-[30%] flex flex-col">

        {/* Row 1: heading + icon buttons — same h-8 + mb-2 as left panel */}
        <div className="flex items-center justify-between h-8 mb-2">
          <h1 className="font-semibold text-[#5C5D78] text-base leading-none">
            Financial Insights
          </h1>
          <ButtonGroup className="h-8">
            <Button
              variant="secondary"
              size="sm"
              className="h-full bg-[#EBE0FB] text-[#5D46B7] rounded-sm px-2"
            >
              <IoGrid />
            </Button>
            <ButtonGroupSeparator />
            <Button
              variant="secondary"
              size="sm"
              className="h-full bg-white rounded-sm px-2"
            >
              <BiObjectsHorizontalLeft />
            </Button>
          </ButtonGroup>
        </div>

        {/* Row 2: insight cards — sits flush with table card on left */}
        <div className="flex flex-col gap-2">

          {/* Upcoming + Escrow card */}
          <div className="bg-white rounded-2xl">
            <div className="px-5 py-3">
              <h3 className="text-gray-700 font-semibold mb-3 text-sm">
                Upcoming Payment Deadlines
              </h3>
              <div className="space-y-2 text-sm">
                {[
                  { label: "UI Screens", days: "10 days", color: "bg-blue-100 text-blue-600" },
                  { label: "Backend API", days: "12 days", color: "bg-indigo-100 text-indigo-600" },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className={`w-5 h-5 rounded flex items-center justify-center text-xs font-bold ${item.color}`}>
                        {i + 1}
                      </div>
                      <span className="text-gray-700">{item.label}</span>
                    </div>
                    <span className="text-gray-500 text-xs">{item.days}</span>
                  </div>
                ))}
              </div>
            </div>

            <hr className="mx-5 my-1" />

            <div className="px-5 pb-4 pt-2">
              <h3 className="text-gray-700 font-semibold mb-2 text-sm">
                Escrow Summary
              </h3>
              <div className="bg-[#FDF5EE] rounded-xl p-3 flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-1">
                    <IndianRupee size={15} className="text-gray-600" />
                    <span className="text-base font-semibold text-gray-800">
                      30,000
                    </span>
                    <span className="text-xs text-gray-400 ml-1">Ceccal</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Escrow ↓ 2 days</p>
                </div>
                <span className="text-xs bg-yellow-100 text-[#877A68] px-3 py-1 rounded-full font-medium whitespace-nowrap">
                  In 2 Days{" "}
                  <span className="text-[#EDB778] font-bold">10</span>
                </span>
              </div>
            </div>
          </div>

          {/* Monthly Flow card */}
          <div className="bg-white rounded-2xl px-5 pt-3 pb-4">
            <h3 className="text-gray-700 font-semibold text-sm mb-1">
              Monthly Flow
            </h3>
            <Graph />
          </div>

        </div>
      </div>

    </div>
  );
};

export default Bottom;