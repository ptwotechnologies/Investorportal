import React from "react";
import { IoClose } from "react-icons/io5";
import { FaCrown, FaCheckCircle, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ComingSoonModal = ({ onClose, title, userRole: propUserRole }) => {
  const navigate = useNavigate();
  const userCache = JSON.parse(localStorage.getItem("userCache") || "{}");
  const userRole = propUserRole || localStorage.getItem("role") || userCache?.role || localStorage.getItem("userRole") || "";
  const isInvestor = userRole.toLowerCase().includes("investor");

  const handleUpgrade = () => {
    const content = getContent();

    if (content.primaryAction) {
      navigate(content.primaryAction);
      onClose();
      return;
    }

    if (title === "Switch to Startup" || title === "Switch to Professional" || title === "Role Switching") {
      navigate("/pricing", { 
        state: { 
          isUpgradeFlow: true, 
          role: "startup",
          upgradeType: "switch" 
        } 
      });
      onClose();
      return;
    }

    // Default to pricing page instead of scanner page
    let upgradeType = "growth";
    if (title === "Premium Infrastructure") {
      upgradeType = "premium";
    }
    
    const roleLower = String(userRole).toLowerCase();
    const isService = roleLower.includes("service") || roleLower.includes("professional");
    const roleForPricing = isService ? "serviceprofessional" : "startup";

    navigate("/pricing", { 
      state: { 
        isUpgradeFlow: true, 
        role: roleForPricing,
        upgradeType: upgradeType 
      } 
    });
    
    onClose();
  };

  // Content mapping for different modules
  const getContent = () => {
    // Investor specific workflow mapping
    if (
      title === "Discover" || 
      title === "Deal pipeline" || 
      title === "My investment" || 
      title === "Portfolio strategy" || 
      title === "Investor Workflow" ||
      title === "Investor Documents" || 
      title === "Investor Meetings" || 
      title === "Investor Alerts & risk" ||
      (isInvestor && (title === "Documents" || title === "Meetings" || title === "Workspace"))
    ) {
      return {
        header: "Investment Workspace",
        desc: "This workspace will be activated once you establish a connection with a startup and begin the deal creation process.",
        highlight: "Your centralized hub for tracking, managing, and executing startup investments.",
        features: [
          "Interactive Deal Pipeline",
          "Portfolio Performance Tracking",
          "Startup Interaction History",
          "Investment Documentation Hub",
          "Real-time Analytics & Reporting",
          "Secure Collaboration Tools"
        ],
        primaryCTA: "Connect with Startups",
        primaryAction: "/connect",
        secondaryCTA: "Explore Dashboard"
      };
    }
    if (title === "Fundraising") {
      return {
        header: "Unlock Fundraising Infrastructure",
        desc: "Access investor pipeline management, fundraising tracking, warm introductions, commitment stages, analytics, and startup fundraising workflows designed for serious founders preparing to raise capital.",
        features: [
          "Investor pipeline tracking",
          "Fundraising stage management",
          "Investor CRM & notes",
          "Meeting scheduler",
          "Data room sharing",
          "Fundraising analytics"
        ],
        primaryCTA: "Unlock Fundraising",
        secondaryCTA: "Maybe Later"
      };
    }

    if (title === "Investors") {
      return {
        header: "Unlock Investor Relationship Hub",
        desc: "Manage investor communications, engagement history, follow-ups, commitments, and relationship insights from a centralized investor management system.",
        features: [
          "Investor relationship management",
          "Interaction history",
          "Follow-up reminders",
          "Investor engagement insights",
          "Meeting tracking",
          "Commitment monitoring"
        ],
        primaryCTA: "Access Investor Hub",
        secondaryCTA: "Maybe Later"
      };
    }

    if (title === "Operations" || title === "Operate" || title === "Metrics" || title === "Cap Table" || title === "Documents") {
      return {
        header: "Unlock Startup Operations System",
        desc: "Run your startup operations, workflows, execution tracking, internal collaboration, and operational management from one centralized workspace.",
        features: [
          "Project & workflow management",
          "Team collaboration tools",
          "Execution tracking",
          "Startup operating workspace",
          "Goals & milestones",
          "Operational analytics"
        ],
        primaryCTA: "Unlock Operations",
        secondaryCTA: "Maybe Later"
      };
    }

    if (title === "Premium Infrastructure") {
      return {
        header: "Scale Faster with Premium Infrastructure",
        desc: "Unlock Copteno’s advanced startup infrastructure including fundraising systems, investor management, startup operations, analytics, and execution tools built for growth-focused startups.",
        highlight: "Trusted infrastructure for startups preparing to scale, raise capital, and operate efficiently.",
        features: [
          "Fundraising Systems",
          "Investor Management",
          "Startup Operations",
          "Analytics & Execution Tools"
        ],
        primaryCTA: "Upgrade to Scale Plan",
        secondaryCTA: "Maybe Later"
      };
    }

    if (title === "Switch to Professional" || title === "Role Switching") {
      return {
        header: "Switch to Professional Workspace",
        desc: "Access professional tools, service workflows, client management systems, collaboration features, and business opportunities designed for consultants, agencies, advisors, and service providers.",
        features: [
          "Professional service dashboard",
          "Client & deal management",
          "Service opportunity access",
          "Collaboration tools",
          "Professional networking",
          "Business workflow systems"
        ],
        primaryCTA: "Switch Workspace",
        secondaryCTA: "Maybe Later"
      };
    }

    if (title === "Switch to Startup") {
      return {
        header: "Switch to Startup Workspace",
        desc: "Access startup-focused infrastructure including fundraising systems, investor management, execution tools, startup networking, and growth-focused workflows.",
        features: [
          "Startup dashboard",
          "Fundraising infrastructure",
          "Investor relationship hub",
          "Startup operations workspace",
          "Founder networking",
          "Growth & execution tools"
        ],
        primaryCTA: "Switch Workspace",
        secondaryCTA: "Maybe Later" 
      };
    }
    
    // Default fallback
    return {
      header: `Unlock ${title} Features`,
      desc: `Access advanced ${title} infrastructure designed for serious founders and investors.`,
      features: [
        `${title} Pipeline tracking`,
        `${title} Stage management`,
        "Analytics & reporting",
        "Execution workflows"
      ],
      primaryCTA: "Upgrade to Premium",
      secondaryCTA: "Maybe Later"
    };
  };

  const content = getContent();

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      {/* Premium Backdrop Overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Main Modal Container */}
      <div className="relative w-full max-w-[320px] animate-in zoom-in-95 fade-in duration-300">
        
        {/* The Solid White Modal Box */}
        <div className="bg-white rounded-xl shadow-2xl w-full overflow-hidden relative border border-[#E9E7FD] p-6 pt-10">
          
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-5 text-gray-300 hover:text-[#59549F] transition-all z-20"
          >
            <IoClose size={20} />
          </button>

          <div className="flex flex-col items-center">
            {/* Premium Icon Header - Reduced Size */}
            <div className="w-14 h-14 mb-4 bg-gradient-to-br from-[#F8F7FF] to-[#E9E7FD] rounded-2xl flex items-center justify-center shadow-inner">
              <FaCrown size={24} className="text-[#59549F] drop-shadow-sm" />
            </div>

            {/* Header Content */}
            <div className="text-center w-full mb-5">
               <h1 className="text-[18px] font-semibold text-[#2D317A] mb-1 leading-tight tracking-tight">
                 {content.header}
               </h1>
               <div className="h-0.5 w-8 bg-[#59549F] rounded-full mx-auto mb-4 opacity-20"></div>
               <p className="text-[#5A5E9F] text-[11px] mb-4 leading-snug">
                 {content.desc}
               </p>

               {content.highlight && (
                 <div className="bg-[#F8F7FF] border border-[#E9E7FD] py-2 px-3 rounded-lg mb-4 text-center">
                    <p className="text-[#59549F] text-[10px] font-medium italic leading-tight">
                      "{content.highlight}"
                    </p>
                 </div>
               )}
               
               {/* Feature List - Reduced Spacing/Text */}
               <ul className="space-y-1.5 text-left max-w-[240px] mx-auto mb-6">
                 {content.features.map((feature, index) => (
                   <li key={index} className="flex items-start gap-2.5 text-[11px] text-gray-600 font-medium">
                     <FaCheckCircle className="text-[#59549F] shrink-0 opacity-80 mt-0.5" size={13} />
                     <span>{feature}</span>
                   </li>
                 ))}
               </ul>
            </div>

            {/* Buttons Section - Compact */}
            <div className="w-full flex flex-col items-center gap-2">
              <button 
                onClick={handleUpgrade}
                className="w-full py-1.5 bg-[#D8D6F8] text-[#59549F] rounded-lg font-semibold text-[14px] shadow-[inset_0_0_12px_0_rgba(0,0,0,0.25)] hover:bg-[#59549F] hover:text-white transform active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                {content.primaryCTA}
                <FaArrowRight size={12} />
              </button>
              
              <button 
                onClick={onClose}
                className="w-full py-2 text-gray-600 bg-gray-50 rounded-lg mt-1 text-[12px] hover:text-[#59549F] transition-colors border"
              >
                {content.secondaryCTA}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonModal;
