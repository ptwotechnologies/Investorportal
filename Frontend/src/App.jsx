import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AdminRoutes from './Routes/AdminRoutes'
import UserRoutes from './Routes/UserRoutes'

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
