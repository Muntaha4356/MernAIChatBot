import ChatBox from "./components/ChatBox"
import SideBar from "./components/SideBar"
import { Route, Routes, useLocation } from "react-router-dom"
import Credits from "./pages/Credits"
import Community from "./pages/Community"
import { useState } from "react"
import { assets } from "./assets/assets"
import './assets/prism.css'
import Loading from "./pages/Loading"
import { useAppContext } from "./context/Context"
import Login from "./pages/Login"


function App() {

  const [isMenuOpened, setIsMenuOpened] = useState(false);
  // used it for loading
  const {pathname} =useLocation();
  const {user} = useAppContext()

  if(pathname === '/loading') return <Loading/>
  return (
    <>
    {!isMenuOpened && <img src={assets.menu_icon} className="absolute top-3 left-3 w-8 h-8 
    cursor-pointer md:hidden not-dark:invert" onClick={()=>setIsMenuOpened(true)}/>}

    {user ? (
      <div className="dark:bg-gradient-to-b from-[#242124] to-[#000000] dark:text-white">
          <div className="flex h-screen w-screen">
            <SideBar isMenuOpened={isMenuOpened} setIsMenuOpened={setIsMenuOpened}/>
            <Routes>
              <Route path="/" element={<ChatBox/>} />
              <Route path="/credits" element={<Credits/>} />
              <Route path="/community" element={<Community/>} />


            </Routes>
          </div>
        </div>
    ):(
      <div className="bg-gradient-to-b from-[#242124] to-[#000000] flex
      items-center justify-center h-screen w-screen">
        <Login/>
      </div>
    )}

        
    </>
  )
}

export default App
