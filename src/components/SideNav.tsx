import { NavLink } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";

const SideNav = () => {
  const nav = (
    <nav className="main-nav">
      <ul>
        <li>
          <NavLink to={"/parameters"}>
            <IoSettingsOutline />
          </NavLink>
        </li>
        <li>
          <NavLink to={"/calendar"}>Calendrier</NavLink>
        </li>
        <li>
          <NavLink to={"/services"}>Services</NavLink>
        </li>
        <li>
          <NavLink to={"/roles"}>Roles</NavLink>
        </li>
        <li>
        <NavLink to={"/admin"}>
          Administateur Menu
        </NavLink>
        </li>
        <li>
        <NavLink to={"/manager"}>
          Menu Caché Gérant
        </NavLink>
        </li>
      </ul>
    </nav>
  );
  return nav;
};

export default SideNav;
