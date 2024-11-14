import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import { Admin, Analytics, Dashboard, Home, Landing } from './pages'
import { useState } from "react"
import ProtectedRoute from "./components/ProtectedRoute"

const App = () => {

  const [user, setUser] = useState(null);

  const login = () => {
    //request done
    setUser({
      id: 1,
      name: "John",
      permissions: ['analize'],
      roles: ['']
    })
  }

  const logout = () => setUser(null);

  return (
    <BrowserRouter>

      <Navigation/>

      {
        user ? (
          <button onClick={logout}>Logout</button>
        ): (
          <button onClick={login}>Login</button>
        )
      }

      <Routes>
        <Route index element={<Landing/>}></Route>
        <Route path="/landing" element={<Landing/>}></Route>
        <Route element={<ProtectedRoute isAllowed={!!user}/>}>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/dashboard' element={<Dashboard/>}></Route>
        </Route>
        <Route path='/analytics' element={
          <ProtectedRoute 
            isAllowed={!!user && user.permissions.includes('analize')}
            redirectTo="/home"
          >
            <Analytics/>
          </ProtectedRoute>
        }></Route>
        <Route path='/admin' element={
          <ProtectedRoute 
            isAllowed={!!user && user.roles.includes('admin')}
            redirectTo="/home"
          >
            <Admin/>
          </ProtectedRoute>
        }></Route>
      </Routes>
    </BrowserRouter>
  )
}

// Esto lo puedo poner en otro componente 
// pero al cliente lo que pida
const Navigation = () => {
  return(
    <nav>
      <ul>
        <li>
          <Link to="/landing">Landing</Link>
        </li>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/analytics">Analytics</Link>
        </li>
        <li>
          <Link to="/admin">Admin</Link>
        </li>
      </ul>
    </nav>
  )
}

export default App
