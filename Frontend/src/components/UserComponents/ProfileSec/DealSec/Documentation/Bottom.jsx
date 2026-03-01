import React, { useState } from "react";
import { Check, Shield, ToggleLeft, ToggleRight } from "lucide-react";
import { AiOutlineBars } from "react-icons/ai";
import { IoGrid } from "react-icons/io5";
import { BiColumns } from "react-icons/bi";
import { RiLayoutColumnLine } from "react-icons/ri";

// ── Left panel data ──────────────────────────────────────────────────────────
const proposalData = {
  company: "Stellar",
  person: "x Akshay Dogra",
  project: "Mobile App Development",
  status: "Awaiting Confirmation",
  avatarBg: "bg-orange-400",
  initial: "S",
  scope: ["20 app screens", "API Integration", "3 revisions"],
  timeline: "60 Days",
  budget: "₹ 1,20,000",
  payments: [
    { label: "30% Upfront", value: "₹:36,000" },
    { label: "40% Milestone 1", value: "" },
    { label: "30% Final", value: "" },
  ],
  escrow: true,
};

// ── Middle panel sections ────────────────────────────────────────────────────
const contractSections = [
  {
    title: "Scope of Work",
    body: "This agreement contracts payment to the company and agrees to land-casted picasases and documentation milestoned clientis. This amplies sact in eportiation identity with that each and agreement nhal, base susgerfiss, exemps lapot on a tor-mebsia ovrtained connalation.",
  },
  {
    title: "Confidentiality",
    body: "The Agreement tois agees, and data, agaiin i5a9, forminalad exatively is, imlassed if interation plocacuons artat dagpacper for following, domenaiation.",
  },
  {
    title: "IP Ownership",
    body: "This agreement ccncats agreemential ionolotion is stautar afollats, Jidout the acncome consmensiall otmts, ordonome contance, adccots doomentalvis axquct, usso now connlitions.-d.",
  },
  {
    title: "Termination Clause",
    body: "This agreement is contacs, paymentall, utores-ccampusited-nie a vatuat hasus flteteduse resulans, fa subpet tor dpiiasigrane mavioneat refhnenting milestone, aspians achimaties, at , cownt snper srenefinsal.",
  },
  {
    title: "Payment Terms",
    body: "This agreenment contracts scarnbastnrews, ban-guoseg us allSies despist offledus so lbsis. Itracs Inrenpofiattilms paraemend:tibore:sions.",
  },
];

// ── OTP Input component ──────────────────────────────────────────────────────
const OtpInput = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (val, idx) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[idx] = val;
    setOtp(next);
    if (val && idx < 5) {
      document.getElementById(`otp-${idx + 1}`)?.focus();
    }
  };

  return (
    <div className="flex items-center gap-2 justify-between">
      {otp.map((digit, i) => (
        <input
          key={i}
          id={`otp-${i}`}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e.target.value, i)}
          className="w-10 h-8 rounded-lg border border-gray-200 text-center text-sm font-semibold text-gray-800 bg-gray-50 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-200 transition-all"
        />
      ))}
    </div>
  );
};

