import { Outlet } from "react-router"
import Navbar from "./pages/shared/Navbar"
import Footer from "./pages/shared/Footer"
import { Toaster } from 'sonner';


function App() {
  

  return (
    <>
    <Navbar></Navbar>
     <Toaster position="top-right" duration={2000} richColors />
    <Outlet></Outlet>
    <Footer></Footer>
    </>
  )
}

export default App
