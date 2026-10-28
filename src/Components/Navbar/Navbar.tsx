import { toast } from "react-toastify";
import logo from "../../assets/route.png";
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
} from "flowbite-react";
import { useContext } from "react";
import { authContext } from "../../context/auth.context";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getNotifyCount } from "../../Features/Notifications/api/notyFy.api";
import { AiOutlineHome } from "react-icons/ai";
import { ImProfile } from "react-icons/im";
import { MdNotificationsActive } from "react-icons/md";

export function NavbarCom() {
  const context = useContext(authContext);
  const navigate = useNavigate();
  if (!context) throw new Error();

  const { setLogin,user } = context;

  function logOut() {
    localStorage.removeItem("tkn");
    setLogin(null);
    navigate("/");
    toast.success("You Are Succefully Logged Out");
  }
  
  const {data} = useQuery({
    queryKey: ['notifyCount'],
    queryFn: getNotifyCount,
  })
  console.log(data?.data?.unreadCount);
  
  return (
    <Navbar fluid>
      <div className="container flex items-center justify-between flex-wrap">
        <NavbarBrand href="/">
          <img
            src={logo}
            className="mr-3 h-6 sm:h-9 rounded-md"
            alt="Route Posts Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Route Posts
          </span>
        </NavbarBrand>
        <div className="flex gap-1 rounded-3xl border-2 overflow-hidden border-gray-400 ps-3 bg-cyan-50  md:order-2">
          <div className="self-center whitespace-nowrap text-xl font-semibold bg text-black   md:me-2">
            <span className="block text-sm">{user?.name}</span>
          </div>
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar 
                alt="User settings"
                img={user?.photo}
                className="  cursor-pointer"
              />
            }
            className="w-[150px]">
            <DropdownItem>
              <Link to='/profile'>Profile</Link>
            </DropdownItem>
            <DropdownItem>
              <Link to='/settings'>Settings</Link>
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem onClick={logOut}>Log Out</DropdownItem>
          </Dropdown>
          <NavbarToggle />
        </div>
        <NavbarCollapse className="border-2 border-gray-400 rounded-4xl px-6 py-4">
          <NavLink to={"/feed"} className={({ isActive })=> ` flex items-center gap-1 text-lg ${isActive ? 'text-[#f0f2f5]':'text-gray-400'}`}>
            <AiOutlineHome/>
            Feed
          </NavLink>
          <NavLink to={"/profile"} className={({ isActive })=> ` flex items-center gap-1 text-lg ${isActive ? 'text-[#f0f2f5]':'text-gray-400'}`}>
            <ImProfile/>
            Profile
          </NavLink>
          <NavLink to={"/notifications"} className={({ isActive })=> ` flex items-center gap-1 text-lg ${isActive ? 'text-[#f0f2f5]':'text-gray-400'}`}>
            <MdNotificationsActive/>
            Notification 
            { data?.data?.unreadCount > 0 &&
              <div className=" inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
              {data?.data?.unreadCount}
            </div>}
          </NavLink>
        </NavbarCollapse>
      </div>
    </Navbar>
  );
}
