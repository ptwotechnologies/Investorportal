import React, { useState } from "react";
import { IndianRupee, AlignJustify, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ButtonGroup, ButtonGroupSeparator } from "@/components/ui/button-group";
import { IoGrid } from "react-icons/io5";
import { BiObjectsHorizontalLeft } from "react-icons/bi";
import Graph from "./Graph";

const payments = [
  { id: 1, company: "Stellar", person: "Akshitay Dogra", milestone: "UI Screens", amount: "₹ 30,000", status: "Escrowed", dueDate: "Due 10 Feb", released: "—", overdueDays: null },
  { id: 2, company: "NomadX", person: "Arjun Patel", milestone: "Backend API", amount: "₹ 45,000", status: "Escrowed", dueDate: "Due 12 Feb", released: "—", overdueDays: null },
  { id: 3, company: "DQ Solutions", person: "Stellar", milestone: "Final Delivery", amount: "₹ 60,000", status: "Overdue", dueDate: "Due 07 Feb", released: "—", overdueDays: 3 },
  { id: 4, company: "Stellar", person: "PQ Solutions", milestone: "Wireframes", amount: "₹ 35,000", status: "Released", dueDate: "Released 02 Feb", released: "—", overdueDays: null },
  { id: 5, company: "PQ Solutions", person: "Stellar", milestone: "UI Files", amount: "₹ 25,000", status: "Released", dueDate: "Released 01 Feb", released: "—", overdueDays: null },
  { id: 6, company: "NomadX", person: "Arjun Patel", milestone: "UI Design", amount: "₹ 30,000", status: "Released", dueDate: "Released 01 Feb", released: "—", overdueDays: null },
  { id: 7, company: "Stellar", person: "PQ Solutions", milestone: "Wireframes", amount: "₹ 35,000", status: "Released", dueDate: "Released 02 Feb", released: "—", overdueDays: null },
  { id: 8, company: "PQ Solutions", person: "Stellar", milestone: "UI Files", amount: "₹ 25,000", status: "Released", dueDate: "Released 01 Feb", released: "—", overdueDays: null },
];

const statusStyles = {
  Escrowed: "bg-blue-100 text-blue-600",
  Released: "bg-emerald-100 text-emerald-600",
  Overdue: "bg-red-100 text-red-500",
  Pending: "bg-yellow-100 text-yellow-600",
};

const tabDotColors = {
  all: "bg-purple-400",
  escrowed: "bg-blue-400",
  released: "bg-emerald-400",
  pending: "bg-yellow-400",
  overdue: "bg-red-400",
};

const avatarColors = {
  Stellar: "bg-orange-100 text-orange-500",
  NomadX: "bg-blue-100 text-blue-600",
  "DQ Solutions": "bg-indigo-100 text-indigo-500",
  "PQ Solutions": "bg-sky-100 text-sky-600",
};

const TABS = ["all", "escrowed", "released", "pending", "overdue"];

const filterByStatus = (data, status) =>
  status === "all" ? data : data.filter((d) => d.status.toLowerCase() === status);

const CompanyAvatar = ({ company }) => {
  const initials = company.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${avatarColors[company] || "bg-gray-100 text-gray-500"}`}>
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
    {overdueDays && <span className="text-xs text-red-400 pl-1">{overdueDays} days</span>}
  </div>
);

// Desktop table
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
    <div className="w-[17%]"><StatusBadge status={item.status} overdueDays={item.overdueDays} /></div>
    <div className="text-gray-500 text-xs w-[16%]">{item.dueDate}</div>
    <div className="text-gray-400 w-[8%]">{item.released}</div>
  </div>
);

// Mobile compact card
const MobilePaymentCard = ({ item }) => (
  <div className="flex items-center justify-between px-4 py-3 border-b last:border-0 hover:bg-gray-50 transition-colors">
    <div className="flex items-center gap-3">
      <CompanyAvatar company={item.company} />
      <div>
        <p className="font-semibold text-gray-800 text-sm leading-tight">{item.company}</p>
        <p className="text-gray-400 text-xs">{item.person}</p>
        <p className="text-gray-500 text-xs mt-0.5">{item.milestone}</p>
      </div>
    </div>
    <div className="flex flex-col items-end gap-1 shrink-0 ml-2">
      <p className="font-bold text-gray-800 text-sm">{item.amount}</p>
      <StatusBadge status={item.status} overdueDays={item.overdueDays} />
      <p className="text-gray-400 text-[10px]">{item.dueDate}</p>
    </div>
  </div>
);

// Mobile dropdown + cards
const MobilePaymentSection = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [open, setOpen] = useState(false);
  const filtered = filterByStatus(payments, activeTab);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <h1 className="font-semibold text-[#5C5D78] text-base leading-none">Payment Records</h1>

        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-medium text-[#5C5D78] shadow-sm"
          >
            <span className={`w-2 h-2 rounded-full ${tabDotColors[activeTab]}`} />
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            <ChevronDown size={14} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
          </button>

          {open && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
              <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-20 min-w-[140px] overflow-hidden">
                {TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => { setActiveTab(tab); setOpen(false); }}
                    className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-left transition-colors ${
                      activeTab === tab ? "bg-[#F4ECFD] text-[#6B3FA0] font-semibold" : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full shrink-0 ${tabDotColors[tab]}`} />
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="h-[60vh] overflow-y-auto scrollbar-hide">
          {filtered.length === 0 ? (
            <div className="text-center py-10 text-gray-400 text-sm">No {activeTab} payments found.</div>
          ) : (
            filtered.map((item) => <MobilePaymentCard key={`mob-${item.id}`} item={item} />)
          )}
        </div>
      </div>
    </div>
  );
};

