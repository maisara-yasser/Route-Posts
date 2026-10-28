import { Outlet } from "react-router-dom";
import { NavbarCom } from "../Navbar/Navbar";


export default function Layout() {
  return (
    <div>
        <NavbarCom />
          <Outlet/>
    </div>
  )
}
