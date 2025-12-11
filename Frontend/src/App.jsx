import { useState } from 'react'
import './App.css'
import AdminRoutes from './Routes/AdminRoutes'
import UserRoutes from './Routes/UserRoutes'

export const serverUrl = "https://investorportal-sigma.vercel.app"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <AdminRoutes/>
      <UserRoutes/>
    </div>
  )
}

export default App