// ── Main component ───────────────────────────────────────────────────────────
const Bottom = () => {
  const [escrow, setEscrow] = useState(true);
  const [agreed, setAgreed] = useState(false);
  const [agreedBottom, setAgreedBottom] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  return (
    <div className="flex items-start gap-4 w-full px-6 py-2">

      {/* ══ LEFT: Proposal Summary ══════════════════════════════════════════ */}
      <div className="w-[22%] flex flex-col">
        {/* Heading */}
        <h1 className="font-semibold text-[#5C5D78] text-base mb-3">
          Proposal Summary
        </h1>

        <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col gap-2">
          {/* Company header */}
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full ${proposalData.avatarBg} flex items-center justify-center text-white font-bold text-base shrink-0`}>
              {proposalData.initial}
            </div>
            <div>
              <p className="font-bold text-gray-800 text-sm leading-tight">{proposalData.company}</p>
              <p className="text-gray-500 text-xs">{proposalData.person}</p>
              <p className="text-gray-400 text-[10px]">{proposalData.project}</p>
            </div>
          </div>

          {/* Status badge */}
          <div>
            <span className="bg-orange-100 text-orange-500 text-[10px] px-3 py-1 rounded-full font-medium">
              Awaiting Confirmation
            </span>
          </div>

          <hr />

          {/* Final Agreed Terms */}
          <div>
            <h3 className="font-semibold text-gray-800 text-sm mb-1">Final Agreed Terms</h3>
            <p className="text-xs text-gray-600 mb-1 font-medium">Scope:</p>
            <ul className="text-xs text-gray-600 space-y-0.5 ml-3 list-disc mb-3">
              {proposalData.scope.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
            <p className="text-xs text-gray-600 mb-1">
              <span className="font-medium">Timeline:</span> {proposalData.timeline}
            </p>
            <p className="text-xs text-gray-600 font-medium">Total Budget:</p>
            <p className="text-base font-bold text-gray-800">{proposalData.budget}</p>
          </div>

          <hr />

          {/* Payment Structure */}
          <div>
            <h3 className="font-semibold text-gray-800 text-sm mb-1">Payment Structure</h3>
            <ul className="text-xs text-gray-600 space-y-1 list-disc ml-3">
              {proposalData.payments.map((p, i) => (
                <li key={i}>
                  {p.label}
                  {p.value && <span className="text-gray-400"> {p.value}</span>}
                </li>
              ))}
            </ul>
          </div>

          <hr />

          {/* Escrow toggle */}
          <div>
            <p className="text-xs text-gray-500 font-medium mb-2">Escrow</p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setEscrow(!escrow)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${escrow ? "bg-teal-400" : "bg-gray-200"}`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${escrow ? "translate-x-6" : "translate-x-1"}`}
                />
              </button>
              <span className="text-xs font-semibold text-gray-700">
                {escrow ? "Enabled" : "Disabled"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ══ MIDDLE: Documentation Viewer ════════════════════════════════════ */}
      <div className="w-[48%] flex flex-col">
        {/* Heading + icons */}
        <div className="flex items-center justify-between mb-3">
          <h1 className="font-semibold text-[#5C5D78] text-base">Documentation Viewer</h1>
          <div className="flex items-center gap-1.5 text-gray-400">
            <button className="p-1.5 bg-white border border-gray-200 rounded-md hover:bg-gray-50">
              <IoGrid size={13} />
            </button>
            <button className="p-1.5 bg-white border border-gray-200 rounded-md hover:bg-gray-50">
              <BiColumns size={13} />
            </button>
            <button className="p-1.5 bg-white border border-gray-200 rounded-md hover:bg-gray-50">
              <AiOutlineBars size={13} />
            </button>
            <button className="p-1.5 bg-white border border-gray-200 rounded-md hover:bg-gray-50">
              <RiLayoutColumnLine size={13} />
            </button>
          </div>
        </div>

        {/* Contract document card */}
        <div className="bg-white rounded-2xl shadow-sm px-6 py-5">
          {/* Document header */}
          <div className="flex items-start justify-between mb-5">
            <h2 className="font-bold text-gray-800 text-xl">Agreement Contract</h2>
            <span className="text-xs text-gray-400 mt-1">Version 1.2</span>
          </div>

          {/* Scrollable sections */}
          <div className="overflow-y-auto scrollbar-hide" style={{ maxHeight: "42vh" }}>
            <div className="space-y-4">
              {contractSections.map((section, i) => (
                <div key={i}>
                  <h4 className="font-semibold text-gray-800 text-sm mb-1">{section.title}</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">{section.body}</p>
                </div>
              ))}
            </div>

            {/* Inner checkbox */}
            <div className="flex items-center gap-2 mt-5 pt-4 border-t border-gray-100">
              <input
                type="checkbox"
                id="agree-inner"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 accent-purple-500 cursor-pointer"
              />
              <label htmlFor="agree-inner" className="text-xs text-gray-600 cursor-pointer">
                I have read and agree to the terms.
              </label>
            </div>
          </div>
        </div>

        {/* Bottom checkbox (outside card, below) */}
        <div className="bg-white rounded-2xl shadow-sm px-6 py-3 mt-1 flex items-center gap-2">
          <input
            type="checkbox"
            id="agree-bottom"
            checked={agreedBottom}
            onChange={(e) => setAgreedBottom(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 accent-purple-500 cursor-pointer"
          />
          <label htmlFor="agree-bottom" className="text-sm text-gray-700 font-medium cursor-pointer">
            I have read and agree to the terms.
          </label>
        </div>
      </div>

      {/* ══ RIGHT: Confirmation ══════════════════════════════════════════════ */}
      <div className="w-[30%] flex flex-col">
        <h1 className="font-semibold text-[#5C5D78] text-base mb-3">Confirmation</h1>

        <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col gap-4">

          {/* Secure Agreement header */}
          <div className="flex items-center gap-3 p-3 bg-[#F0EDFD] rounded-xl">
            <div className="w-9 h-9 rounded-full bg-[#E4DCFA] flex items-center justify-center shrink-0">
              <Shield size={18} className="text-purple-500" />
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-sm leading-tight">Secure Agreement</p>
              <p className="text-[10px] text-gray-500">Encrypted Verification</p>
            </div>
          </div>

          <hr />

          {/* Step 1: Identity Verification */}
          <div>
            <h3 className="font-semibold text-gray-800 text-sm mb-1">
              Step 1– Identity Verification
            </h3>
            <p className="text-xs text-gray-500 mb-3">
              To confirm this agreement, please verify your identity.
            </p>

            {/* Phone input */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex-1 flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 gap-2">
                <span className="text-xs text-gray-700 font-medium whitespace-nowrap">+91 98765XXXX</span>
              </div>
              <button className="bg-gray-100 text-gray-500 text-xs px-3 py-2 rounded-lg font-medium border border-gray-200 hover:bg-gray-200 transition-colors">
                SEED
              </button>
            </div>

            {/* Send OTP button */}
            <button
              onClick={() => setOtpSent(true)}
              className="w-full bg-linear-to-b from-[#A8A0E8] to-[#7B72D0] text-white text-sm font-semibold py-1 rounded-xl hover:opacity-90 transition-opacity"
            >
              Send OTP
            </button>
          </div>

          <hr />

          {/* Step 2: Enter OTP */}
          <div>
            <h3 className="font-semibold text-gray-800 text-sm mb-1">
              Step 2: Enter 6-Digit OTP
            </h3>

            <div className="mb-2 mt-1">
              <OtpInput />
            </div>

            <p className="text-[10px] text-gray-400 mb-1">
              Enter the 6-digit code sent to +91 98765XXX
            </p>
            <p className="text-[10px] text-gray-400 mb-4">Resend in 00:30</p>

            {/* Confirm & Activate button */}
            <button className="w-full flex items-center justify-center gap-2 bg-linear-to-b from-[#5BB9AE] to-[#379C8C] text-white text-sm font-semibold py-1 rounded-xl mb-1 hover:opacity-90 transition-opacity">
              <Check size={14} />
              Confirm & Activate Deal
            </button>

            {/* Cancel button */}
            <button className="w-full border border-gray-200 text-gray-600 text-sm font-semibold py-1 rounded-xl hover:bg-gray-50 transition-colors">
              Cancel
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Bottom;