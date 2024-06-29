import { Outlet } from "react-router-dom";
import Header from "./ui/Header";
import Footer from "./ui/Footer";

export default function Layout() {
  return (
    <div className="site-wrapper">
        <Header/>
        <main>
            <Outlet />
        </main>
        <Footer/>
    </div>
  )
}
