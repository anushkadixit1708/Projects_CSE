import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/logo.png";

// const
const Navbar = () => {
  return (
    <nav className={"bg-primary-700 shadow-md "}>
      <div className="px-4 lg:px-8 flex justify-between py-2 items-center">
        <Link to="/" className="flex items-center">
          <img src={logo} className="w-12" />
          <div className="ml-4 font-bold text-title-5">DATASURE</div>
        </Link>
        <div className="flex uppercase text-grey-600">
          {[{
            name: "Access",
            link: "/access"
          },
          // {
          // name: "Add User",
          // link: "/add"
          // },
          {
            name: "Update",
            link: "/update"
          }].map(x => {
            return <NavLink key={x.name} activeClassName={"text-black"} className="mx-4  hover:text-black font-bold cursor-pointer" to={x.link}>{x.name}
            </NavLink>
          })}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
