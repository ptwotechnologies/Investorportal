import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}") || {};
  const paymentStatus =
    localStorage.getItem("paymentStatus") || storedUser.paymentStatus || "not_paid";
  const location = useLocation();

  if (!token || token === "undefined") {
    localStorage.setItem("redirectAfterLogin", location.pathname + location.search);
    return <Navigate to="/login" replace />;
  }

  if (paymentStatus !== "approved") {
    return <Navigate to="/paymentsuccess" replace />;
  }

  return children;
};

export default ProtectedRoute;
