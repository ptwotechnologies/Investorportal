import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from '../Pages/UserPages/Navbar'
import Home from '../Pages/UserPages/Home'
import About from '../Pages/UserPages/About'
import ServiceProfessional from '../Pages/UserPages/ServiceProfessional'
import Startup from '../Pages/UserPages/Startup'
import Investor from '@/Pages/UserPages/Investor'
import Subscriptions from '@/Pages/UserPages/Subscriptions'
import JoinUs from '@/Pages/UserPages/JoinUs'
import ContactUs from '@/Pages/UserPages/ContactUs'
import Login from '@/Pages/UserPages/LoginPages/Login'
import SelectPortal from '@/Pages/UserPages/LoginPages/SelectPortal'
import RegisterPortal from '@/Pages/UserPages/LoginPages/RegisterPortal'
import PortalDetails from '@/Pages/UserPages/LoginPages/PortalDetails'
import OnboardingPlans from '@/Pages/UserPages/LoginPages/OnboardingPlans'
import Scanner from '@/Pages/UserPages/LoginPages/Scanner'
import PaymentSuccess from '@/Pages/UserPages/LoginPages/PaymentSuccess'
import PasswordReset from '@/Pages/UserPages/LoginPages/PasswordReset'
import PasswordResetOtpSec from '@/components/UserComponents/LoginSec/PasswordResetOtpSec'
import NewPassword from '@/Pages/UserPages/LoginPages/NewPassword'
import PasswordSuccess from '@/Pages/UserPages/LoginPages/PasswordSuccess'
import Profile from '@/Pages/UserPages/ProfilePages/Profile'
import Help from '@/Pages/UserPages/ProfilePages/Help'
import RequestReceived from '@/Pages/UserPages/ProfilePages/RequestReceived'
import Settings from '@/Pages/UserPages/ProfilePages/Settings'
import Notification from '@/Pages/UserPages/ProfilePages/Notification'
import Connect from '@/Pages/UserPages/ProfilePages/Connect'
import TransactionId from '@/Pages/UserPages/LoginPages/TransactionId'
import Pricing from '@/Pages/UserPages/Pricing'
import ChannelPartners from '@/Pages/UserPages/ChannelPartners'
import ProtectedRoute from "../components/UserComponents/ProtectedRoutes";
import Dashboard from '@/Pages/UserPages/ProfilePages/Dashboard'
import Chat from '@/Pages/UserPages/ProfilePages/Chat'
import Deal from '@/Pages/UserPages/ProfilePages/Deal'



const UserRoutes = () => {

  const adminPrefixes = [
  '/login',
  '/selectPortal',
  '/registerportal',
  '/portaldetails',
  '/onboardingplans',
  '/scanner',
  '/paymentsuccess',
  '/transactionId',
  '/passwordreset',
  '/passwordresetotp',
  '/newpassword',
  '/passwordsuccess',
  '/profile',
  '/help',
  '/request',
  '/settings',
  '/notification',
  '/connect',
  '/adminpanel',
  '/verification',
  '/userprofile',
  '/registration',
  '/payments',
  '/dashboard',
  '/chat',
  '/deal',
   ]

   
    const location = useLocation();
  const hideNavbar = adminPrefixes.some(prefix => location.pathname.startsWith(prefix))
  
  return (
    <div>
    {!hideNavbar && <Navbar />}
    
        <Routes> 
         <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/serviceprofessional" element={<ServiceProfessional />} />
          <Route path="/startup" element={<Startup />} />
          <Route path="/investor" element={<Investor />} />
          <Route path="/pricing" element={<Pricing/>} />
          <Route path="/channelpartners" element={<ChannelPartners/>} />
          <Route path="/subscription" element={<Subscriptions/>} />
          <Route path="/joinus" element={<JoinUs/>} />
           <Route path="/contactus" element={<ContactUs/>} />
           <Route path="/login" element={<Login/>} />
           <Route path="/selectPortal" element={<SelectPortal/>} />
           <Route path="/registerportal" element={<RegisterPortal/>} />
            <Route path="/portaldetails" element={<PortalDetails/>} />
            <Route path="/onboardingplans" element={<OnboardingPlans/>} />
            <Route path="/scanner" element={<Scanner/>} />
            <Route path="/transactionId" element={<TransactionId/>} />
            <Route path="/paymentsuccess" element={<PaymentSuccess/>} />
            <Route path="/passwordreset" element={<PasswordReset/>} />
            <Route path="/passwordresetotp" element={<PasswordResetOtpSec/>} />
            <Route path="/newpassword" element={<NewPassword/>} />
            <Route path="/passwordsuccess" element={<PasswordSuccess/>} />
            <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} /> 
            <Route path="/help" element={<ProtectedRoute><Help/></ProtectedRoute>} />
            <Route path="/request" element={<ProtectedRoute><RequestReceived/></ProtectedRoute>} />
             <Route path="/settings" element={ <ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/connect" element={<ProtectedRoute><Connect/></ProtectedRoute>} />
             <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
             <Route path="/chat" element={<ProtectedRoute><Chat/></ProtectedRoute>} />
             <Route path="/deal" element={<ProtectedRoute><Deal/></ProtectedRoute>} />
             
      </Routes>

    </div>
  )
}


export default UserRoutes