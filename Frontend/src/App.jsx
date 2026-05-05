import { useEffect, useState } from 'react'
import './App.css'
import AdminRoutes from './Routes/AdminRoutes'
import UserRoutes from './Routes/UserRoutes'
import { Toaster } from 'react-hot-toast'
import ScrollToTop from './ScrollToTop'
import axios from "axios";

//  export const serverUrl = "https://investorportal-sigma.vercel.app"
 export const serverUrl = "http://localhost:3000"

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
