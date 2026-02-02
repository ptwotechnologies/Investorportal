// Domains for INVESTORS
export const INVESTOR_DOMAINS = [
  "Technology",
  "Legal & Compliance",
  "Marketing",
  "Designing",
  "Development",
  "Other",
  // Add more investor domains
];

// Domains for STARTUPS
export const STARTUP_DOMAINS = [
  "Technology",
  "Legal & Compliance",
  "Marketing",
  "Designing",
  "Development",
  "Other",
  // Add more startup domains
];

// Domains for SERVICE PROFESSIONALS
export const SERVICE_PROFESSIONAL_DOMAINS = [
  "Technology",
  "Legal & Compliance",
  "Marketing",
  "Designing",
  "Development",
  "Other",
  // Add more service domains
];

// Helper function
export const getDomainsForRole = (role) => {
  switch (role) {
    case "investor":
      return INVESTOR_DOMAINS;
    case "startup":
      return STARTUP_DOMAINS;
    case "service_professional":
      return SERVICE_PROFESSIONAL_DOMAINS;
    default:
      return [];
  }
};