import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from '../Pages/UserPages/Navbar'
import Home from '../Pages/UserPages/Home'
import About from '../Pages/UserPages/About'
import ServiceProfessional from '../Pages/UserPages/ServiceProfessional'
import Startup from '../Pages/UserPages/Startup'
import Investor from '@/Pages/UserPages/Investor'
import ChannelPartners from '@/Pages/UserPages/ChannelPartners'
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
import RequestRaised from '@/Pages/UserPages/ProfilePages/RequestRaised'
import Settings from '@/Pages/UserPages/ProfilePages/Settings'
import Notification from '@/Pages/UserPages/ProfilePages/Notification'
import Connect from '@/Pages/UserPages/ProfilePages/Connect'
import TransactionId from '@/Pages/UserPages/LoginPages/TransactionId'
import Pricing from '@/Pages/UserPages/Pricing'


const UserRoutes = () => {

  const adminPrefixes = [
  '/login',
  '/selectportal',
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
  '/payments'
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
          <Route path="/joinus" element={<JoinUs/>} />
           <Route path="/contactus" element={<ContactUs/>} />
           <Route path="/login" element={<Login/>} />
           <Route path="/selectportal" element={<SelectPortal/>} />
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
            <Route path="/profile" element={<Profile/>} />
            <Route path="/help" element={<Help/>} />
            <Route path="/request" element={<RequestReceived/>} />
            <Route path="/requestraised" element={<RequestRaised/>} />
             <Route path="/settings" element={<Settings/>} />
              <Route path="/notification" element={<Notification/>} />
               <Route path="/connect" element={<Connect/>} />
      </Routes>
    </div>
  )
}


export default UserRoutes