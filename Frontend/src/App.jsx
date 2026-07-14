import { useEffect, useState } from 'react'
import './App.css'
import AdminRoutes from './Routes/AdminRoutes'
import UserRoutes from './Routes/UserRoutes'
import { Toaster } from 'react-hot-toast'
import ScrollToTop from './ScrollToTop'
import axios from "axios";

 export const serverUrl = "https://investorportal-sigma.vercel.app"
//  export const serverUrl = "http://localhost:3000" 

function App() {
  const [count, setCount] = useState(0) 
  useEffect(() => {
  const interceptor = axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );

  return () => {
    axios.interceptors.response.eject(interceptor);
  };
}, []);

  useEffect(() => {
    // Enforce default spMode based on role
    let role = localStorage.getItem("role")?.toLowerCase();
    if (!role) {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          const userData = JSON.parse(userStr);
          role = userData?.role?.toLowerCase();
        } catch (e) {}
      }
    }
    
    const currentMode = localStorage.getItem("spMode");
    
    if (role === "startup") {
      // Startups should default to buyer if it's not set
      if (!currentMode || currentMode === "undefined") {
        localStorage.setItem("spMode", "buyer");
        window.dispatchEvent(new Event("spModeChanged"));
      } 
      // If it was mistakenly defaulted to provider by an old session, fix it once
      else if (currentMode === "provider" && !localStorage.getItem("startupModeFixed")) {
        localStorage.setItem("spMode", "buyer");
        localStorage.setItem("startupModeFixed", "true");
        window.dispatchEvent(new Event("spModeChanged"));
      }
    } else if (role?.includes("professional") && (!currentMode || currentMode === "undefined")) {
      localStorage.setItem("spMode", "provider");
      window.dispatchEvent(new Event("spModeChanged"));
    }
  }, []);

  

  return (
    <div>
      <ScrollToTop/>
      <AdminRoutes/>
      <UserRoutes/>
      <Toaster 
        toastOptions={{
          duration: 3000, 
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />
    </div>
  );
}

export default App
