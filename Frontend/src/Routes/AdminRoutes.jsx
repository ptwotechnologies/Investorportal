import React from 'react'
import AdminPanel from '@/Pages/AdminPages/AdminPanel'
import Payments from '@/Pages/AdminPages/Payments'
import UserProfile from '@/Pages/AdminPages/UserProfile'
import Users from '@/Pages/AdminPages/Registeration'
import Verification from '@/Pages/AdminPages/Verification'
import { Route, Routes } from 'react-router-dom'

const AdminRoutes = () => {
  return (
   <div>
    <Routes>
      <Route path="/adminpanel" element={<AdminPanel />} />
      <Route path="/verification" element={<Verification />} />
       <Route path="/userprofile" element={<UserProfile />} />
       <Route path="/registration" element={<Users />} />
       <Route path="/payments" element={<Payments/>} />
    </Routes>
   </div>
  )
}

export default AdminRoutes