const Bottom = () => {
  return (
    <div className="flex flex-col lg:flex-row items-start gap-4 w-full px-3 lg:px-6 py-4">

      {/* LEFT */}
      <div className="lg:w-[70%] w-full flex flex-col">

        {/* Desktop tabs — hidden on mobile */}
        <div className="hidden lg:block">
          <Tabs defaultValue="all">
            <div className="flex items-center justify-between h-8 ">
              <h1 className="font-semibold text-[#5C5D78] text-base leading-none">Payment Records</h1>
              <TabsList className="h-8 bg-white border border-gray-200 p-0.5 rounded-lg gap-0">
                <TabsTrigger value="all" className="text-sm px-3 h-7 data-[state=active]:bg-[#F4ECFD] data-[state=active]:text-[#6B3FA0] data-[state=active]:shadow-none rounded-md flex items-center gap-1">
                  <AlignJustify size={12} /> All
                </TabsTrigger>
                {["escrowed", "released", "pending", "overdue"].map((t) => (
                  <TabsTrigger key={t} value={t} className="text-sm px-3 h-7 capitalize data-[state=active]:bg-[#F4ECFD] data-[state=active]:text-[#6B3FA0] data-[state=active]:shadow-none rounded-md">
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            <div className="bg-white shadow-sm rounded-xl overflow-hidden">
              {TABS.map((tab) => (
                <TabsContent key={tab} value={tab} className="m-0 p-0">
                  <TableHeader />
                  <div className="h-[390px] overflow-y-auto scrollbar-hide">
                    {filterByStatus(payments, tab).length === 0 ? (
                      <div className="text-center py-10 text-gray-400 text-sm">No {tab} payments found.</div>
                    ) : (
                      filterByStatus(payments, tab).map((item) => <PaymentRow key={`${tab}-${item.id}`} item={item} />)
                    )}
                  </div>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>

        {/* Mobile dropdown — hidden on desktop */}
        <div className="block lg:hidden">
          <MobilePaymentSection />
        </div>
      </div>

      {/* RIGHT: Financial Insights */}
      <div className="lg:w-[30%] w-full flex flex-col">
        <div className="flex items-center justify-between h-8 mb-2">
          <h1 className="font-semibold text-[#5C5D78] text-base leading-none">Financial Insights</h1>
          <ButtonGroup className="h-8">
            <Button variant="secondary" size="sm" className="h-full bg-[#EBE0FB] text-[#5D46B7] rounded-sm px-2"><IoGrid /></Button>
            <ButtonGroupSeparator />
            <Button variant="secondary" size="sm" className="h-full bg-white rounded-sm px-2"><BiObjectsHorizontalLeft /></Button>
          </ButtonGroup>
        </div>

        <div className="flex flex-col gap-2">
          <div className="bg-white rounded-2xl">
            <div className="px-5 lg:py-1.5 py-3">
              <h3 className="text-gray-700 font-semibold mb-4 lg:mb-2 text-sm">Upcoming Payment Deadlines</h3>
              <div className="space-y-2 text-sm">
                {[
                  { label: "UI Screens", days: "10 days", color: "bg-blue-100 text-blue-600" },
                  { label: "Backend API", days: "12 days", color: "bg-indigo-100 text-indigo-600" },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className={`w-5 h-5 rounded flex items-center justify-center text-xs font-bold ${item.color}`}>{i + 1}</div>
                      <span className="text-gray-700">{item.label}</span>
                    </div>
                    <span className="text-gray-500 text-xs">{item.days}</span>
                  </div>
                ))}
              </div>
            </div>
            <hr className="mx-5 lg:my-1 my-3" />
            <div className="px-5 pb-4 pt-2">
              <h3 className="text-gray-700 font-semibold mb-1 text-sm">Escrow Summary</h3>
              <div className="bg-[#FDF5EE] rounded-xl p-3 flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-1">
                    <IndianRupee size={15} className="text-gray-600" />
                    <span className="text-base font-semibold text-gray-800">30,000</span>
                    <span className="text-xs text-gray-400 ml-1">Ceccal</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 lg:mt-0">Escrow ↓ 2 days</p>
                </div>
                <span className="text-xs bg-yellow-100 text-[#877A68] px-3 py-1 rounded-full font-medium whitespace-nowrap">
                  In 2 Days <span className="text-[#EDB778] font-bold">10</span>
                </span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl px-5 pt-2 pb-3">
            <h3 className="text-gray-700 font-semibold text-sm lg:mb-1 mb-4">Monthly Flow</h3>
            <Graph />
          </div>
        </div>
      </div>

    </div>
  );
};

export default Bottom;