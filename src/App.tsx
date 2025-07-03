import { Outlet } from "react-router"
import Navbar from "./pages/shared/Navbar"
import Footer from "./pages/shared/Footer"



function App() {

  return (
    <>
    <Navbar></Navbar>
    <Outlet></Outlet>
    <Footer></Footer>
    </>
  )
}

export default App
