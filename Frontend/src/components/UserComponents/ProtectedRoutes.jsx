import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}") || {};
  const paymentStatus =
    localStorage.getItem("paymentStatus") || storedUser.paymentStatus || "not_paid";

  if (!token || token === "undefined") {
    return <Navigate to="/login" replace />;
  }

  if (paymentStatus !== "approved") {
    return <Navigate to="/paymentsuccess" replace />;
  }

  return children;
};

export default ProtectedRoute;
